/**
 * @author Nelson Osvaldo Salinas Guajardo
 */

import { Knight } from "../classes/player";
import { BlendModes } from "phaser";

export class GameScene extends Phaser.Scene {

    private collision_layer = null
    private player:Phaser.Physics.Impact.ImpactSprite = null
    private healthBar :Phaser.Physics.Impact.ImpactSprite = null
    private healthRedBar :Phaser.Physics.Impact.ImpactSprite = null
    private shadowTexture:Phaser.GameObjects.Graphics;
    private LIGHT_RADIUS = null
    private sombra = null
    private pointer_moved = false
    private cursors = null
    private spotlight = null
    private fire = false
    
    constructor() {
        super({
            key: "GameScene"
        })
    }

    preload(): void {
        this.load.image("tiles", "../assets/dungeoncombat/catastrophi_tiles_16.png");
        this.load.image('bar', '../assets/dungeoncombat/preloader-bar.png');
        this.load.image('redbar', '../assets/dungeoncombat/preloader-bar2.png');
        this.load.image('border', '../assets/dungeoncombat/border.png');
        this.load.image('mask', '../assets/dungeoncombat/mask1.png');
        
        //this.load.image('border-short', '../assets/dungeoncombat/border-short.png');
        this.load.tilemapTiledJSON("catastrophi_tiles_16", "../assets/dungeoncombat/dungeon01.json");
        
        this.load.spritesheet('knight1', '../assets/dungeoncombat/space_man_top_down_walk.png',{
            frameWidth: 24,
            frameHeight: 24
        })

        this.load.audio('hell', 
            'assets/dungeoncombat/hell.wav'
        );
        
        
    }

