/**
 * @author Nelson Osvaldo Salinas Guajardo
 */

export class MainMenuScene extends Phaser.Scene {
  private ping = null;
  private startKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
  private circleGraphic: Phaser.GameObjects.Graphics;
  private circleGeom: Phaser.Geom.Circle;

  constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
    );
  }

  preload(): void {
    this.load.bitmapFont(
      "dungeon_fnt",
      "../assets/font/dungeon.png",
      "../assets/font/dungeon.fnt"
    );
    this.load.image('space', '../assets/dungeoncombat/space_man.png');
    
    this.load.audio('ping', 
      'assets/dungeoncombat/menu_select.mp3'
    );
    
    
  }

  create(): void {
    this.input.setDefaultCursor('url(../assets/dungeoncombat/SC2-target-none.cur), pointer');
    this.add.image(250, 200, 'space');

    // this.circleGraphic = this.add.graphics({
    //   x: 0,
    //   y: 0,
    //   fillStyle: { color: 0x61380B, alpha: 1 }
    // });

    // this.circleGeom = new Phaser.Geom.Circle(152, 105, 8);
    // this.circleGraphic.fillCircleShape(this.circleGeom);

    // this.bitmapTexts.push(
    //   this.add.bitmapText(
    //     this.sys.canvas.width / 2 - 28,
    //     this.sys.canvas.height / 2 - 10,
    //     "dungeon_fnt",
    //     "PLAY  P",
    //     8
    //   )
    // );
    


    this.ping = this.sound.add('ping', { loop: false });
    

    let asd1 = this.add.bitmapText(
      this.sys.canvas.width / 2 - 140,
      this.sys.canvas.height / 2 + 120,
      "dungeon_fnt",
      "::Click to start::",
      16
    )

    this.bitmapTexts.push(
      asd1
    );

    this.tweens.add({
      targets: asd1,
      alpha: 0,
      duration: 800,
      ease: 'Sine.easeInOut',
      loop: -1,
      yoyo: true
    });

    let self = this
    this.input.on('pointerdown', function (pointer){
      self.ping.play();
      self.scene.start("GameScene");
    })

  }

  update(): void {
    // if (this.startKey.isDown) {
    //   this.ping.play();
    //   this.scene.start("GameScene");
    // }
  }
}
