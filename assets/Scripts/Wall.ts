
import { _decorator, Component, Node, ColliderComponent, find, ITriggerEvent } from 'cc';
import { EnemyAI } from './EnemyAI';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Wall
 * DateTime = Sun Jan 30 2022 13:43:03 GMT+0530 (India Standard Time)
 * Author = iamRajkumar
 * FileBasename = Wall.ts
 * FileBasenameNoExtension = Wall
 * URL = db://assets/Scripts/Wall.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('Wall')
export class Wall extends Component {
    @property(GameController)
    gameController:GameController = null;
    start(){
        let collider = this.getComponent(ColliderComponent);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);   
        this.gameController = find('GameController').getComponent(GameController);     
    }
    onTriggerEnter (event:ITriggerEvent) {
        if(event.otherCollider.getComponent(EnemyAI)!=null){           
            this.gameController.reduceEnemyCount();
            event.otherCollider.node.destroy();
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
