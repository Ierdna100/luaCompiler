# README.md

Requires [NodeJS](https://nodejs.org/en)!

This little script bundles a bunch of `.lua` files into one big one. I made it for stormworks for ease of programming addons. Use at your own risk or something.

A project in this case refers to a directory that is the "source code" and a hard-coded destination you define for each one, so you can edit multiple addons.

# Initialization:
1. run `npm install`

# Usage:

To add a project, or update a project's config, run:

```
npm run add
```
___
To remove a project, run:
```
npm run rm [PROJECT NAME]
```

e.g.:
```
npm run rm myProject
```

___

To actively compile a project (upon changing the state of any of the files in the source directory), run:
```
npm run watch [PROJECT NAME]
```

e.g.:
```
npm run watch myProject
```

## Compiler flags:
`--ignore-comments`: Removes comments if set on first line

## `luaConfig.json`

In every project, a `luaConfig.json` file will be created. This allows you to ignore certain files you do not want compiled. Example `luaConfig.json`:

```json
{
	"ignoreFiles": [
		"file1.lua",
        "file2.lua"
	]
}
```
