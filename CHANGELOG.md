# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.6.3](https://github.com/codymikol/game-kiln/compare/v0.6.2...v0.6.3) (2020-04-06)


### Bug Fixes

* **KGame:** clean up screeManager on destroy ([7fd2431](https://github.com/codymikol/game-kiln/commit/7fd2431c60839f49599bb033fbbbdbd8e6faf5fe)), closes [#132](https://github.com/codymikol/game-kiln/issues/132)

### [0.6.2](https://github.com/codymikol/game-kiln/compare/v0.6.1...v0.6.2) (2020-04-05)


### Bug Fixes

* **KGame:** fix screenManager cleanup ([91a3c29](https://github.com/codymikol/game-kiln/commit/91a3c2993f78d50e95c497d77574a685d609c5a8)), closes [#130](https://github.com/codymikol/game-kiln/issues/130)

### [0.6.1](https://github.com/codymikol/game-kiln/compare/v0.6.0...v0.6.1) (2020-04-05)


### Features

* **github:** add an action for test / build ([f075250](https://github.com/codymikol/game-kiln/commit/f075250def4cc2f685e187fe5284e98e856bc944))
* **KGame:** added KGame runtime hooks ([60cc170](https://github.com/codymikol/game-kiln/commit/60cc170715437b8f3726bc2e7904cf992d2ac304)), closes [#126](https://github.com/codymikol/game-kiln/issues/126)


### Bug Fixes

* **KEntity:** properly propagate kiln name ([df6cf8d](https://github.com/codymikol/game-kiln/commit/df6cf8df3edae0665682fe6c1f59e9afcb7d05d6)), closes [#115](https://github.com/codymikol/game-kiln/issues/115)

## [0.6.0](https://github.com/codymikol/game-kiln/compare/v0.5.2...v0.6.0) (2019-09-12)


### ⚠ BREAKING CHANGES

* **screen:** you will now need to specify a
div element rather than a canvas element when
initializing KGames. The passed div will be filled
with a canvas element respecting the height and
width of the container class.

this allows for us to appropriately resize canvas
and properly track mouse position regardless of
canvas size. This is good because we can have both
fixed and variable width games now.

### Bug Fixes

* **build:** remove entire lodash import ([72d1354](https://github.com/codymikol/game-kiln/commit/72d1354)), closes [#112](https://github.com/codymikol/game-kiln/issues/112)
* **example:** Fix how entities propagate ([dac38f8](https://github.com/codymikol/game-kiln/commit/dac38f8)), closes [#108](https://github.com/codymikol/game-kiln/issues/108)
* **screen:** generate kiln canvas in container ([f53127e](https://github.com/codymikol/game-kiln/commit/f53127e)), closes [#103](https://github.com/codymikol/game-kiln/issues/103) [#12](https://github.com/codymikol/game-kiln/issues/12)
* **yarn:** upgrade dependencies ([2dc67e8](https://github.com/codymikol/game-kiln/commit/2dc67e8)), closes [#110](https://github.com/codymikol/game-kiln/issues/110)

### [0.5.2](https://github.com/codymikol/game-kiln/compare/v0.5.1...v0.5.2) (2019-09-01)



### [0.5.1](https://github.com/codymikol/game-kiln/compare/v0.5.0...v0.5.1) (2019-09-01)


### Bug Fixes

* **mouse:** fix mouse events not cleaning up ([b691634](https://github.com/codymikol/game-kiln/commit/b691634)), closes [#104](https://github.com/codymikol/game-kiln/issues/104) [#81](https://github.com/codymikol/game-kiln/issues/81)



## [0.5.0](https://github.com/codymikol/game-kiln/compare/v0.4.1...v0.5.0) (2019-08-31)


### Bug Fixes

* **mouse:** use rect to get mousePos ([245bd0f](https://github.com/codymikol/game-kiln/commit/245bd0f)), closes [#100](https://github.com/codymikol/game-kiln/issues/100)


### BREAKING CHANGES

* **mouse:** you will need to change code from

```javascript
let mouse = new KInput.Mouse();
```

to this

```javascript
let mouse = new KInput.Mouse('kiln-name');
```

where kiln-name is the name of your kiln



### [0.4.1](https://github.com/codymikol/game-kiln/compare/v0.4.0...v0.4.1) (2019-08-29)


### Bug Fixes

* **npm:** build for prod before publish ([bf62e02](https://github.com/codymikol/game-kiln/commit/bf62e02)), closes [#96](https://github.com/codymikol/game-kiln/issues/96)
* **npm:** retain the src folder ([54c0227](https://github.com/codymikol/game-kiln/commit/54c0227)), closes [#94](https://github.com/codymikol/game-kiln/issues/94)



## [0.4.0](https://github.com/codymikol/game-kiln/compare/v0.3.1...v0.4.0) (2019-08-29)


### Features

* **KGame:** added a getter and KGameInstance ([3636d0d](https://github.com/codymikol/game-kiln/commit/3636d0d)), closes [#92](https://github.com/codymikol/game-kiln/issues/92)



### [0.3.1](https://github.com/codymikol/game-kiln/compare/v0.3.0...v0.3.1) (2019-08-15)


### Bug Fixes

* **build:** set libraryTarget to umd ([560048d](https://github.com/codymikol/game-kiln/commit/560048d)), closes [#89](https://github.com/codymikol/game-kiln/issues/89)
* **yarn:** do not build before testing ([e491197](https://github.com/codymikol/game-kiln/commit/e491197)), closes [#87](https://github.com/codymikol/game-kiln/issues/87)



## [0.3.0](https://github.com/codymikol/game-kiln/compare/v0.2.1...v0.3.0) (2019-08-15)


### Bug Fixes

* **yarn:** change prepublish to publish ([6b42fc4](https://github.com/codymikol/game-kiln/commit/6b42fc4)), closes [#83](https://github.com/codymikol/game-kiln/issues/83)


### change

* **webpack:** make project compile to commonjs ([90039ec](https://github.com/codymikol/game-kiln/commit/90039ec)), closes [#82](https://github.com/codymikol/game-kiln/issues/82)


### BREAKING CHANGES

* **webpack:** now you can import lib classes /
functions / etc from the Kiln bundle.itself.
This was a pretty massive change and will
completely change how this project can be used.
Mainly in an easy importable compressable way.



### [0.2.1](https://github.com/codymikol/game-kiln/compare/v0.2.0...v0.2.1) (2019-06-01)



## [0.2.0](https://github.com/codymikol/game-kiln/compare/v0.0.4...v0.2.0) (2019-06-01)


### Bug Fixes

* **imports:** properly pull in lodash modules ([c7db4ee](https://github.com/codymikol/game-kiln/commit/c7db4ee)), closes [#72](https://github.com/codymikol/game-kiln/issues/72)
* **notes:** remove out of date notes ([0309d4d](https://github.com/codymikol/game-kiln/commit/0309d4d)), closes [#46](https://github.com/codymikol/game-kiln/issues/46)
* **npm:** add missing entrypoint ([16c9673](https://github.com/codymikol/game-kiln/commit/16c9673)), closes [#66](https://github.com/codymikol/game-kiln/issues/66)
* **test:** make the package json test hook work for travis ([bb94e35](https://github.com/codymikol/game-kiln/commit/bb94e35)), closes [#60](https://github.com/codymikol/game-kiln/issues/60)
* **travis-ci:** config file was wrong ([c7d9d5c](https://github.com/codymikol/game-kiln/commit/c7d9d5c)), closes [#61](https://github.com/codymikol/game-kiln/issues/61)


### Features

* **ci:** add travis ci integration ([c19d398](https://github.com/codymikol/game-kiln/commit/c19d398)), closes [#54](https://github.com/codymikol/game-kiln/issues/54)
* **packaging:** add prepublish script and standard-version ([12e3949](https://github.com/codymikol/game-kiln/commit/12e3949)), closes [#53](https://github.com/codymikol/game-kiln/issues/53)




### Version 0.0.4

This version has added a lot of the super basic stuff that I wanted in before even showing this project to anyone. There is still a lot to do in terms of making a functional game framework, but this at least gives a fun playground for creating and controlling entities on the screen. :D

* Fixed README Markdown
* Got Mouse Input Working
* Got Keyboard Input Working
* Give Entities access to delta
* Bound loop to this in constructor
* Made intervals / timeouts bound to this
* Replaced Entity key methods with KInput
* Entities can destroy themselves
* Fixed Demo
* Removed Entity Key Logic
* Removed notes.txt

### Version 0.0.3

I messed up publishing something to npm and broke all the things, this just fixes that ¯\_(ツ)_/¯ 

### Version 0.0.2

Pre alpha release with a somewhat working demo. 

In this release you will be able to create a Screen and populate it with entities. 

Unfortunately we don't have proper documentation yet, but feel free to fiddle around with the provided example folder :D

* Got Screen concept functioning
* Got Entity concept functioning
* Wrote some tests via karma / jasmine
* Made a very basic example
* Added this changelog
* Added fake docs with no documentation

### Version 0.0.1

Pre alpha initial release, not really usable unless you know exactly what you're doing. Only madmen and those with nothing to lose should try to use this ;)

* Added a bunch of random stuff unusable to humans
