import _ from '../../node_modules/underscore/underscore'

export default class Screen {

    constructor() {
        this.nonce = 0;
        this.entities = {};
    }

    getEntities() {
        return _.values(this.entities)
    }

    forEntities(fn) {
        this.getEntities().forEach(entity => fn(entity))
    }

    add(entity) {
        //TODO: See if there is some way to find out if this is called outside the
        //TODO: onCreate context and throw a console error.
        this.entities[this.nonce] = entity;
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

}