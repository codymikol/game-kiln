import {KInput} from "../../src";
import {KDraw, KEntity, KScreen} from "../../src";
import {KGame} from "../../src";


describe('Input', function () {

    var mouse, mockKDraw, mockGame;

    beforeAll(function () {

        class TestScreen extends KScreen {
            constructor() {
                super();
                this.onCreate = () => {
                    this.mustBeDefinedToNotThrowGlobalError = true;
                }
            }
        }

        var canvasElem = document.createElement('CANVAS');
        canvasElem.id ='test-kiln';
        var testScreen = new TestScreen();

        mockGame = new KGame('test-kiln', canvasElem, testScreen);

        mockKDraw = new KDraw('test-kiln');

        mouse = new KInput.Mouse('test-kiln');

        spyOn(mockKDraw, 'getCtx').and.returnValue({
            canvas: {
                getBoundingClientRect: function () {
                    return {
                        left: 0,
                        top: 0
                    }
                }
            }
        });

    });

    describe('Keyboard Interaction', function () {

        let keyboard = new KInput.Keyboard();
        let down = new KeyboardEvent('keydown', {key: "E"});
        let up = new KeyboardEvent('keyup', {key: "E"});

        afterEach(function () {
            keyboard.reset();
        });

        it('should allow me to create a keyboard instance', function () {
            expect(new KInput.Keyboard()).toBeDefined();
        });

        it('should always give me the same instance of Keyboard as it is a singleton', function () {
            keyboard.cached = 'hello';
            let keyboardTwo = new KInput.Keyboard();
            expect(keyboardTwo.cached).toEqual('hello')
        });

        describe('isDown', function () {

            it('should return false when a key is not down', function () {
                expect(keyboard.isDown('e')).toBe(false);
            });

            it('should return true when a key is down', function () {
                window.dispatchEvent(down);
                expect(keyboard.isDown('e')).toBe(true);
            });

            it('should return false when a key is down and then up', function () {
                window.dispatchEvent(down);
                window.dispatchEvent(up);
                expect(keyboard.isDown('e')).toBe(false);
            });
        });

        describe('isUp', function () {

            it('should return true when a key is up', function () {
                expect(keyboard.isUp('e')).toBe(true);
            });

            it('should return false when a key is down', function () {
                window.dispatchEvent(down);
                expect(keyboard.isUp('e')).toBe(false);
            });

            it('should return true when a key is down and then up', function () {
                window.dispatchEvent(down);
                window.dispatchEvent(up);
                expect(keyboard.isUp('e')).toBe(true);
            });
        });

        describe('reset', function () {

            it('should reset all keyDown entries to an empty object', function () {
                window.dispatchEvent(down);
                expect(keyboard.keyDown).toEqual({e: true});
                keyboard.reset();
                expect(keyboard.keyDown).toEqual({});
            });

            it('should reset all _downEvents', function () {
                var a;
                expect(keyboard._downEvents).toEqual({});
                var id = keyboard.onDown('e', () => a = 1);
                expect(keyboard._downEvents['e'].get(id)).toBeDefined();
                keyboard.reset();
                expect(keyboard._downEvents).toEqual({});
            });
            
            it('should reset all _upEvents', function () {
                var a;
                expect(keyboard._upEvents).toEqual({});
                var id = keyboard.onUp('e', () => a = 1);
                expect(keyboard._upEvents['e'].get(id)).toBeDefined();
                keyboard.reset();
                expect(keyboard._upEvents).toEqual({})
            });

        });

        describe('onDown', function () {

            let a;

            beforeEach(function () {
                a = 0;
            });

            it('should add a fire a function on the passed key down', function () {
                var a = 0;
                keyboard.onDown('e', () => a += 1);
                expect(a).toEqual(0);
                window.dispatchEvent(down);
                expect(a).toEqual(1);
            });

            it('should continue to track key events', function () {
                var a = 0;
                keyboard.onDown('e', () => a += 1);
                expect(a).toEqual(0);
                window.dispatchEvent(down);
                expect(a).toEqual(1);
                window.dispatchEvent(down);
                expect(a).toEqual(2);
            });

        });

        describe('onUp', function () {

            let a;

            beforeEach(function () {
                a = 0;
            });

            it('should add a fire a function on the passed key up', function () {
                var a = 0;
                keyboard.onUp('e', () => a += 1);
                expect(a).toEqual(0);
                window.dispatchEvent(up);
                expect(a).toEqual(1);
            });

            it('should continue to track key events', function () {
                var a = 0;
                keyboard.onUp('e', () => a += 1);
                expect(a).toEqual(0);
                window.dispatchEvent(up);
                expect(a).toEqual(1);
                window.dispatchEvent(up);
                expect(a).toEqual(2);
            });

        });


    });

    describe('Mouse Interaction', function () {

        let down = new MouseEvent('mousedown', {clientX: 100, clientY: 200});
        let up = new MouseEvent('mouseup', {clientX: 100, clientY: 200});
        let move = new MouseEvent('mousemove', {clientX: 100, clientY: 200});

        let mockEntity;

        beforeEach(function () {
           mockEntity = new KEntity(100, 100, 10, 10)
        });

        afterEach(function () {
            mouse.reset();
        });

        it('should allow me to create a new Mouse instance', function () {
            expect(new KInput.Mouse('test-kiln')).toBeDefined();
        });

        it('should always give me the same instance of Mouse as it is a singleton', function () {
            mouse.cached = 'hello';
            let mouseTwo = new KInput.Mouse('test-kiln');
            expect(mouseTwo.cached).toEqual('hello')
        });

        describe('reset', function () {

        });

        describe('x', function () {
            it('should return the current value of x', function () {
                expect(mouse.x()).toEqual(0);
                window.dispatchEvent(move);
                expect(mouse.x()).toEqual(100)
            });
        });

        describe('y', function () {
            it('should return the current value of y', function () {
                expect(mouse.y()).toEqual(0);
                window.dispatchEvent(move);
                expect(mouse.y()).toEqual(200)
            });
        });

        describe('isHovered', function () {

            let moveInBounds = new MouseEvent('mousemove', {clientX: 100, clientY: 100});
            let moveOutBounds = new MouseEvent('mousemove', {clientX: 1000, clientY: 1000});

            it('should be defined', function () {
                expect(mouse.isHovered).toBeDefined();
            });

            it('should return true if the passed entity intersects the last known mousePos', function () {
                window.dispatchEvent(moveInBounds);
                expect(mouse.isHovered(mockEntity)).toBe(true);
            });

            it('should return false if the passed entity does NOT intersect the last known mousePos', function () {
                window.dispatchEvent(moveOutBounds);
                expect(mouse.isHovered(mockEntity)).toBe(false);
            });

        });

        describe('isDown', function () {

            it('should track the up and down state of the mouse correctly returning true or false', function () {
                window.dispatchEvent(down);
                expect(mouse.isDown()).toBe(true);
                window.dispatchEvent(up);
                expect(mouse.isDown()).toBe(false);
                window.dispatchEvent(down);
                expect(mouse.isDown()).toBe(true);
            });

        });

        describe('isUp', function () {

            it('should track the up and down state of the mouse correctly returning true or false', function () {
                window.dispatchEvent(down);
                expect(mouse.isUp()).toBe(false);
                window.dispatchEvent(up);
                expect(mouse.isUp()).toBe(true);
                window.dispatchEvent(down);
                expect(mouse.isUp()).toBe(false);
            });

        });

        describe('onDown', function () {

            let downInBounds = new MouseEvent('mousedown', {clientX: 100, clientY: 100});
            let downOutBounds = new MouseEvent('mousedown', {clientX: 1000, clientY: 1000});

            it('should create a function that will trigger on mousedown events', function () {
                let caught = false;
                mouse.onDown(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(downInBounds);
                expect(caught).toBe(true);
            });

            it('should NOT trigger when the mouse is not in the bounds of the passed entity', function () {
                let caught = false;
                mouse.onDown(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(downOutBounds);
                expect(caught).toBe(false);
            });

            it('should NOT trigger for mouseup events', function () {
                let caught = false;
                mouse.onDown(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(up);
                expect(caught).toBe(false);
            });

            it('should NOT trigger for mousemove events', function () {
                let caught = false;
                mouse.onDown(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(move);
                expect(caught).toBe(false);
            });

            it('should only propagate one click event', function () {
                let count = 0;
                mouse.onDown(mockEntity,() => count++);
                expect(count).toBe(0);
                window.dispatchEvent(downInBounds);
                expect(count).toBe(1);
                window.dispatchEvent(downInBounds);
                expect(count).toBe(2);
            });

            it('should NOT propagate after the entity is destroyed', function () {
                let count = 0;
                mouse.onDown(mockEntity,() => count++);
                expect(count).toBe(0);
                window.dispatchEvent(downInBounds);
                expect(count).toBe(1);
                mockEntity.destroy();
                window.dispatchEvent(downInBounds);
                expect(count).toBe(1);
            });

        });

        describe('onUp', function () {

            let upInBounds = new MouseEvent('mouseup', {clientX: 100, clientY: 100});
            let upOutBounds = new MouseEvent('mouseup', {clientX: 1000, clientY: 1000});

            it('should create a function that will trigger on mouseup events', function () {
                let caught = false;
                mouse.onUp(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(upInBounds);
                expect(caught).toBe(true);
            });

            it('should NOT trigger when mouse is out of the bounds of the passed entity', function () {
                let caught = false;
                mouse.onUp(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(upOutBounds);
                expect(caught).toBe(false);
            });

            it('should NOT trigger for mousedown events', function () {
                let caught = false;
                mouse.onUp(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(down);
                expect(caught).toBe(false);
            });

            it('should NOT trigger for mousemove events', function () {
                let caught = false;
                mouse.onUp(mockEntity, () => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(move);
                expect(caught).toBe(false);
            });

            it('should only propagate one click event', function () {
                let count = 0;
                mouse.onUp(mockEntity,() => count++);
                expect(count).toBe(0);
                window.dispatchEvent(upInBounds);
                expect(count).toBe(1);
                window.dispatchEvent(upInBounds);
                expect(count).toBe(2);
            });

            it('should NOT trigger after the entity is destroyed', function () {
                let count = 0;
                mouse.onUp(mockEntity,() => count++);
                expect(count).toBe(0);
                window.dispatchEvent(upInBounds);
                expect(count).toBe(1);
                mockEntity.destroy();
                window.dispatchEvent(upInBounds);
                expect(count).toBe(1);
            });

        });

        describe('onMove', function () {

            it('should create a function that will trigger on mousemove events', function () {
                let caught = false;
                mouse.onMove(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(move);
                expect(caught).toBe(true);
            });

            it('should NOT trigger for mousedown events', function () {
                let caught = false;
                mouse.onMove(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(down);
                expect(caught).toBe(false);
            });

            it('should NOT trigger for mouseup events', function () {
                let caught = false;
                mouse.onMove(mockEntity,() => caught = true);
                expect(caught).toBe(false);
                window.dispatchEvent(up);
                expect(caught).toBe(false);
            });

            it('should only propagate one click event', function () {
                let count = 0;
                mouse.onMove(mockEntity,() => count++);
                expect(count).toBe(0);
                window.dispatchEvent(move);
                expect(count).toBe(1);
                window.dispatchEvent(move);
                expect(count).toBe(2);
            });

            it('should NOT trigger after the entity has been destroyed', function () {
                let count = 0;
                mouse.onMove(mockEntity,() => count++);
                expect(count).toBe(0);
                window.dispatchEvent(move);
                expect(count).toBe(1);
                mockEntity.destroy();
                window.dispatchEvent(move);
                expect(count).toBe(1);
            })

        });

    })

});