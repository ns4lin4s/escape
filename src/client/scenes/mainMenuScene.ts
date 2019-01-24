/**
 * @author Nelson Osvaldo Salinas Guajardo
 */

export class MainMenuScene extends Phaser.Scene {
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
  }

  create(): void {
    this.circleGraphic = this.add.graphics({
      x: 0,
      y: 0,
      fillStyle: { color: 0x61380B, alpha: 1 }
    });

    this.circleGeom = new Phaser.Geom.Circle(152, 105, 8);
    this.circleGraphic.fillCircleShape(this.circleGeom);

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 28,
        this.sys.canvas.height / 2 - 10,
        "dungeon_fnt",
        "PLAY  P",
        8
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 60,
        this.sys.canvas.height / 2 - 60,
        "dungeon_fnt",
        "::battle::",
        16
      )
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start("GameScene");
    }
  }
}
