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

    fs.writeFileSync(`${builddir}${buildfilename}`, "--\n", 'utf-8')

    for (filename of dirToCompile)
    {
        fileMetadata = fs.lstatSync(`${srcdir}${filename}`)

        if (fileMetadata.isFile())
        {
            let data = `-- ${filename}\n` 
            data += fs.readFileSync(`${srcdir}${filename}`)
            data += "\n"

            fs.appendFileSync(`${builddir}${buildfilename}`, data)
        }
    }

    let currentTime = new Date()
    lastUpdate = currentTime.getTime()

    console.log(`[${currentTime.toISOString()}] Bundled the project!`)
}

module.exports = { watchForChanges }