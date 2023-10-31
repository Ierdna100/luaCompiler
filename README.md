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