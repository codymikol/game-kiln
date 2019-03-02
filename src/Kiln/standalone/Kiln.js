//Standalone Kiln package for those who are not using webpack.
import KGame from '../packages/KGame/KGame'
import KScreen from '../packages/KScreen/KScreen';
import KEntity from '../packages/KEntity/KEntity';
import KDraw from "../packages/KDraw/KDraw";

window.Kiln = {
    Game: KGame,
    Screen: KScreen,
    Entity: KEntity,
    Draw: KDraw
};