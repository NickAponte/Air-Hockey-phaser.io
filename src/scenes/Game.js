import Phaser from "phaser"
class Game extends Phaser.Scene
 {
    preload(){
        this.load.image('background', "assets/airhockey.png");
    }
    create(){
			this.background = this.add.image(450, 240, 'background');
			this.background.height = this.game.height
			this.background.width = this.game.width;
			
			const ball = this.add.circle(400, 250, 10, 0xffffff);
			this.physics.add.existing(ball);
			ball.body.setBounce(1, 1);
			ball.body.setCollideWorldBounds(true, 1, 1);
			ball.body.setVelocity(
				Phaser.Math.Between(-400, 400),
				Phaser.Math.Between(-400, 400)
			);

			this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);

			this.physics.add.existing(this.paddleLeft, true);
			// console.log(this.paddleLeft.setCollideWorldBounds(true))500
			// const body = paddleLeft.body
			// body.setMass(5000)
			// body.setBounce(1,1)

			// ai paddle

			this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1);
			this.physics.add.existing(this.paddleRight, true);
			this.physics.add.collider(this.paddleRight, ball);

			this.physics.add.collider(this.paddleLeft, ball);

			this.cursors = this.input.keyboard.createCursorKeys();
		}
    update(){
        const body = this.paddleLeft.body
        
        if (this.cursors.up.isDown){
            console.log("up button")
            this.paddleLeft.y -= 10
            body.updateFromGameObject()
        }
        else if(this.cursors.down.isDown){
            this.paddleLeft.y += 10
            body.updateFromGameObject()
         }
         
        }
}



export default Game