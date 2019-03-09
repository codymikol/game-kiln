describe('Input', function () {

    describe('Keyboard Interaction', function () {

        let keyboard = new Kiln.Input.Keyboard();

        afterEach(function () {
            //reset the keydown between tests otherwise they will conflict.
            keyboard.keyDown = {};
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

                var down = new KeyboardEvent('keydown', {key: "E"});

                window.dispatchEvent(down);

                expect(keyboard.isDown('e')).toBe(true);

            });

            it('should return false when a key is down and then up', function () {

                var down = new KeyboardEvent('keydown', {key: "E"});

                window.dispatchEvent(down);

                var up = new KeyboardEvent('keyup', {key: "E"});

                window.dispatchEvent(up);

                expect(keyboard.isDown('e')).toBe(false);

            });
        });

        describe('isUp', function () {

            it('should return true when a key is up', function () {
                expect(keyboard.isUp('e')).toBe(true);
            });

            it('should return false when a key is down', function () {

                var down = new KeyboardEvent('keydown', {key: "E"});

                window.dispatchEvent(down);

                expect(keyboard.isUp('e')).toBe(false);

            });

            it('should return true when a key is down and then up', function () {

                var down = new KeyboardEvent('keydown', {key: "E"});

                window.dispatchEvent(down);

                var up = new KeyboardEvent('keyup', {key: "E"});

                window.dispatchEvent(up);

                expect(keyboard.isUp('e')).toBe(true);

            });
        });


    });

});