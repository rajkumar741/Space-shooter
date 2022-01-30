
import { _decorator, Component, Node, Vec3, random } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyAI
 * DateTime = Sun Jan 30 2022 00:54:48 GMT+0530 (India Standard Time)
 * Author = iamRajkumar
 * FileBasename = EnemyAI.ts
 * FileBasenameNoExtension = EnemyAI
 * URL = db://assets/Scripts/EnemyAI.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('EnemyAI')
export class EnemyAI extends Component {
    targetPos:Vec3 = new Vec3();
    speed:number = Math.floor(Math.random() * 6) + 2;

    update (deltaTime:number) {
        this.node.getPosition(this.targetPos);
        Vec3.add(this.targetPos,this.targetPos,new Vec3(0,-this.speed*deltaTime,0));
        this.node.setPosition(this.targetPos);
    }
}
