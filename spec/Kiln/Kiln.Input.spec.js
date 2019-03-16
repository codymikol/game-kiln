describe('Input', function () {

    describe('Keyboard Interaction', function () {

        let keyboard = new Kiln.Input.Keyboard();
        let down = new KeyboardEvent('keydown', {key: "E"});
        let up = new KeyboardEvent('keyup', {key: "E"});

        afterEach(function () {
            keyboard.reset();
        });

        it('should allow me to create a keybaord instance', function () {
            expect(new Kiln.Input.Keyboard()).toBeDefined();
        });

        it('should always give me the same instance of Keyboard as it is a singleton', function () {
            keyboard.cached = 'hello';
            let keyboardTwo = new Kiln.Input.Keyboard();
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
                var id = keyboard.onDown('e', () =>  a = 1);
                expect(keyboard._downEvents['e'].get(id)).toBeDefined();
                keyboard.reset();
                expect(keyboard._downEvents).toEqual({});
            });

            //TODO Why did I do this D:
            xit('should reset all _upEvents', function () {
                var a;
                expect(keyboard._downEvents).toEqual(new Map());
                var id = keyboard.onDown('e', () =>  a = 1);
                expect(keyboard._downEvents.get(id)).toBeDefined();
                keyboard.reset();
                expect(keyboard._downEvents.get(id)).toBeUndefined();
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

});