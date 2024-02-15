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
        ignoreFiles: [],
        ignoreComments: false,
        deleteSpaces: true
    }, null, "\t"))
}

function getConfig(directory)
{
    const config = JSON.parse(fs.readFileSync(`${directory}\\luaConfig.json`));
    return config
}

module.exports = { createConfigFile, getConfig }
