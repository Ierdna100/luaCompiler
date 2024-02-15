const fs = require('fs')
const { createConfigFile, getConfig } = require('./configFileManager')

const minTimeBetweenUpdates = 2000

class LuaCompiler {
    constructor(watchDir, buildDir, buildFilename)
    {
        this.builddir = buildDir
        this.lastUpdate = 0
        this.srcdir = watchDir
        this.buildfilename = buildFilename

        createConfigFile(this.srcdir)
        this.config = getConfig(this.srcdir)

        fs.watch(watchDir, (eventName, filename) => this.onChange(filename))
    }

    onChange(filename)
    {
        if (filename.split(".")[1] == "lua")
        {
            // debounce for Win32
            if (this.lastUpdate + minTimeBetweenUpdates <= Date.now())
            {
                this.compileLua()
            }
        }
        if (filename == "luaConfig.json") {
            this.config = getConfig(this.srcdir)
        }
    }

    compileLua()
    {
        fs.writeFileSync(`${this.builddir}\\${this.buildfilename}`, "", 'utf-8')

        this.compileLuaForFiles(this.srcdir)

        let currentTime = new Date()
        this.lastUpdate = currentTime.getTime()

        console.log(`[${currentTime.toISOString()}] Bundled the project!`)
    }

    compileLuaForFiles(dirToCompile) {
        const contentsOfDir = fs.readdirSync(dirToCompile)

        for (const filename of contentsOfDir)
        {
            let ignoreFile = false
            for (const ignoreFilename of this.config.ignoreFiles)
            {
                if (filename == ignoreFilename) 
                {
                    ignoreFile = true
                }
            }

            if (!ignoreFile) {
                this.getCodeNextFile(dirToCompile, filename)
            }
        }
    }

    getCodeNextFile(folder, filename) {
        let fileMetadata = fs.lstatSync(`${folder}\\${filename}`)

        if (fileMetadata.isFile())
        {
            if (!filename.includes(".lua")) {
                return;
            } 

            let filedata = fs.readFileSync(`${folder}\\${filename}`).toString()
        
            let parser = new WritedataParser(this.config)

            for (const line of filedata.split("\r\n")) {
                parser.generateWriteDataFromLine(line)
            }

            let data = `-- ${filename}\n${parser.writedata}\n`

            fs.appendFileSync(`${this.builddir}\\${this.buildfilename}`, data)
        }
        else if (fileMetadata.isDirectory()) {
            this.compileLuaForFiles(`${folder}\\${filename}`)
        }
    }
}

class WritedataParser {
    constructor(config) {
        this.ignoreComments = config.ignoreComments
        this.compress = config.deleteSpaces
        this.writedata = ""
        this.isBlockComment = false;
    }

    generateWriteDataFromLine(lineIn) {
        let line = lineIn

        if (this.compress) {
            line = lineIn.trim()
        }

        if (this.compress && line == "") {
            return
        }

        if (this.ignoreComments && this.isBlockComment)
        {
            if (line.includes("]]"))
            {
                this.isBlockComment = false
                this.generateWriteDataFromLine(line.substring(line.indexOf("]]") + 2))
                return;
            }
        }

        if (this.isBlockComment) {
            return;
        }

        if (this.ignoreComments && line.includes("--[[")) 
        {
            this.generateWriteDataFromLine(line.substring(0, line.indexOf("--[[")))
            this.isBlockComment = true
            this.generateWriteDataFromLine(line.substring(line.indexOf("--[[") + 4))
            return
        }

        if (this.ignoreComments && line.includes("--")) 
        {
            let temp = line.split("--", 2)[0]
            if (temp != "") {
                this.writedata += `${temp}\n`
            }
            return
        }

        this.writedata += `${line}\n`
    }
}

module.exports = { LuaCompiler }
