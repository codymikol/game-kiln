import {KScreen} from "../../../index";
import KGameInstance from "./KGameInstance";

const kGameStore: Map<string, KGameInstance> = new Map();

export function getKGame(kinName: string): KGameInstance | undefined {
    return kGameStore.get(kinName)
}

export function createKGame(kilnName: string, bindElement: HTMLElement, initialScreen: KScreen) {

    if(!(bindElement instanceof HTMLDivElement)) {
        throw new Error("[\"container\" was not a div element]")
    }

    if(undefined != getKGame(kilnName)) {
        throw new Error('A game with the name ' + kilnName + ' has already been initialized!')
    }

    const instance = new KGameInstance(kilnName, bindElement, initialScreen, kGameStore)
    kGameStore.set(kilnName, instance);
    return instance

}