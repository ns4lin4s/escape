/**
 * @author Nelson Osvaldo Salinas Guajardo
 */

import { Knight } from "../classes/player";
import { Skeleton } from "../classes/skeleton";
import { Item } from "../classes/item";


export class GameScene extends Phaser.Scene {

    private knight = null
    private skeleton = null
    private worldLayer = null
    
    constructor() {
        super({
            key: "GameScene"
        })
    }

    preload(): void {
        this.load.image("tiles", "../assets/dungeoncombat/map.png");
        this.load.image('coin', '../assets/dungeoncombat/coin.png');
        this.load.image('bar', '../assets/dungeoncombat/preloader-bar.png');
        this.load.image('redbar', '../assets/dungeoncombat/preloader-bar2.png');
        this.load.image('border', '../assets/dungeoncombat/border.png');
        this.load.tilemapTiledJSON("map", "../assets/dungeoncombat/scene.json");
        //this.load.multiatlas('knight1', './assets/games/murox/texturePacker/knight2.json','./assets/games/murox/texturePacker');
        this.load.spritesheet('knight1', '../assets/dungeoncombat/texturePacker/dude-1.png',{
            frameWidth: 41.5,
            frameHeight: 48
        })

        this.load.spritesheet('skeleton', './assets/dungeoncombat/zombie_n_skeleton2.png',{
            frameWidth: 36,
            frameHeight: 72
        })
        
    }

    create(): void {
        
        //this.cursors = this.input.keyboard.createCursorKeys();
        
        var map = this.add.tilemap('map')
        
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("map", "tiles");

        let belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);

        let shadowLayer = map.createStaticLayer("Shadow", tileset, 0, 0);

        this.worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        
        this.worldLayer.setCollisionByProperty({ collides: true },true),true;
        // const debugGraphics = this.add.graphics().setAlpha(0.66);
        // this.worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(48, 26, 9, 255)
        // });
        let aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);
        aboveLayer.setDepth(10);
        
        this.knight = new Knight({
            scene: this,
            x: 132,
            y: 102,
            key: "knight1"
        });

        //this.knight.setDepth(11)

        this.skeleton = new Skeleton({
            scene: this,
            x: 252,
            y: 102,
            key: "skeleton"
        });

        let self = this
        this.physics.add.collider(this.knight.border, this.worldLayer, () => {
            self.knight.body.velocity.x = 0
            self.knight.body.velocity.y = 0
            self.knight.border.body.velocity.x = 0
            self.knight.border.body.velocity.y = 0
            self.knight.body.moves = false;
            self.knight.border.body.moves = false;
        });

        this.physics.add.collider(this.knight.border, this.skeleton.border, () => {
            self.knight.body.velocity.x = 0
            self.knight.body.velocity.y = 0
            self.knight.border.body.velocity.x = 0
            self.knight.border.body.velocity.y = 0
            self.knight.body.moves = false;
            self.knight.border.body.moves = false;
            self.skeleton.border.body.velocity.x = 0
            self.skeleton.border.body.velocity.y = 0
        });
    
        this.findObjectByTypes('item',map,'objectsLayer').forEach(function(element){
            let elementObj = new Item({
                scene: this,
                x: element.x,
                y: element.y,
                key: element.properties.asset
            });
        }, this);

        this.cameras.main.startFollow(this.knight);

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

    update(): void {

        this.knight.update();
    }
}