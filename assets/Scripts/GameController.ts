
import { _decorator, Component, Node, RichText, director } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('GameController')
export class GameController extends Component {
    numberOfLifes:number = 3;
    score:number=0;
    numberOfEnimies:number;
    @property(Node)
    enemyParent:Node
    @property(Node)
    life1:Node;
    @property(Node)
    life2:Node;
    @property(Node)
    life3:Node;
    @property(RichText)
    scoreText:RichText;
    @property(Node)
    winPanel:Node= null;
    @property(Node)
    losePanel:Node= null;

    start () {
        this.numberOfEnimies = this.enemyParent.children.length;
    }
    canHaveLife(){
        if(this.numberOfLifes-1>0){
            return true;
        }
        else return false;
    }
    reduceLife(){
        this.numberOfLifes--;
        switch(this.numberOfLifes){
            case 0:
                this.life1.active =false;
                break;
            case 1:
                this.life2.active =false;
                break;
            case 2:
                this.life3.active =false;
                break;
        }
        this.reduceEnemyCount();
    }
    addScore(){
        this.score+=100;
        this.scoreText.string = ""+this.score;
        this.reduceEnemyCount();
    }
    reduceEnemyCount(){
        this.numberOfEnimies--;
        if(this.numberOfEnimies<=0)
        this.showWinPanel();
    }
    showWinPanel(){
        this.winPanel.active = true;
    }
    showLosePanel(){
        this.losePanel.active = true;
    }
    retryGame(){
        director.loadScene("scene");
    }
}

