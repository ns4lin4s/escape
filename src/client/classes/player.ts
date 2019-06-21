
const VELOCITY = 150;

export class Knight {

    private cursors = null;
    private isLookingLeft = false;
    private player: Phaser.GameObjects.Sprite;
    private healthBar: Phaser.GameObjects.Sprite;
    private redHealthBar: Phaser.GameObjects.Sprite;
    private border: Phaser.GameObjects.Sprite;
    private scene :Phaser.Scene;
    private data: { positionX:0, positionY:0 };
    
    constructor(params) {

        this.data = { positionX:params.x, positionY:params.y };
        //super(params.scene, params.x, params.y, params.key, params.frame);
        this.scene = params.scene;
        
        this.player = this.scene.impact.add.sprite(params.x, params.y, params.key)
        
        //this.border = this.scene.impact.add.sprite( params.x, params.y - 10, 'border')
        

        //this.player = new Phaser.GameObjects.Sprite(params.scene, params.x, params.y, params.key);
        
        // this.redHealthBar = new Phaser.GameObjects.Sprite(params.scene, params.x, params.y, 'redbar');
        // this.redHealthBar.setScale(4);
        // this.redHealthBar.setOrigin(0,0.5)
        // this.redHealthBar.setScale(5,4)
        // this.redHealthBar.setDepth(12)

        // this.healthBar = new Phaser.GameObjects.Sprite(params.scene, params.x, params.y, 'bar');
        // this.healthBar.setScale(4);
        // this.healthBar.setOrigin(0,0.5)
        // this.healthBar.setScale(1,4)
        // this.healthBar.setDepth(12)

        
        // this.border = new Phaser.GameObjects.Sprite(params.scene, params.x, params.y - 10, 'border');
        // this.border.setDisplaySize(25,2.7)
        
        //this.border.setVisible(false)
        
        // params.scene.add.existing(this.player);
        // params.scene.add.existing(this.border);

        
        // params.scene.add.existing(this.redHealthBar);
        // params.scene.add.existing(this.healthBar);

        // physics
        // params.scene.physics.world.enable(this.player);
        // params.scene.physics.world.enable(this.border);
    

        // params.scene.physics.add.existing(this.player);
        // params.scene.physics.add.existing(this.border);

       
        // params.scene.physics.world.enable(this.redHealthBar);
        // params.scene.physics.world.enable(this.healthBar);
        
        //this.player.body.allowGravity = false;
        //this.player.setBlendMode(Phaser.BlendModes.MULTIPLY)
        // animations
        // params.scene.anims.create({
        //     key: 'idle-right',
        //     //frames: [ { key: 'knight1', frame: 0 } ],
        //     frames: params.scene.anims.generateFrameNames('knight1', { start: 0, end: 2 }),
        //     frameRate: 15,
        //     repeat: -1
        // });

        // params.scene.anims.create({
        //     key: 'idle-left',
        //     frames: [ { key: 'knight1', frame: 4 } ],
        //     //frames: params.scene.anims.generateFrameNames('knight1', { start: 13, end: 13 }),
        //     frameRate: 15,
        //     repeat: -1
        // });

        // params.scene.anims.create({
        //     key: 'left',
        //     frames: params.scene.anims.generateFrameNames('knight1', { start: 4, end: 8 }),
        //     frameRate: 9,
        //     repeat: 1
        // });

        params.scene.anims.create({
            key: 'right',
            frames: params.scene.anims.generateFrameNames('knight1', { start: 0, end: 2 }),
            frameRate: 9,
            repeat: 1
        });

        

        //this.player.flipX = true
        //this.player.flipY = true
        //this.player.rotation = 180
        this.cursors = params.scene.input.keyboard.createCursorKeys();
        
        
        
    }

    update(): void {
        
        // this.border.body.acceleration.set(0);
        // this.player.body.acceleration.set(0);
        // this.player.body.setVelocity(0);
        // // this.healthBar.body.setVelocity(0);
        // // this.redHealthBar.body.setVelocity(0);
        //this.border.body.setVelocity(0);
        

        // this.healthBar.x = this.player.x - 20;
        // this.healthBar.y = this.player.y - 25;


        // this.redHealthBar.x = this.player.x - 20;
        // this.redHealthBar.y = this.player.y - 25;
        

        if (this.cursors.up.isDown)
        {
            this.player.x += ((Math.cos(this.player.rotation) * 3)) 
            this.player.y += ((Math.sin(this.player.rotation) * 3))
            this.border.x = this.player.x
            this.border.y = this.player.y
            
        }
        else if (this.cursors.down.isDown)
        {
            
            this.player.x += ((Math.cos(this.player.rotation) * -3)) 
            this.player.y += ((Math.sin(this.player.rotation) * -3) )

            this.border.x = this.player.x
            this.border.y = this.player.y

        }
        else
        {
            
            //this.player.y = 0
            //this.player.body.setVelocity(0);
        }

        if (this.cursors.left.isDown)
        {
            this.player.setAngle(this.player.angle - 5)
            this.border.setAngle(this.player.angle - 5)
            //this.player.body.angularVelocity = -300;
            
            //this.scene.physics.moveTo(this.border, this.player.body.positionX - 20, this.player.body.positionY + 20);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setAngle(this.player.angle + 5)

            this.border.setAngle(this.player.angle + 5)
            //this.player.body.angularVelocity = 300;
            //this.scene.physics.moveTo(this.border, this.player.body.positionX - 20, this.player.body.positionY + 20);
        }
        else
        {
            
            //this.player.body.angularVelocity = 0;
            //this.border.body.angularVelocity = 0;
        }

        // if (this.cursors.up.isDown) {
            
        //     this.player.body.moves = true;
        //     //this.player.body.setVelocityY(-VELOCITY);
        //     this.scene.physics.moveTo(this.player, this.data.positionX, this.data.positionY);
        // } 
        // else if (this.cursors.down.isDown) 
        // {
        //     this.player.body.moves = true;
        //     //this.player.body.setVelocityY(-VELOCITY);
        //     console.log(this.data.positionX * -1 + "," + this.data.positionY *-1)
        //     this.scene.physics.moveTo(this.player, this.data.positionX * -1, this.data.positionY);
        //     // this.player.body.setVelocityX(this.player.x  * -1)
        //     // this.player.body.setVelocityY(this.player.y * -1)
        //     //this.scene.physics.moveTo(this.player, (this.data.positionX ) , (this.data.positionY *-1));
        // }
        
        // Horizontal movement
        // if ((this.cursors.left.isUp && this.cursors.right.isUp) && 
        // (this.cursors.down.isUp && this.cursors.up.isUp))
        // {
        //     this.player.anims.stop()
        // }
        
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        //this.player.body.velocity.normalize().scale(VELOCITY);
    }

}