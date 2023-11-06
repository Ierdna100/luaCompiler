const fs = require('fs')

const projectsFilePath = "./projects.json"

let projects = []

try {
    projects = JSON.parse(fs.readFileSync(projectsFilePath))
} catch (e) {
    fs.writeFileSync(projectsFilePath, "")
}

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

process.argv[3] = process.argv[3].replaceAll("\\\\", "\\").replaceAll("\\", "/")
let lastChar = process.argv[3].charAt(process.argv[3].length - 1)
if (lastChar != "/") process.argv[3] += "/"

process.argv[4] = process.argv[4].replaceAll("\\\\", "\\").replaceAll("\\", "/")
lastChar = process.argv[4].charAt(process.argv[4].length - 1)
if (lastChar != "/") process.argv[4] += "/"

if (process.argv[5].includes(".")) {
    buildfilename = `${process.argv[5].split(".")[0]}.lua`
}

let projectAlreadyExists = false
let existsAtIndex = 0
for (let project of projects)
{
    if (project.name == process.argv[2])
    {
        projectAlreadyExists = true
        break
    }
    existsAtIndex++
}

let newProject = {
    name: process.argv[2],
    srcdir: process.argv[3],
    builddir: process.argv[4],
    buildfilename: buildfilename
}

if (projectAlreadyExists) 
{
    projects[existsAtIndex] = newProject
} else 
{
    projects.push(newProject)
}

fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, "\t"))

if (!projectAlreadyExists) console.log(`Successfully added project with name ${process.argv[2]}`)
else console.log(`Successfully updated project with name ${process.argv[2]}`)

process.exit(0)
