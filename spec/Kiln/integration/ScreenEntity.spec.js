describe('Integration of Entities within Screens', function () {

    class MenuScreen extends Kiln.Screen {
        constructor() {
            super();
        }
    }

    class CoolEntity extends Kiln.Entity {
        constructor() {
            super();
        }

    }

    let menuScreen, coolEntity, twoEntity, deleteEntity;

    beforeEach(function () {
        menuScreen = new MenuScreen();
        coolEntity = new CoolEntity();
        twoEntity = new CoolEntity();
        deleteEntity = new CoolEntity();
    });

    describe('Adding an Entity to a Screen', function () {

        it('should throw an error when trying to add a non entity', function () {
            expect(menuScreen.add.bind(null, 'non entity'))
                .toThrowError('attempted to add non "Kiln.Entity" to "Kiln.Screen"');
        });

        it('should add the entity to the screen entities with the key being the entity id'
            , function () {

                //TODO: We have to stub these because the Mouse is not yet decoupled, eventually we shouldn'y have to...
                spyOn(coolEntity, 'setKiln').and.stub();
                spyOn(twoEntity, 'setKiln').and.stub();

                menuScreen.add(coolEntity);
                menuScreen.add(twoEntity);

                expect(menuScreen.entities).not.toEqual({});
                expect(Object.values(menuScreen.entities).length).toEqual(2);
                expect(menuScreen.entities[coolEntity.id]).toBe(coolEntity);
                expect(menuScreen.entities[twoEntity.id]).toBe(twoEntity);

            });

    });

    describe('Deleting an Entity from a Screen', function () {

        beforeEach(function () {
            spyOn(deleteEntity, 'setKiln').and.stub();
            menuScreen.add(deleteEntity);
        });

        it('should throw an error if the id is not passed', function () {
            expect(menuScreen.delete.bind(null, deleteEntity))
                .toThrowError('Attempted to delete "Kiln.Entity" from screen, but an invalid id was passed!');
        });

        it('should remove an entity when the id is correctly passed and throw error', function () {
            menuScreen.delete(deleteEntity.id);
            expect(menuScreen.entities).toEqual({});
        });

        it('should throw an error if you try to delete an entity that is not there', function () {
            menuScreen.delete(deleteEntity.id);
            expect(menuScreen.entities).toEqual({});
            expect(menuScreen.delete.bind(menuScreen, deleteEntity.id))
                .toThrowError('Tried to delete entity id {' + deleteEntity.id + '} but it does not exist!');
        });

    });

});