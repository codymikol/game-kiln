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

        var errorPrefix = '\nKGame accepts [name, canvas, screen] args, \nBUT The below errors occurred';
        var canvasElem = document.createElement('CANVAS');
        canvasElem.id ='cool-id';
        var buttonElem = document.createElement('BUTTON');
        var testScreen = new TestScreen();


        it('should throw a useful error when an HTML element is not passed', function () {
            expect(KGame.bind(null, 'my-game', null, testScreen))
                .toThrow(new Error(errorPrefix + '\n["canvas" was not a valid DOM element]'))
        });

        it('should throw a useful error when a non canvas element is passed', function () {
            expect(KGame.bind(null, 'my-game', buttonElem, testScreen))
                .toThrow(new Error(errorPrefix + '\n["canvas" was not a canvas element]'))
        });

        it('should throw a useful error when a name is not passed', function () {
            expect(KGame.bind(null, null, canvasElem, testScreen))
                .toThrow(new Error(errorPrefix + '\n["name" was not a string]'))
        });

        it('should throw an error if a starting screen is not defined', function () {
            expect(KGame.bind(null, 'cool-game', canvasElem, null))
                .toThrow(new Error(errorPrefix + '\n["screen" was not an instance of KScreen]'))
        });

        it('should be able to concat all errors together :D', function () {
            expect(KGame.bind(null, null, null, null))
                .toThrow(new Error(errorPrefix + '\n' +
                    '["canvas" was not a valid DOM element]\n' +
                    '["name" was not a string]\n' +
                    '["screen" was not an instance of KScreen]'))
        });

        it('should not trow an error if a valid name and canvas element are provided', function () {
            expect(KGame.bind(null, 'new-game', canvasElem, testScreen)).not.toThrow()
        });

        describe('Getter functionality', function () {

            it('should return a useful error when trying to lookup a non-existing game', function () {
                expect(KGame.bind(null, 'non-existing-game'))
                    .toThrow(new Error("No Kiln found for \"non-existing-game\""));
            });

            describe('When a Kiln does exist', function () {

                var instance;

                beforeAll(function () {
                    KGame('real-game', canvasElem, testScreen);
                    instance = KGame('real-game');
                });

                it('should have the correct name', function () {
                    expect(instance.name).toEqual('real-game');
                });

                it('should have an element reference', function () {
                    expect(instance._element.id).toEqual('cool-id');
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