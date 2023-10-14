import KEntity from "../KEntity/KEntity";

export default class KScreen {
    
    readonly entities: {};
    private nonce: number;
    private kiln: string;

    constructor() {
        this.nonce = 0;
        this.kiln = null;
        this.entities = {};
    }

    setKiln(kiln: string) {
        this.kiln = kiln
    }

    add(entity: KEntity) {
        if(!(entity instanceof KEntity)) throw new Error('attempted to add non "KEntity" to "KScreen"');
        this.entities[entity.id] = entity;
        entity.setKiln(this.kiln);
        entity.setParent(this);
        entity.onCreate();
        this.nonce++;
    }

    delete(id: number) {
        if(!Number.isInteger(id)) throw new Error('Attempted to delete "KEntity" from screen, but an invalid id was passed!');
        if(!this.entities[id]) throw new Error('Tried to delete entity id {' + id + '} but it does not exist!');
        delete this.entities[id];
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