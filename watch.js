const fs = require('fs')
const { watchForChanges } = require('./compileLua')

const projectsFilePath = "./projects.json"

let projects = JSON.parse(fs.readFileSync(projectsFilePath))

if (projects.length == 0)
{
    console.log("No projects exist in the JSON! Please specify at least one project")
    process.exit(1)
}

let projectExists = false
for (let project of projects)
{
    if (project.name == process.argv[2])
    {
        console.log(`Watching for changes in directory ${project.srcdir}`)
        watchForChanges(project.srcdir, project.builddir, project.buildfilename)
        
        projectExists = true
        break
    }
}

if (!projectExists)
{
    console.log(`No projects found with name ${process.argv[2]}`)
    process.exit(1)
}
