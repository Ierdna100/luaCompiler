const fs = require('fs')

const projectsFilePath = "./projects.json"

let projects = JSON.parse(fs.readFileSync(projectsFilePath))

if (process.argv[2] == undefined)
{
    console.log("No project name specified! Please read the README!")
    process.exit(1)
}

if (process.argv[3] == undefined)
{
    console.log("No source directory specified! Please read the README!")
    process.exit(1)
}

if (process.argv[4] == undefined)
{
    console.log("No build directory specified! Please read the README!")
    process.exit(1)
}

if (process.argv[5] == undefined)
{
    console.log("No build filename specified! Please read the README!")
    process.exit(1)
}

let buildfilename = ""

if (process.argv[5].includes(".")) {
    buildfilename = `${process.argv[5].split(".")[0]}.lua`
}

projects.push({
    name: process.argv[2],
    srcdir: process.argv[3],
    builddir: process.argv[4],
    buildfilename: buildfilename
})

fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, "\t"))

console.log(`Successfully added ${process.argv[2]}`)
process.exit(0)
