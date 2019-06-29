export class Bullet extends Phaser.GameObjects.Sprite {

    private speed:number;
    private bullet:Phaser.GameObjects.Image;

    constructor(scene:Phaser.Scene)
    {
        super(scene, 0, 0, 'bullet');
    scene.add.existing(this);
    this.speed = Phaser.Math.GetSpeed(400, 1);

        //Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        // this.bullet = scene.add.image(0,0,'bullet')

        this.speed = Phaser.Math.GetSpeed(400, 1);
    }

    fire(x, y):void
    {
        this.setPosition(x, y - 50);

        this.setActive(true);
        this.setVisible(true);
    }
    
    update(time, delta):void
    {
        this.y -= this.speed * delta;

        if (this.y < -50)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

}