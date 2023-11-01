const fs = require('fs')

const projectsFilePath = "./projects.json"

if (projects.length == 0)
{
    console.log("No projects exist in the JSON! Please specify at least one project")
    process.exit(1)
}

if (process.argv[2] == undefined)
{
    console.log("No project name specified! Please read the README!")
    process.exit(1)
}

let index = 0
for (let project of projects)
{
    if (project.name == process.argv[2])
    {
        let sliced = projects.splice(index, index + 1)

        fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, "\t"))

        console.log(`Successfully removed project with name ${sliced.name}`)
        process.exit(0)
    }
    index++
}

console.log(`No projects found with name ${process.argv[2]}`)
process.exit(1)
