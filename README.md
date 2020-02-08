# electron-react-webpack-boilerplate
This is the basic/minimal Boilerplate for creating applications with Electron React. Please feel free to use this.<br/>
Configurations are specific for windows platform, however you can customise your platform settings for bulding this application as per your wish.

## Scripts

Please Modify your scripts as per your requirements.

### `yarn start` 

Start your Application with launching React Development Server being loaded in electron Desktop UI.

### `yarn electron` 

Start Electron Window Only

### `yarn react` 

Start Development React Server only

### `yarn build` 

Build React Application into `./build/` folder

### `yarn dist` 

Create a Packed Application for distribution.

### `yarn publish` 

Publish your packed application to the web.

### `yarn clean` 

Delete all builds, distributions and releases from the project folder

## Issues

### `Uncaught ReferenceError: require is not defined` in console window of electron application
This issue will be shown when you are trying to load any Electron Module into the react app such as `session` , `remote` , `ipcRenderer` etc.
To Fix this issue, add below lines when launching a `BrowserWindow` 

``` js
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
```

However there is a downside to this approach. It you are loading resources online (Web), attackers might have access to you system via node and can modify anything in System level. No issues if your application works offline.

### `Module not found: Error: Can't resolve 'fs' ...` in front webpage

This issue will be shown when you are trying to load any Electron Module into the react app such as `session` , `remote` , `ipcRenderer` etc.
To fix this issue, you will have to add `electron-renderer` in `target` property of webpack-configuration.

``` js
    module.exports = {
        ...,
        target = 'electron-renderer'
    }
```

### `.babelrc` preset reminder

This is just to notify that presets in `.babelrc` should be correctly mentioned to the latest value i.e.<br/>
from

``` js
    {
        "presets": [
            "react",
            "env"
        ]
    }
```

to

``` js
    {
        "presets": [
            "@babel/preset-react",
            "@babel/preset-env"
        ]
    }
```

## License

MIT

## Contributors

[Awatansa Vishwakarma](https://github.com/awatansa)

