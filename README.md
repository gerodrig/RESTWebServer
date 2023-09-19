
# Node with TypeScript - TS Node preferred

1. install TS and required dependencies

```dotnetcli
npm i -D typescript @types/node ts-node-dev rimraf
```

2. Start TS configuration file (Configure it as needed)

```dotnetcli
npx tsc --init --outDir dist/ --rootDir src
```

3. Create scripts for dev, build and start
```dotnetcli
"dev": "tsnd --respawn --clear src/app.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dits/app.js"
```