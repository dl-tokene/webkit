## Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.0-rc.19] - 2023-08-17
### Changed
- `@tokene/toolkit` - replaced `ipfs-http-client` by `kubo-rpc-client`

## [0.0.0-rc.18] - 2023-08-10
### Fixed
- `@tokene/toolkit` - `abbrCenter` function

## [0.0.0-rc.17] - 2023-06-17
### Changed
- `@tokene/toolkit` - EventBus

## [0.0.0-rc.16] - 2023-06-14
### Fixed
- `@tokene/ui-kit` - set vue-tsc@1.6.1 static version because newer versions ain't generate types
- `@tokene/toasts` - set vue-tsc@1.6.1 static version because newer versions ain't generate types

## [0.0.0-rc.15] - 2023-06-14
### Added
- `@tokene/ui-kit` - Image cropper component
- `@tokene/toolkit` - Image cropper component localization

### Changed
- `@tokene/ui-kit` - BasicModal component mobile design

### Fixed
- `@tokene/toolkit` - blob util post request

## [0.0.0-rc.14] - 2023-06-13
### Added
- `@tokene/sdk` - user side kyc management

## [0.0.0-rc.13] - 2023-06-12
### Added
- `@tokene/sdk` - Token management
- `@tokene/toolkit` - useFile composable
- `@tokene/ui-kit`
  - FileField component
  - Identicon component

### Changed
- `@tokene/ui-kit` - UserBadge component

### Fixed
- `@tokene/styles` - package.json repository field
- `@tokene/toasts` - package.json repository field
- `@tokene/toolkit`
  - package.json repository field
  - format helpers
- `@tokene/ui-kit` - package.json repository field
- `@tokene/vue-web3-provider` - package.json repository field

## [0.0.0-rc.12] - 2023-06-02
### Added
- `root` - `@tokene/sdk` - Collection of common interactions with TokenE graph and core contracts
- `@tokene/toolkit` - working with key-values

### Changed
- `@tokene/styles` - global elements colors usage
- `@tokene/toasts` - replace lodash-es by lodash
- `@tokene/ui-kit` - replace lodash-es by lodash
- `@tokene/toolkit`
  - replace lodash-es by lodash
  - update use-universal-storage to be able to SSO

### Fixed
- `@tokene/toolkit`
  - `use-universal-storage` composable storages priority
  - key-value util parsing response

## [0.0.0-rc.11] - 2023-05-26
### Added
- `@tokene/toolkit`
  - custom errors for error handler
  - auth helpers
  - key-values enum

### Changed
- `@tokene/ui-kit` - design
- `@tokene/toolkit` - interceptors
- `@tokene/styles` - common variable usages

## [0.0.0-rc.10] - 2023-05-20
### Added
- `@tokene/toasts` - custom optional options for `useNotifications` composable

## [0.0.0-rc.9] - 2023-05-18
### Changed
- `@tokene/vue-web3-provider` - `useProvider` composable according to `@distributedlab/w3p` - `0.2.0-rc.14` version

## [0.0.0-rc.8] - 2023-05-17
### Changed
- `@tokene/vue-web3-provider` - `useProvider` composable according to `@distributedlab/w3p` - `0.2.0-rc.11` version

## [0.0.0-rc.7] - 2023-05-12
### Fixed
- `@tokene/toolkit` - config assigning

## [0.0.0-rc.6] - 2023-05-11
### Fixed
- `@tokene/ui-kit` - accessing to icons in src

## [0.0.0-rc.5] - 2023-05-11
### Added
- `@tokene/vue-web3-provider` - `TokenE' Provider proxy constructor

### Changed
- `@tokene/ui-kit` - app button and fields design, icons
- `@tokene/toolkit` - universal storage composable, utils opts
- `@tokene/styles` - color variables
- `@tokene/toasts` - design
- `root` - distributed-lab packages versions

### Fixed
- `@tokene/ui-kit` - ErrorMessage and NoDataMessage components images loading

### Removed
- `@tokene/styles` - unnecessary mixins and global styles

## [0.0.0-rc.4] - 2023-05-07
### Added
- `@tokene/toolkit` - increase gas estimates
- `root` - `toasts` package

### Changed
- `@tokene/toolkit` - build options
- `@tokene/ui-kit` - build options

### Fixed
- `@tokene/ui-kit` - components depended on vue-router

### Removed
- `@tokene/ui-kit` - toasts components
- `@tokene/toolkit` - notification types

## [0.0.0-rc.3] - 2023-05-04
### Added
- `root` - `styles` package
- `root` - `@tokene/ui-kit` package

### Changed
- `@tokene/vue-web3-provider` - README and package description, imports
- `@tokene/toolkit` - imports
- `root` - typescript version

## [0.0.0-rc.2] - 2023-04-27
### Added
- `@tokene/toolkit` - parsing config helpers, composables, eth helpers, localization for validators

### Changed
- `@tokene/toolkit` - README, api and config initialization, enums

## [0.0.0-rc.1] - 2023-04-26
### Added
- `root` - `vue-web3-provider` package

### Changed
- `@tokene/toolkit` - localization

## [0.0.0-rc.0] - 2023-04-26
### Added
- Initial release
- `root` - `@tokene/toolkit` package

[Unreleased]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.19...HEAD
[0.0.0-rc.19]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.18...0.0.0-rc.19
[0.0.0-rc.18]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.17...0.0.0-rc.18
[0.0.0-rc.17]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.16...0.0.0-rc.17
[0.0.0-rc.16]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.15...0.0.0-rc.16
[0.0.0-rc.15]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.14...0.0.0-rc.15
[0.0.0-rc.14]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.13...0.0.0-rc.14
[0.0.0-rc.13]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.12...0.0.0-rc.13
[0.0.0-rc.12]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.11...0.0.0-rc.12
[0.0.0-rc.11]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.10...0.0.0-rc.11
[0.0.0-rc.10]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.9...0.0.0-rc.10
[0.0.0-rc.9]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.8...0.0.0-rc.9
[0.0.0-rc.8]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.7...0.0.0-rc.8
[0.0.0-rc.7]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.6...0.0.0-rc.7
[0.0.0-rc.6]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.5...0.0.0-rc.6
[0.0.0-rc.5]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.4...0.0.0-rc.5
[0.0.0-rc.4]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.3...0.0.0-rc.4
[0.0.0-rc.3]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.2...0.0.0-rc.3
[0.0.0-rc.2]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.1...0.0.0-rc.2
[0.0.0-rc.1]: https://github.com/dl-tokene/webkit/compare/0.0.0-rc.0...0.0.0-rc.1
[0.0.0-rc.0]: https://github.com/dl-tokene/webkit/releases/tag/0.0.0-rc.0
