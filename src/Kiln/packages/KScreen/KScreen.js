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

        if(!(entity instanceof Kiln.Entity)) {
            throw new Error('attempted to add non "Kiln.Entity" to "Kiln.Screen"');
        }

        //TODO: See if there is some way to find out if this is called outside the
        entity.setKiln(this.kiln);
        this.entities[this.nonce] = entity;
        entity.create(this.nonce, this);
        this.nonce++;
    }

    delete(key) {
        this.entities[key].destroy();
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