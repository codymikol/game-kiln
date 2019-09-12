import {KScreen,KGame} from "../../src";

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

        var errorPrefix = '\nKGame accepts [name, container, screen] args, \nBUT The below errors occurred';
        var containerElem = document.createElement('DIV');
        containerElem.id ='cool-id';
        var buttonElem = document.createElement('BUTTON');
        var testScreen = new TestScreen();


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

        describe('Getter functionality', function () {

            it('should return null when trying to lookup a non-existing game', function () {
                expect(KGame('non-existing-game')).toEqual(null)
            });

            describe('When a Kiln does exist', function () {

                var instance;

                beforeAll(function () {
                    KGame('real-game', containerElem, testScreen);
                    instance = KGame('real-game');
                });

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

    });
});