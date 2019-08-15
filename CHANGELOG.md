# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
