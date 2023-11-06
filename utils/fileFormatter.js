function formatDirectorySeparator(rawInput) {
    let formattedInput = rawInput.replaceAll("\\\\", "\\");

    if (formattedInput.charAt(rawInput.length - 1) == "/")
    {
        formattedInput = formattedInput.substr(0, formattedInput.length - 1);
    }

    return formattedInput;
}

function formatBuildFilename(rawInput) {
    if (rawInput.includes(".")) {
        return `${rawInput.split(".")[0]}.lua`;
    }

    return rawInput + ".lua";
}

module.exports = { formatDirectorySeparator, formatBuildFilename }
