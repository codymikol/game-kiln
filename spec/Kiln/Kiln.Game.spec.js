import {KScreen, KGame} from "../../src";
import KGameInstance from "../../src/Kiln/packages/KGame/KGameInstance";

describe('Game', function () {
    describe('Creating a new Kiln', function () {

        class TestScreen extends KScreen {
            constructor() {
                super();
                this.onCreate = () => {
                    this.mustBeDefinedToNotThrowGlobalError = true;
                }
            }
        }

        const errorPrefix = '\nKGame accepts [name, container, screen] args, \nBUT The below errors occurred';

        var containerElem, buttonElem, testScreen;

        beforeEach(function () {
            containerElem = document.createElement('DIV');
            containerElem.id = 'cool-id';
            buttonElem = document.createElement('BUTTON');
            testScreen = new TestScreen();
        });

        it('should throw a useful error when an HTML container element is not passed', function () {
            expect(KGame.bind(null, 'my-game', null, testScreen))
                .toThrow(new Error(errorPrefix + '\n["container" was not a valid DOM element]'))
        });

        it('should throw a useful error when a non div container element is passed', function () {
            expect(KGame.bind(null, 'my-game', buttonElem, testScreen))
                .toThrow(new Error(errorPrefix + '\n["container" was not a div element]'))
        });

        it('should throw a useful error when a name is not passed', function () {
            expect(KGame.bind(null, null, containerElem, testScreen))
                .toThrow(new Error(errorPrefix + '\n["name" was not a string]'))
        });

        it('should throw an error if a starting screen is not defined', function () {
            expect(KGame.bind(null, 'cool-game', containerElem, null))
                .toThrow(new Error(errorPrefix + '\n["screen" was not an instance of KScreen]'))
        });

        it('should be able to concat all errors together :D', function () {
            expect(KGame.bind(null, null, null, null))
                .toThrow(new Error(errorPrefix + '\n' +
                    '["container" was not a valid DOM element]\n' +
                    '["name" was not a string]\n' +
                    '["screen" was not an instance of KScreen]'))
        });

        it('should not trow an error if a valid name and canvas element are provided', function () {
            expect(KGame.bind(null, 'new-game', containerElem, testScreen)).not.toThrow()
        });

        it('should return the KGame instance when successfully created', function () {
            expect(KGame('some-game', containerElem, testScreen) instanceof KGameInstance).toBe(true);
        });

        describe('Getter functionality', function () {

            it('should return null when trying to lookup a non-existing game', function () {
                expect(KGame('non-existing-game')).toEqual(null)
            });

            describe('When a Kiln does exist', function () {

                var instance;

                beforeEach(() => instance = KGame('real-game', containerElem, testScreen));
                afterEach(() => instance.destroy());

                it('should have the correct name', function () {
                    expect(instance.name).toEqual('real-game');
                });

                it('should have a container element reference', function () {
                    expect(instance._container.id).toEqual('cool-id');
                });

                it('should have the canvas element to reference', function () {
                    expect(instance._canvas.tagName).toEqual('CANVAS')
                });

                it('should have the correct gameLoop reference', function () {
                    expect(instance._loopManager.name).toEqual('real-game');
                });

                it('should initialize gameLoop', function () {
                    expect(instance._loopManager.initialized).toBeTruthy();
                });

                it('should have the corresponding screenManager', function () {
                    expect(instance._screenManager.kiln).toEqual('real-game')
                });

            });

        });

        describe('destroy', function () {

            let game;

            beforeEach(function () {
                game = KGame('destroy-test', containerElem, testScreen);
                spyOn(game._loopManager, '_stop').and.callThrough();
            });

            afterEach(function () {
                if(!game.destroyed) fail();
            });

            it('should call _stop on the loopManager of the game', function () {
                game.destroy();
                expect(game._loopManager._stop).toHaveBeenCalled();
            });

            it('should remove its canvas element from the DOM', function () {
                expect(containerElem.querySelector('canvas')).not.toBe(null);
                game.destroy();
                expect(containerElem.querySelector('canvas')).toBe(null);
            });

            it('should cause a lookup of the specified game to return null', function () {
                expect(game).not.toBe(null);
                game.destroy();
                expect(KGame('destroy-test')).toBe(null);
            });

            it('should allow you to create an instance with the same name after destruction with default initialized values', function () {
                game.destroy();
                game = KGame('destroy-test', containerElem, testScreen);
                expect(game._loopManager.paused === false);
                expect(game._loopManager.stopped === false);
                game.destroy();
            });

            it('should not cache the loopManager after destroy', function () {
                game._loopManager.cachedTest = true;
                game.destroy();
                game = KGame('destroy-test', containerElem, testScreen);
                expect(game._loopManager.cachedTest).not.toBeDefined();
                game.destroy();
            });

            it('should not cache the screenManager after destroy', function () {
                game._screenManager.cachedTest = true;
                game.destroy();
                game = KGame('destroy-test', containerElem, testScreen);
                expect(game._screenManager.cachedTest).not.toBeDefined();
                game.destroy();
            });

        });

        describe('_loopManager', function () {

            var game, rafControl, currentTime, rafSpy;

            beforeEach(function () {
                rafSpy = spyOn(window, 'requestAnimationFrame').and.callFake(function (loopCallback) {
                    rafControl = {
                        nextTick: (ms) => {
                            if (ms !== undefined) currentTime += ms;
                            loopCallback(currentTime)
                        }
                    }
                });
                currentTime = 0;
                game = KGame('loop-test', containerElem, testScreen);
                game._loopManager.MAX_FPS = 60;
            });

            afterEach(function () {
                rafSpy.calls.reset();
                game.destroy();
                game = null;
                rafControl = null;
            });

            it('should be defined', function () {
                expect(game._loopManager).toBeDefined();
            });

            it('should have a defined loop method', function () {
                expect(game._loopManager.loop).toBeDefined();
            });

            it('should NOT be paused on init', function () {
                expect(game._loopManager.paused).toBe(false);
            });

            it('should NOT be stopped on init', function () {
                expect(game._loopManager.stopped).toBe(false);
            });

            it('should set the lastFrameTimeMs every time the frame count exceeds MAX_FPS / 1000, calling requestAnimationFrame after each update', function () {

                // Initialize at 0
                expect(game._loopManager.lastFrameTimeMs).toEqual(0);
                expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
                rafControl.nextTick(1);
                //Remain at 0 as we have not exceeded MAX_FPS / 1000 ==> 16.666...
                expect(game._loopManager.lastFrameTimeMs).toEqual(0);
                expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
                rafControl.nextTick(15);
                //Remain at 0 as we have not exceeded MAX_FPS / 1000 ==> 16.666...
                expect(game._loopManager.lastFrameTimeMs).toEqual(0);
                expect(requestAnimationFrame).toHaveBeenCalledTimes(3);
                rafControl.nextTick(1);
                //Update lastFrameTimeMs as we have passed 16.666
                expect(game._loopManager.lastFrameTimeMs).toEqual(17);
                expect(requestAnimationFrame).toHaveBeenCalledTimes(4);
                rafControl.nextTick(1);
                //Remain at 17 until we pass 33.333
                expect(game._loopManager.lastFrameTimeMs).toEqual(17);
                expect(requestAnimationFrame).toHaveBeenCalledTimes(5);
                rafControl.nextTick(15);
                //Remain at 17 until we pass 33.333
                expect(game._loopManager.lastFrameTimeMs).toEqual(17);
                expect(requestAnimationFrame).toHaveBeenCalledTimes(6);
                rafControl.nextTick(1);
                //Now we have surpassed 33.333, update
                expect(game._loopManager.lastFrameTimeMs).toEqual(34);
                expect(requestAnimationFrame).toHaveBeenCalledTimes(7);

            });

            it('should have a _togglePause method', function () {
                expect(game._loopManager._togglePause).toBeDefined();
            });

            it('should NOT be paused by default', function () {
                expect(game._loopManager.paused).toBe(false);
            });

            it('should toggle between paused states', function () {
                expect(game._loopManager.paused).toBe(false);
                game._loopManager._togglePause();
                expect(game._loopManager.paused).toBe(true);
                game._loopManager._togglePause();
                expect(game._loopManager.paused).toBe(false);
            });

            it('should have a _stop method', function () {
                expect(game._loopManager._stop).toBeDefined();
            });

            it('should stop the requestAnimationFrameLoop', function () {
                expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
                game._loopManager._stop();
                rafControl.nextTick(2000);
                expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
            });

            it('should clean up the cached screenManager', function () {
                game._screenManager.foo = 'bar';
                game.destroy();
                game = KGame('loop-test', containerElem, testScreen);
                expect(game._screenManager.foo).toBeUndefined();
            });

        })

    });
});