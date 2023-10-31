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
        compileLua()
    }
}

function compileLua()
{
    fs.writeFileSync(`${builddir}${buildfilename}`, "--\n", 'utf-8')

    // debounce for Win32
    if (lastUpdate + minTimeBetweenUpdates <= Date.now())
    {
        const dirToCompile = fs.readdirSync(srcdir)

        for (filename of dirToCompile)
        {
            fileMetadata = fs.lstatSync(`${srcdir}${filename}`)

            if (fileMetadata.isFile())
            {
                let data = `-- ${filename}\n\n` 
                data += fs.readFileSync(`${srcdir}${filename}`)
                data += "\n\n"

                fs.appendFileSync(`${builddir}${buildfilename}`, data)

                console.log("ran")
            }
        }
    }

    lastUpdate = Date.now()
}

module.exports = { watchForChanges }