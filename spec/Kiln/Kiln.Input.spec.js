describe('Input', function () {

    describe('Keyboard Interaction', function () {

        it('should allow me to create a keybaord instance', function () {
            expect(new Kiln.Input.Keyboard()).toBeDefined();
        });

        it('should always give me the same instance of Keyboard as it is a singleton', function () {

            let keyboard = new Kiln.Input.Keyboard();

            keyboard.cached = 'hello';

            let keyboardTwo = new Kiln.Input.Keyboard();

            expect(keyboardTwo.cached).toEqual('hello')

        });

    });

});