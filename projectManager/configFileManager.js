const fs = require('fs');

function createConfigFile(directory)
{
    const files = fs.readdirSync(directory)
    for (const file of files)
    {
        if (file == "luaConfig.json")
        {
            return true
        }
    }

    fs.writeFileSync(`${directory}\\luaConfig.json`, JSON.stringify({
        ignoreFiles: []
    }, null, "\t"))
}

function getFilesToIgnore(directory)
{
    return JSON.parse(fs.readFileSync(`${directory}\\luaConfig.json`)).ignoreFiles;
}

module.exports = { createConfigFile, getFilesToIgnore }
