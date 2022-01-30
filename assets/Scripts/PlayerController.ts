
import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, macro, SystemEvent, Vec3, Input, EventMouse, input, KeyCode, Prefab, AudioClip, instantiate, repeat, ColliderComponent, ITriggerEvent} from 'cc';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    moveLeft:number = 0;
    moveRight:number = 0;
    // LIFE-CYCLE CALLBACKS:

    //bullets
    @property(Prefab)
    greenBullet:Prefab = null;

    @property(GameController)
    gameController:GameController =null;

    @property({
        type:AudioClip
    })
    gun2 = null;

    shootBullets(){
        if(this.canShootBullets){
            this.canShootBullets = false;
            var bullet = instantiate(this.greenBullet);
            bullet.setPosition(this.node.position.x,this.node.position.y);
            this.node.parent.addChild(bullet);
        }
        // audioEngine.playEffect(this.gun2,false);
    }

    movePlayer(event:EventKeyboard){
        switch(event.keyCode){
            case KeyCode.ARROW_LEFT:
                this.moveLeft = 1;
                break;
            case KeyCode.ARROW_RIGHT:
                this.moveRight = 1;
                break;
            case KeyCode.SPACE:
                this.shootBullets();
                break;
        }
    }
    stopPlayer(event:EventKeyboard){
        switch(event.keyCode){
            case KeyCode.ARROW_LEFT:
                this.moveLeft = 0;
                break;
            case KeyCode.ARROW_RIGHT:
                this.moveRight = 0;
                break;
        }
    }
    onLoad () {
        input.on(Input.EventType.KEY_DOWN,this.movePlayer,this);
        input.on(Input.EventType.KEY_UP,this.stopPlayer,this);
    }

    start () {
        let collider = this.getComponent(ColliderComponent);
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }
    targetPos:Vec3=new Vec3();
    canShootBullets:boolean;
    timeToShoot:number = 0.5;
    curTime:number =0;
    update (deltaTime:number) {
        if(this.moveLeft == 1){
            this.node.getPosition(this.targetPos);
            Vec3.add(this.targetPos,this.targetPos,new Vec3(-300*deltaTime,0,0));
            this.node.setPosition(this.targetPos);
            //this.node.setPosition(this.node.position.x -= 300*dt,this.node.position.y);
        }
        if(this.moveRight == 1){
            this.node.getPosition(this.targetPos);
            Vec3.add(this.targetPos,this.targetPos,new Vec3(300*deltaTime,0,0));
            this.node.setPosition(this.targetPos);
        }
        if(!this.canShootBullets){
            this.curTime+=deltaTime;
            if(this.curTime>this.timeToShoot)
            {
                this.canShootBullets=true;
                this.curTime=0;
            }
        }
    }
    onTriggerEnter (event:ITriggerEvent) {
        if(event.otherCollider.getComponent('EnemyAI')!=null){
            event.otherCollider.node.destroy();
            if(this.gameController.canHaveLife()){
                this.gameController.reduceLife();
            }
            else
                this.gameController.showLosePanel();
        }
    }
}

