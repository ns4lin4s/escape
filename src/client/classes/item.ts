
export class Item extends Phaser.GameObjects.Sprite {

    private _count = 0;

    constructor(params) {
        
        super(params.scene, params.x, params.y, params.key, params.frame)

        params.scene.anims.create({
            key: 'walk',
            //frames: [ { key: 'coin',  { start: 0, end: 10 } ],
            frames: params.scene.anims.generateFrameNames('coin', { start: 0, end: 10 }),
            frameRate: null,
            repeat: -1
        });

        params.scene.add.existing(this)

        this.anims.play('walk',true)
    }

    update(): void {
        
        //this.anims.play('walk',true)
        this.x = this._count++  //setVelocityX(this._count++);
    }

}