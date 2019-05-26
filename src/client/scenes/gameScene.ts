/**
 * @author Nelson Osvaldo Salinas Guajardo
 */

import { Knight } from "../classes/player";
import { BlendModes } from "phaser";

export class GameScene extends Phaser.Scene {

    private collision_layer = null
    private knight = null
    private shadowTexture:Phaser.GameObjects.Graphics;
    private LIGHT_RADIUS = null
    private sombra = null
    private pointer_moved = false
    
    constructor() {
        super({
            key: "GameScene"
        })
    }

    preload(): void {
        this.load.image("tiles", "../assets/dungeoncombat/map.png");
        this.load.image('bar', '../assets/dungeoncombat/preloader-bar.png');
        this.load.image('redbar', '../assets/dungeoncombat/preloader-bar2.png');
        this.load.image('border', '../assets/dungeoncombat/border.png');
        //this.load.image('border-short', '../assets/dungeoncombat/border-short.png');
        this.load.tilemapTiledJSON("dungeon_tilemap", "../assets/dungeoncombat/dungeon01.json");
        
        this.load.spritesheet('knight1', '../assets/dungeoncombat/pistolero.png',{
            frameWidth: 64,
            frameHeight: 64
        })
        
    }

    create(): void {
        //this.cameras.main.setBackgroundColor('#2d2d2d')
        //let bgBitMap = this.add.   bitmapData(this.game.width, this.game.height);
        // bgBitMap : String = null
        // this.game.textures.setTexture()
        // bgBitMap.ctx.rect(0, 0, this.game.config.width, this.game.config.height);
        // bgBitMap.ctx.fillStyle = '#b2ddc8';
        // bgBitMap.ctx.fill();

        // this.add.sprite(0, 0, bgBitMap);
        // var gl = this.sys.game.renderer.gl;

        // var renderer = this.sys.game.renderer;
        // renderer.setBlendMode([[ gl.ZERO, gl.SRC_COLOR ], gl.FUNC_ADD])
        
        // var modeIndex = renderer.addBlendMode([ gl.ZERO, gl.SRC_COLOR ], gl.FUNC_ADD);

        
        var map = this.make.tilemap({ key: 'dungeon_tilemap', tileWidth: 16, tileHeight: 16 });
        //var map = this.add.tilemap('dungeon_tilemap',16,16)
        
        //this.game.stage.backgroundColor = 0x4488cc;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        

        var tileset = map.addTilesetImage("dungeon_tilemap", "tiles");
        debugger
        map.createStaticLayer("background", tileset, 0, 0) 
        var collision_layer = map.createDynamicLayer("collision", tileset, 0, 0) 
        //this.collision_layer.setCollisionByProperty({ collides: true },true)
        collision_layer.setCollisionByProperty({ collides: true },true);
        collision_layer.setCollisionBetween(163, 190);

        this.knight = new Knight({
            scene: this,
            x: 64,
            y: 64,
            key: "knight1"
        });

        // var player = this.physics.add.sprite(64, 64, "knight1")

        
        // this.physics.scene.add.existing(this.knight.player);
        // this.physics.scene.add.existing(this.knight.border);
        // this.physics.add.existing(this.knight.player);
        // this.physics.add.existing(this.knight.border);
        
        this.physics.add.collider(this.knight.player,collision_layer,()=>{
            console.log("overlap")
        })
        

        ////let belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0)//.setBlendMode(Phaser.BlendModes.ADD);
        
        
        // belowLayer.setBlendMode(Phaser.BlendModes.SCREEN)
        //let shadowLayer = map.createStaticLayer("Shadow", tileset, 0, 0)
        //shadowLayer.setAlpha(1,1,1,1,1)
        //shadowLayer.setBlendMode(Phaser.BlendModes.MULTIPLY)
        ////this.worldLayer = map.createStaticLayer("World", tileset, 0, 0)//.setBlendMode(Phaser.BlendModes.ADD);
        
        // // this.worldLayer.setCollisionByProperty({ collides: true },true);
        // // this.worldLayer.setDepth(10);
        // map.setCollisionBetween(0, 39);
        //this.worldLayer.setBlendMode(Phaser.BlendModes.MULTIPLY)
        
        
        // // let aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0)//.setBlendMode(Phaser.BlendModes.ADD);
        //aboveLayer.setDepth(10);
        // this.worldLayer.setAlpha(0.7)
        // this.worldLayer.setBlendMode(Phaser.BlendModes.MULTIPLY)

        // // // Create the shadow texture
        // // this.sombra = this.textures.createCanvas('sombra',this.cameras.main.width,this.cameras.main.height)
        
        // // this.sombra.refresh()
        // // // Create an object that will use the bitmap as a texture
        // // var lightSprite = this.add.image(0, 0, 'sombra');

        // // // Set the blend mode to MULTIPLY. This will darken the colors of
        // // // everything below this sprite.
        // // lightSprite.setBlendMode(BlendModes.MULTIPLY)
        
        
        // // this.flashlight()


/** 

        this.shadowTexture = this.make.graphics({x: 0, y: 0, add: false});
        this.shadowTexture.fillStyle(0x646464,1);
        this.shadowTexture.fillRect(0, 0, this.cameras.main.width,this.cameras.main.height);
        this.shadowTexture.beginPath();
        this.shadowTexture.fillStyle(0xFFFFFF,1);
        this.shadowTexture.fillCircle((this.cameras.main.width / 2) + 100, this.cameras.main.height / 2, 35);
        
        this.shadowTexture.generateTexture('graphic3', this.cameras.main.width,this.cameras.main.height);
        
        // Create an object that will use the bitmap as a texture
        let light = this.add.image(64,64,'graphic3')

        // Set the blend mode to MULTIPLY. This will darken the colors of
        // everything below this sprite.
        light.setBlendMode(BlendModes.MULTIPLY)*****/

        // Simulate a pointer click/tap input at the center of the stage
        // when the example begins running.

        

        // this.input.activePointer.x = this.cameras.main.width/2 ;
        // this.input.activePointer.y = this.cameras.main.height/2 ;

        /*shadowTexture.fillStyle(0x646464,1);
        shadowTexture.fillRect(0, 0, this.cameras.main.width,this.cameras.main.height);
        
        
        shadowTexture.beginPath();
        shadowTexture.fillStyle(0xFFFFFF,1);
        shadowTexture.fillCircle((this.cameras.main.width / 2) + 100, this.cameras.main.height / 2, 35);
        
        shadowTexture.generateTexture('graphic3', this.cameras.main.width,this.cameras.main.height);
        
        this.shadowTexture = {
            xCircle: shadowTexture.x,
            yCircle: shadowTexture.y,
            image: null
        }*/

        


        //this.add.image(0,0,'graphic2').setBlendMode(BlendModes.MULTIPLY)

        //this.add.sprite(0,0,'graphic2');

        //let graphic2 =this.make.graphics({x: 0, y: 0, add: false});
        
        /* circulo */
        // // var graphics = this.add.graphics();

        // // var color = 0xFFFFFF;
        // // var alpha = 0.1;

        // // graphics.fillStyle(color, alpha);

        // // graphics.fillCircle(50, 50, 70)//.setBlendMode(BlendModes.MULTIPLY)

        //this.add.image(0,0,'graphic2').setBlendMode(BlendModes.MULTIPLY)
        

        //this.add.image(128, 64, 'tiles').setBlendMode(Phaser.BlendModes.MULTIPLY);
        
        // belowLayer.setBlendMode(Phaser.BlendModes.EXCLUSION)
        // this.worldLayer.setBlendMode(Phaser.BlendModes.EXCLUSION)
        // aboveLayer.setBlendMode(Phaser.BlendModes.EXCLUSION)


        

        // // map.setCollisionBetween(0, 99);
        // // this.physics.add.collider(this.knight.border, this.worldLayer);

        const debugGraphics = this.add.graphics()//.setAlpha(0.66);
        collision_layer.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        });

        // let self = this
        // this.physics.add.collider(this.knight.border, this.worldLayer, () => {
        //     self.knight.body.velocity.x = 0
        //     self.knight.body.velocity.y = 0
        //     self.knight.border.body.velocity.x = 0
        //     self.knight.border.body.velocity.y = 0
        //     self.knight.body.moves = false;
        //     self.knight.border.body.moves = false;
        // });

        
        // this.input.on('pointermove', function (pointer)
        // {
        //     this.flashlight()
            
        //     let angle = Phaser.Math.Angle.Between(this.knight.player.x, this.knight.player.y,pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)
            
        //     this.knight.player.rotation = angle
        
        // }, this);    
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.knight.player);
        
    }

    findObjectByTypes(targetType, tilemap, layer): any {

        let result = []
        
        if(!Array.isArray(tilemap.objects))
          return result
        
        let arrayObjects = tilemap.objects[0]
        if(arrayObjects.name === layer)
        {
            arrayObjects.objects.forEach(function(element){
                if(element.properties.type == targetType)
                    result.push(element);
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


    update(): void {
        
        this.knight.update();

    }
}