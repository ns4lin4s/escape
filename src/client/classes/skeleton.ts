
export class Skeleton extends Phaser.GameObjects.Sprite {

    private isLookingLeft = false;
    private border: Phaser.GameObjects.Sprite;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);

        this.setOrigin(0,0)

        this.border = new Phaser.GameObjects.Sprite(params.scene, params.x +17, params.y + 50 , 'border');

        this.border.setVisible(false)

        params.scene.add.existing(this.border);
        
        params.scene.physics.world.enable(this.border);
        params.scene.physics.world.enable(this);
        this.body.allowGravity = false;
        params.scene.add.existing(this)

    }

}