    create(): void {
       
        // let health = this.impact.add.sprite(16, 16, 'bar');
        // health.setScale(4);
        // health.setDepth(12)
        // this.healthBar.setOrigin(0,0.5)
        // this.healthBar.setScale(1,4)
        // this.healthBar.setDepth(12)
        let audio = this.sound.add('hell', { loop: true });
        audio.play()
        // audio.addMarker({ name: 'soundscape', start: 20, duration: 18.8, config: {} });

        setTimeout(()=>{
            audio.play('soundscape')
        },2000)
        
        

        this.input.setDefaultCursor('url(../assets/dungeoncombat/SC2-target-none.cur), pointer');

        var map = this.make.tilemap({ key: 'catastrophi_tiles_16', tileWidth: 16, tileHeight: 16 });
        
        var tileset = map.addTilesetImage("catastrophi_tiles_16", "tiles");
        
        map.createStaticLayer("background", tileset, 0, 0)

        var collision_layer = map.createStaticLayer("collision", tileset, 0, 0) 
        
        collision_layer.setCollisionByProperty({ collides: true },true);
        
        collision_layer.setCollisionBetween(1152, 1223);

        this.impact.world.setCollisionMapFromTilemapLayer(collision_layer, { defaultCollidingSlope: 1 });

        //player instance  
        this.findObjectByTypes('player','asset',map,'objectsLayer').forEach(function(element){
            
            this.player = this.impact.add.sprite(element.x, element.y, 'knight1')
            // this.player.setOrigin(0,0.5)
            // this.player.setScale(2,2)


            this.healthRedBar =this.impact.add.sprite(element.x - 20, element.y + 26, 'redbar');
            this.healthRedBar.setOrigin(0,0.5)
            this.healthRedBar.setScale(5,4)

            this.healthBar =this.impact.add.sprite(element.x - 20, element.y + 26, 'bar');
            this.healthBar.setOrigin(0,0.5)
            this.healthBar.setScale(4);
            //this.healthBar.displayHeight = 5
            // this.healthBar.setDepth(10)

            
            //this.healthRedBar.displayHeight = 5
            
            // let elementObj = new Item({
            //     scene: this,
            //     x: element.x,
            //     y: element.y,
            //     key: element.properties.asset
            // });
        }, this);
        
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('knight1', { start: 0, end:0 }),
            frameRate: 9,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('knight1', { start: 2, end:2 }),
            frameRate: 9,
            repeat: -1
        });

        // this.anims.create({
        //     key: 'down',
        //     frames: this.anims.generateFrameNumbers('knight1', { start: 0, end: 1 }),
        //     frameRate: 9,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'top',
        //     frames: this.anims.generateFrameNumbers('knight1', { start: 2, end: 3 }),
        //     frameRate: 9,
        //     repeat: -1
        // });

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.spotlight = this.make.sprite({
            x: 250,
            y: 200,
            key: 'mask',
            add: false
        });
    
        // pic.mask = 
        this.cameras.main.setMask(new Phaser.Display.Masks.BitmapMask(this, this.spotlight))
        
        // var player = this.physics.add.sprite(64, 64, "knight1")

        
        // this.physics.scene.add.existing(this.knight.player);
        // this.physics.scene.add.existing(this.knight.border);
        // this.physics.add.existing(this.knight.player);
        // this.physics.add.existing(this.knight.border);
        
        // this.physics.add.collider(this.knight.player,collision_layer,()=>{
        //     console.log("overlap")
        // })
        


        // // Create the shadow texture
        // this.sombra = this.textures.createCanvas('sombra',this.cameras.main.width,this.cameras.main.height)
        
        // this.sombra.refresh()
        // // Create an object that will use the bitmap as a texture
        // var lightSprite = this.add.image(0, 0, 'sombra');

        // // Set the blend mode to MULTIPLY. This will darken the colors of
        // // everything below this sprite.
        // lightSprite.setBlendMode(BlendModes.MULTIPLY)
        
        
        // this.flashlight()

        // const debugGraphics = this.add.graphics()//.setAlpha(0.66);
        // collision_layer.renderDebug(debugGraphics, {
        //     tileColor: null, // Non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        // });

        var help = this.add.text(16, 16, 'Arrow keys to move.', {
            fontSize: '18px',
            fill: '#ffffff'
        });
        help.setScrollFactor(0);
        let self = this
        this.input.on('pointerdown', function(pointer){
            // self.player.anims.play('fire', true);
            self.fire = true
            
         });

         this.input.on('pointerup', function(pointer){
            
            self.player.anims.stop();
            self.fire = false
         });
        
        this.input.on('pointermove', function (pointer)
        {
            this.spotlight.x = pointer.x;
            
            this.spotlight.y = pointer.y;

            let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y,pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)
            console.log(angle)
            if(Math.abs(angle)  > 1.5)
                this.player.anims.play('left', true);
            else
                this.player.anims.play('right', true);
            //this.player.rotation = angle
        
        }, this);    
        
        

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        
    }

    findObjectByTypes(targetType, nameType, tilemap, layer): any {

        let result = []
        
        if(!Array.isArray(tilemap.objects))
          return result
        
        let arrayObjects = tilemap.objects[0]
        if(arrayObjects.name === layer)
        {
            arrayObjects.objects.forEach(function(element){
                element.properties.forEach(function(property){
                    if(property.value == targetType && property.name == nameType)
                    {
                        result.push(element);
                    }
                })
                
            }, this);
        }
        
        return result;


    }

    flashlight()
    {
        this.sombra.getContext().fillStyle = 'rgb(100, 100, 100)';

        this.sombra.getContext().fillRect(0, 0, this.cameras.main.width,this.cameras.main.height);

        this.sombra.getContext().beginPath();

        this.sombra.getContext().fillStyle = 'rgb(255, 255, 255)';

        this.sombra.getContext().arc(
            this.input.activePointer.x + 64, 
            this.input.activePointer.y + 64,
            40, 0, Math.PI*2
        );
        
        this.sombra.getContext().fill();
        this.sombra.refresh()
    }


    update(time,delta): void {
        
        this.player.setVelocity(0);
        // this.healthBar.setVelocity(0);
        // this.healthRedBar.setVelocity(0);
        
        if (this.cursors.up.isDown)
        {
            // this.player.setVelocityX((Math.cos(this.player.rotation) * 100)) 
            // this.player.setVelocityY((Math.sin(this.player.rotation) * 100))
            this.player.setVelocityY(-60)

            this.healthBar.x = this.player.x - 20
            this.healthBar.y = this.player.y + 26

            this.healthRedBar.x = this.player.x - 20
            this.healthRedBar.y = this.player.y + 26
            
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(+60)
            // this.player.setVelocityX((Math.cos(this.player.rotation) * -100)) 
            // this.player.setVelocityY((Math.sin(this.player.rotation) * -100) )
            this.healthBar.x = this.player.x - 20
            this.healthBar.y = this.player.y + 26

            this.healthRedBar.x = this.player.x - 20
            this.healthRedBar.y = this.player.y + 26
            

        }
        

        if (this.cursors.left.isDown)
        {
            //this.player.setAngle(this.player.angle - 5)
            this.player.setVelocityX(-60)
            this.player.anims.play('left', true);
            
        }
        else if (this.cursors.right.isDown)
        {
            //this.player.setAngle(this.player.angle + 5)
            this.player.setVelocityX(+60)
            this.player.anims.play('right', true);
            
            
        }
        
        this.healthBar.x = this.player.x - 20
        this.healthBar.y = this.player.y + 26

        this.healthRedBar.x = this.player.x - 20
        this.healthRedBar.y = this.player.y + 26
        
        //this.player.update()

        // // Horizontal movement
        // if (this.cursors.left.isDown)
        // {
        //     this.player.setVelocityX(-100);
        // }
        // else if (this.cursors.right.isDown)
        // {
        //     this.player.setVelocityX(100);
        // }

        // // Vertical movement
        // if (this.cursors.up.isDown)
        // {
        //     this.player.setVelocityY(-100);
        // }
        // else if (this.cursors.down.isDown)
        // {
        //     this.player.setVelocityY(100);
        // }

        // // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.up.isDown)
        {
            // this.player.anims.play('top', true);
            
        }
        else if (this.cursors.down.isDown)
        {
            // this.player.anims.play('down', true);
            
        }
        else if(this.fire == false)
        {
            this.player.anims.stop();
        }

        // if (this.cursors.up.isUp)
        // {
            
        // }
        // else if (this.cursors.down.isUp)
        // {
        //     this.player.anims.stop();
        // }

        // else
        // {
        //     //this.player.anims.stop();
        // }

    }
}