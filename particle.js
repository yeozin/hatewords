const FRICTION = 1; // 마찰력 클수록 글자 더 많이 퍼짐
const MOVE_SPEED = 0.15; // 움직이는 속도 조절

export class Particle{
    constructor(pos, texture){
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.set(0.3);

        this.savedX = pos.x;
        this.savedY = pos.y;
        this.x = pos.x;
        this.y = pos.y;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 10;
    }

    draw(){
        this.x += (this.savedX - this.x) * MOVE_SPEED;
        this.y += (this.savedY - this.y) * MOVE_SPEED;

        this.vx *=FRICTION;
        this.vy *=FRICTION;

        this.x += this.vx;
        this.y += this.vy;

        
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    }
}