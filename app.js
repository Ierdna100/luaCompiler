const fs = require('fs')
const { watchForChanges } = require('./compileLua')

const projectsFilePath = "./projects.json"

async function main()
{
        let projects = JSON.parse(fs.readFileSync(projectsFilePath))

    if (projects.length == 0)
    {
        console.log("No projects exist in the JSON! Please specify at least one project")
        process.exit(1)
    }

    switch (process.argv[2])
    {
        case undefined:
            console.log("No project specified! Please specify a project as a command line argument or read the README!")
            process.exit(1)
        case "add":
            if (process.argv[3] == undefined)
            {
                console.log("No project name specified! Please read the README!")
                process.exit(1)
            }

            if (process.argv[4] == undefined)
            {
                console.log("No source directory specified! Please read the README!")
                process.exit(1)
            }

            if (process.argv[5] == undefined)
            {
                console.log("No build directory specified! Please read the README!")
                process.exit(1)
            }

            projects.push({
                name: process.argv[3],
                srcdir: process.argv[4],
                builddir: process.argv[5]
            })

            fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, "\t"))

            console.log(`Successfully added ${process.argv[3]}`)
            process.exit(0)
        case "remove":
        case "rm":
            if (process.argv[3] == undefined)
            {
                console.log("No project name specified! Please read the README!")
                process.exit(1)
            }

            let index = 0

            for (let project of projects)
            {
                if (project.name == process.argv[3])
                {
                    console.log(index)
                    let sliced = projects.splice(index, index + 1)

                    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, "\t"))

                    console.log(`Successfully removed project with name ${sliced.name}`)
                    process.exit(0)
                }
                index++
            }

            console.log(`No projects found with name ${process.argv[3]}`)
            process.exit(1)
        default:
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

            if (projectExists) break;

            console.log(`No projects found with name ${process.argv[2]}`)
            process.exit(1)
    }
}

main()