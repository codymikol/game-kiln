import {values} from 'lodash';

export default class KScreen {

    constructor() {
        this.nonce = 0;
        this.kiln = null;
        this.entities = {};
    }

    setKiln(kiln) {
        this.kiln = kiln
    }

    getEntities() {
        return values(this.entities)
    }

    forEntities(fn) {
        this.getEntities().forEach(entity => fn(entity))
    }

    add(entity) {
        if(!(entity instanceof Kiln.Entity)) throw new Error('attempted to add non "Kiln.Entity" to "Kiln.Screen"');
        this.entities[entity.id] = entity;
        entity.setKiln(this.kiln);
        entity.setParent(this);
        entity.onCreate();
        this.nonce++;
    }

    delete(key) {
        if(!Number.isInteger(key)) throw new Error('Attempted to delete "Kiln.Entity" from screen, but an invalid id was passed!');
        if(!this.entities[key]) throw new Error('Tried to delete entity id {' + key + '} but it does not exist!');
        delete this.entities[key];
    }

    onCreate() {
        console.error(`
No onCreate called for: ${Object.getPrototypeOf(this).constructor.name}!\nYou should override this classes \
onCreate method to define your entities! \
`)
    }

    onDestroy() {
        //Overrideable
    }

}