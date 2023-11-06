const fs = require('fs');
const prompt = require('prompt-sync')();
const { formatDirectorySeparator, formatBuildFilename } = require("./utils/fileFormatter.js");
const { quitOnCtrlC } = require('./utils/commandLineQuit.js');
const { createConfigFile } = require('./projectManager/configFileManager.js');

const projectsFilePath = "./projects.json";

let projects = [];
let projectExistsAtIndex = -1;

// Creates projects.json if doesn't already exist
try {
    projects = JSON.parse(fs.readFileSync(projectsFilePath));
} catch (e) {
    fs.writeFileSync(projectsFilePath, "");
}

const newProjectName = quitOnCtrlC(prompt("New project file name: "));

let index = 0
for (const project of projects)
{
    if (project.name == newProjectName)
    {
        if (prompt("Project with that name already exists. Do you want to replace it (Y/N): ")
            .toLowerCase().charAt(0) != "y")
        {
            process.exit(0);
        }

        projectExistsAtIndex = index;
        break;
    }

    index++;
}

let sourceDirectory = "";
let buildDirectory = "";
let buildFilename = "";

// If project already exists
if (projectExistsAtIndex != -1)
{
    currentProject = projects[projectExistsAtIndex];

    sourceDirectory = formatDirectorySeparator(quitOnCtrlC(prompt(`Source directory of project (${currentProject.srcdir}): `)));
    buildDirectory = formatDirectorySeparator(quitOnCtrlC(prompt(`Build directory of project (${currentProject.builddir}): `)));
    buildFilename = formatBuildFilename(quitOnCtrlC(prompt(`Build filename (${currentProject.buildFilename}): `)));

    projects[projectExistsAtIndex] = {
        name: newProjectName,
        srcdir: sourceDirectory == "" ? currentProject.srcdir : sourceDirectory,
        builddir: buildDirectory == "" ? currentProject.builddir : buildDirectory,
        buildFilename: buildFilename == ".lua" ? currentProject.buildFilename : buildFilename
    };
}
else
{
    sourceDirectory = formatDirectorySeparator(quitOnCtrlC(prompt("Source directory of project: ")));
    buildDirectory = formatDirectorySeparator(quitOnCtrlC(prompt("Build directory of project: ")));
    buildFilename = formatBuildFilename(quitOnCtrlC(prompt("Build filename: ")));

    createConfigFile(sourceDirectory);

    projects.push({
        name: newProjectName,
        srcdir: sourceDirectory,
        builddir: buildDirectory,
        buildFilename: buildFilename
    });
}

fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, "\t"));
