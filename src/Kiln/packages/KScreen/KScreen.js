import KEntity from "../KEntity/KEntity";

export default class KScreen {

    constructor() {
        this.nonce = 0;
        this.kiln = null;
        this.entities = {};
    }

    setKiln(kiln) {
        this.kiln = kiln
    }

    add(entity) {
        if(!(entity instanceof KEntity)) throw new Error('attempted to add non "KEntity" to "KScreen"');
        this.entities[entity.id] = entity;
        entity.setKiln(this.kiln);
        entity.setParent(this);
        entity.onCreate();
        this.nonce++;
    }

    delete(key) {
        if(!Number.isInteger(key)) throw new Error('Attempted to delete "KEntity" from screen, but an invalid id was passed!');
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