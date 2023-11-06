const fs = require('fs')

const minTimeBetweenUpdates = 2000

let builddir = ""
let srcdir = ""
let buildfilename = ""
let lastUpdate = 0

function watchForChanges(watchDir, buildDir, buildFilename)
{
    builddir = buildDir
    srcdir = watchDir
    buildfilename = buildFilename
    fs.watch(watchDir, onChange)
}

function onChange(eventName, filename)
{
    if (filename.split(".")[1] == "lua")
    {
        // debounce for Win32
        if (lastUpdate + minTimeBetweenUpdates <= Date.now())
        {
            compileLua()
        }
    }
}

function compileLua()
{
    const dirToCompile = fs.readdirSync(srcdir)

    fs.writeFileSync(`${builddir}${buildfilename}`, "", 'utf-8')

    for (filename of dirToCompile)
    {
        if (!filename.includes(".lua")) continue
        
        fileMetadata = fs.lstatSync(`${srcdir}${filename}`)

        if (fileMetadata.isFile())
        {
            filedata = fs.readFileSync(`${srcdir}${filename}`).toString()
            
            let writedata = ""

            if (filedata[0] == "--ignore-comments") 
            {
                filedata = filedata.split("\r\n")

                let isBlockComment = false
                for (let line of filedata)
                {
                    if (isBlockComment)
                    {
                        if (line.includes("]]"))
                        {
                            isBlockComment = false
                            writedata += line.split("]]")[1]
                            writedata += "\n"
                        }

                        continue
                    }
                    if (line.includes("--[[")) 
                    {
                        isBlockComment = true
                        continue
                    }
                    // Whole line is comment
                    if (line.substr(0, 2) == "--") continue
                    if (line.includes("--")) 
                    {
                        writedata += line.split("--")[0]
                        writedata += "\n"
                        continue
                    }

                    writedata += line
                    writedata += "\n"
                }
            } else
            {
                writedata = filedata
            }

            let data = `-- ${filename}\n` 
            data += writedata
            data += "\n"

            fs.appendFileSync(`${builddir}${buildfilename}`, data)
        }
    }

    let currentTime = new Date()
    lastUpdate = currentTime.getTime()

    console.log(`[${currentTime.toISOString()}] Bundled the project!`)
}

module.exports = { watchForChanges }
