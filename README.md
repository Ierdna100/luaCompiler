# README.md

This little script bundles a bunch of `.lua` files into one big one. I made it for stormworks for ease of programming addons. Use at your own risk or something.

A project in this case refers to a directory that is the "source code" and a hard-coded destination you define for each one, so you can edit multiple addons.

# Usage:

To add a project, run:

```
npm run run add [PROJECT NAME] [SOURCE DIRECTORY] [BUILD DIRECTORY] [BUILD FILENAME]
```

e.g.:
```
npm run run add myProject ~/src/ ~/build/ build.lua
```

To remove a project, run:
```
npm run run rm [PROJECT NAME]
```

e.g.:
```
npm run run rm myProject
```

___

To actively compile a project (upon changing the state of any of the files in the source directory), run:
```
npm run run [PROJECT NAME]
```

e.g.:
```
npm run run myProject
```

## Compiler flags:
`--ignore-comments`: Removes comments