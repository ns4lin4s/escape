
const VELOCITY = 150;

export class Knight extends Phaser.GameObjects.Sprite {

    private cursors = null;
    private isLookingLeft = false;
    private healthBar: Phaser.GameObjects.Sprite;
    private redHealthBar: Phaser.GameObjects.Sprite;
    private border: Phaser.GameObjects.Sprite;
    
    constructor(params) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        
        this.redHealthBar = new Phaser.GameObjects.Sprite(params.scene, params.x, params.y, 'redbar');
        this.redHealthBar.setScale(4);
        this.redHealthBar.setOrigin(0,0.5)
        this.redHealthBar.setScale(5,4)
        this.redHealthBar.setDepth(12)

        this.healthBar = new Phaser.GameObjects.Sprite(params.scene, params.x, params.y, 'bar');
        this.healthBar.setScale(4);
        this.healthBar.setOrigin(0,0.5)
        this.healthBar.setScale(1,4)
        this.healthBar.setDepth(12)

        this.border = new Phaser.GameObjects.Sprite(params.scene, params.x, params.y +9 , 'border');
        //this.border.setScale(4);
        //this.border.setDepth(12)
        this.border.setVisible(false)
        
        params.scene.add.existing(this.border);
        params.scene.add.existing(this.redHealthBar);
        params.scene.add.existing(this.healthBar);

        // physics
        params.scene.physics.world.enable(this.border);
        params.scene.physics.world.enable(this.redHealthBar);
        params.scene.physics.world.enable(this.healthBar);
        params.scene.physics.world.enable(this);
        //params.scene.physics.arcade.enable(healthBar);
        this.body.allowGravity = false;

        // animations
        params.scene.anims.create({
            key: 'idle-right',
            frames: [ { key: 'knight1', frame: 0 } ],
            //frames: params.scene.anims.generateFrameNames('knight1', { start: 12, end: 12 }),
            frameRate: 15,
            repeat: -1
        });

        params.scene.anims.create({
            key: 'idle-left',
            frames: [ { key: 'knight1', frame: 4 } ],
            //frames: params.scene.anims.generateFrameNames('knight1', { start: 13, end: 13 }),
            frameRate: 15,
            repeat: -1
        });

        params.scene.anims.create({
            key: 'left',
            frames: params.scene.anims.generateFrameNames('knight1', { start: 4, end: 8 }),
            frameRate: 9,
            repeat: 1
        });

        params.scene.anims.create({
            key: 'right',
            frames: params.scene.anims.generateFrameNames('knight1', { start: 0, end: 3 }),
            frameRate: 9,
            repeat: 1
        });

        params.scene.add.existing(this)

        this.cursors = params.scene.input.keyboard.createCursorKeys();
        
    }

    update(): void {
        
        this.body.setVelocity(0);
        this.healthBar.body.setVelocity(0);
        this.redHealthBar.body.setVelocity(0);
        this.border.body.setVelocity(0);

        this.healthBar.x = this.x - 20;
        this.healthBar.y = this.y - 25;

        this.body.x = this.x;
        this.body.y = this.y;

        this.redHealthBar.x = this.x - 20;
        this.redHealthBar.y = this.y - 25;
        
        // Vertical movement
        if (this.cursors.left.isDown) {
            this.anims.play('left',true)
            this.body.moves = true;
            this.border.body.moves = true;
            this.body.setVelocityX(-VELOCITY);
            this.healthBar.body.setVelocityX(-VELOCITY);
            this.redHealthBar.body.setVelocityX(-VELOCITY);
            this.border.body.setVelocityX(-VELOCITY);
            this.isLookingLeft = true
            
        } else if (this.cursors.right.isDown) {
            this.anims.play('right',true)
            this.body.setVelocityX(VELOCITY);
            this.body.moves = true;
            this.border.body.moves = true;
            this.healthBar.body.setVelocityX(VELOCITY);
            this.redHealthBar.body.setVelocityX(VELOCITY);
            this.border.body.setVelocityX(VELOCITY);
            this.isLookingLeft = false   
        }

        if (this.cursors.up.isDown) {
            
            if(this.isLookingLeft)
                this.anims.play('left',true)
            else
                this.anims.play('right',true)
            
            this.body.moves = true;
            this.border.body.moves = true;
            this.body.setVelocityY(-VELOCITY);
            
            this.healthBar.body.setVelocityY(-VELOCITY);
            this.redHealthBar.body.setVelocityY(-VELOCITY);
            this.border.body.setVelocityY(-VELOCITY);
            
        } 
        else if (this.cursors.down.isDown) 
        {
            if(this.isLookingLeft)
                this.anims.play('left',true)
            else
                this.anims.play('right',true)
            
            this.body.moves = true;
            this.border.body.moves = true;
            this.body.setVelocityY(VELOCITY);
            
            this.healthBar.body.setVelocityY(VELOCITY);
            this.redHealthBar.body.setVelocityY(VELOCITY);
            this.border.body.setVelocityY(VELOCITY);

        }
        
        // Horizontal movement
        if ((this.cursors.left.isUp && this.cursors.right.isUp) && 
        (this.cursors.down.isUp && this.cursors.up.isUp))
        {
            this.anims.stop()
        }
        
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        //this.body.velocity.normalize().scale(VELOCITY);
    }

}