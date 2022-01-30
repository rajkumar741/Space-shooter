
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('MenuController')
export class MenuController extends Component {

    playGame(){
        director.loadScene('scene');
    }
}

