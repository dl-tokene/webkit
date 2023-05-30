<h1><p align="center"><img alt="TokenE | Webkit" src="https://raw.githubusercontent.com/dl-tokene/webkit/main/assets/logo.png" width="876" /></p></h1>

<p align="center">TypeScript-based various types of solutions for <a target="_blank" rel="noopener" href="https://tokene.io">TokenE</a> projects.</p>

<div align="center">
  <a href="https://github.com/dl-tokene/webkit/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/github/license/dl-tokene/webkit.svg" />
  </a>
</div>

## Table of Contents

- [Changelog](#changelog)
- [Packages](#packages)
- [Using in the projects made by create-react-app](#using-in-the-projects-made-by-create-react-app)
- [Development](#development)
  * [Editors](#editors)
    + [VSCode](#vscode)
    + [WebStorm](#webstorm)
  * [Dependencies](#dependencies)
    + [Local dependencies](#local-dependencies)
    + [Testing dependencies](#testing-dependencies)
  * [Basics](#basics)
    + [Build](#build)
    + [Run tests](#run-tests)
    + [Run linter](#run-linter)
    + [Check release version](#check-release-version)
- [Contribute](#contribute)
  * [Reporting Issues](#reporting-issues)
  * [Submitting pull requests](#submitting-pull-requests)
- [License](#license)
- [Resources](#resources)

## Changelog

For the change log, see [CHANGELOG.md](https://github.com/dl-tokene/webkit/blob/main/CHANGELOG.md).


## Packages

The TokenE Webkit is a library that consists of many smaller NPM packages within the
[@tokene namespace](https://www.npmjs.com/org/tokene), a so-called monorepo.

Here are the packages in the namespace:

| Package                                                                                                | Description                                                                                                         | Latest                                                                                                                      |
|--------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| [@tokene/toolkit](https://dl-tokene.github.io/webkit/modules/_tokene_toolkit.html)                     | Collection of common utilities, functions, enums, errors and helpers                                                | [![npm version](https://img.shields.io/npm/v/@tokene/toolkit.svg)](https://www.npmjs.com/package/@tokene/toolkit)           |
| [@tokene/vue-web3-provider](https://dl-tokene.github.io/webkit/modules/_tokene_vue_web3_provider.html) | The Vue reactive wrapper of [@distributedlab/w3p](https://github.com/distributed-lab/web-kit/tree/main/packages/w3p) | [![npm version](https://img.shields.io/npm/v/@tokene/toolkit.svg)](https://www.npmjs.com/package/@tokene/vue-web3-provider) |
| [@tokene/styles](https://dl-tokene.github.io/webkit/modules/_tokene_styles.html)                       | The global styles for every TokenE project and common function, mixins and variables                                | [![npm version](https://img.shields.io/npm/v/@tokene/styles.svg)](https://www.npmjs.com/package/@tokene/styles)             |
| [@tokene/ui-kit](https://dl-tokene.github.io/webkit/modules/_tokene_ui_kit.html)                       | The global ui-kit for every TokenE project                                                                          | [![npm version](https://img.shields.io/npm/v/@tokene/ui-kit.svg)](https://www.npmjs.com/package/@tokene/ui-kit)             |
| [@tokene/toasts](https://dl-tokene.github.io/webkit/modules/_tokene_toasts.html)                       | Vue based toasts                                                                                                    | [![npm version](https://img.shields.io/npm/v/@tokene/toasts.svg)](https://www.npmjs.com/package/@tokene/toasts)             |
| [@tokene/sdk](https://dl-tokene.github.io/webkit/modules/_tokene_sdk.html)                             | Collection of common interactions with TokenE graph and core contracts                                              | [![npm version](https://img.shields.io/npm/v/@tokene/sdk.svg)](https://www.npmjs.com/package/@tokene/sdk)                   |

## Using in the projects made by create-react-app

To use any of the packages in React project, created with [create-react-app](https://create-react-app.dev/) you need to add [craco](https://craco.js.org/) package and config to resolve the ESM version:

```shell
yarn add -D @craco/craco
```

Next, in the root of your project (where `package.json` is located) create a file named `craco.config.js` with the following content:

```js
module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
    },
  },
}
```

This config disables the breaking change that causes [this error](https://stackoverflow.com/questions/70964723/webpack-5-in-ceate-react-app-cant-resolve-not-fully-specified-routes).

Then change the `start`/`build`/`test` commands in `package.json` replacing `react-scripts` to `craco`:

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```


## Development

### Editors

#### VSCode

To get ESLint and Prettier working in VSCode, install [ESLint extension] and add the following to your settings.json:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "eslint.validate": [
    "javascript",
    "typescript"
  ],
  "eslint.alwaysShowStatus": true,
  "eslint.packageManager": "yarn",
  "eslint.workingDirectories": [{ "mode": "auto" }]
}
```


[ESLint extension]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

#### WebStorm

To get ESLint and Prettier working in WebStorm, go to `Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint` and check the following:
- `Run eslint --fix on save` enabled
- `Automatic ESLint configuration` enabled
- `{**/*,*}.{js,ts}` in `Run for files` field


### Dependencies

#### Local dependencies

To install all dependencies, run:
```bash
yarn install
```

If you are implementing a new package which needs to depend on the local package, you can use the following command to install it:
```bash
yarn workspace @tokene/target-package add @tokene/package-to-add
```

To install a dependency to all packages, use the following command:
```bash
yarn workspaces foreach -pt run add @tokene/package-to-add
```

#### Testing dependencies

To test the packages, you need:

1. Build the packages:

    ```bash
    yarn build
    ```
2. Switch yarn to version berry in the project where you want to test package, to yarn be able to resolve workspace dependencies:

    ```bash
    yarn set version berry
    ```
3. Add this to the `.yarnrc.yml` file:

    ```yaml
    nodeLinker: node-modules
    ```
4. Link the packages to the project:

    ```bash
    yarn link -p -A /path/to/web-kit/root/directory
    ```
5. Add dependencies to the package.json file:

    ```json
    {
      "dependencies": {
        "@tokene/toolkit": "*"
      }
    }
    ```

6. Install the dependencies:
    ```bash
    yarn install
    ```

### Basics

#### Build

```bash
yarn build
```

#### Run tests

```bash
yarn test
```

#### Run linter

```bash
yarn lint
```

#### Check release version

```bash
yarn rsc 0.1.0
```

#### Bump version for all packages

```bash
yarn apply-version 0.1.0
```

## Contribute

First off, thanks for taking the time to contribute!
Now, take a moment to be sure your contributions make sense to everyone else.

### Reporting Issues

Found a problem? Want a new feature? First of all see if your issue or idea has [already been reported](../../issues).
If don't, just open a [new clear and descriptive issue](../../issues/new).

### Submitting pull requests

Pull requests are the greatest contributions, so be sure they are focused in scope, and do avoid unrelated commits.

-   Fork it!
-   Clone your fork: `git clone https://github.com/<your-username>/web-kit`
-   Navigate to the newly cloned directory: `cd web-kit`
-   Create a new branch for the new feature: `git checkout -b feature/my-new-feature`
-   Install the tools necessary for development: `yarn install`
-   Make your changes.
-   Commit your changes: `git commit -am 'Add some feature'`
-   Push to the branch: `git push origin feature/my-new-feature`
-   Submit a pull request with full remarks documenting your changes.

## License

[MIT License](https://opensource.org/licenses/MIT) © [TokenE](https://tokene.io)

## Resources
- [Yarn Berry](https://yarnpkg.com/cli/install)
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- [Webkit TypeDoc](https://dl-tokene.github.io/webkit)
