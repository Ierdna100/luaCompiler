function quitOnCtrlC(prompt)
{
    if (prompt == null)
    {
        process.exit(0);
    }

    return prompt;
}

module.exports = { quitOnCtrlC };
