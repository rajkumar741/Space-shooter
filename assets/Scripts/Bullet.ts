
import { _decorator, Component, Node, Collider, ICollisionEvent, Vec3, ColliderComponent, RigidBodyComponent, SphereCollider, ITriggerEvent, find } from 'cc';
import { EnemyAI } from './EnemyAI';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property(GameController)
    gameController:GameController = null;
    @property
    BulletSpeed:number = 500;
    targetPos:Vec3 =new Vec3();

    start(){
        let collider = this.getComponent(ColliderComponent);
        collider.on('onTriggerEnter', this.onTriggerEnter, this); 
        this.gameController = find('GameController').getComponent(GameController);     
        this.scheduleOnce(function() {
            this.node.destroy();
        }, 3);  
    }
    onTriggerEnter (event:ITriggerEvent) {
        if(event.otherCollider.getComponent(EnemyAI)!=null){
            this.gameController.addScore();
            event.otherCollider.node.destroy();
            this.node.destroy();
        }
    }

    update (deltaTime:number) {
        this.node.getPosition(this.targetPos);
        Vec3.subtract(this.targetPos,this.targetPos,new Vec3(0,-this.BulletSpeed*deltaTime,0));
        this.node.setPosition(this.targetPos);
    }
}

