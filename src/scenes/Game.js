import Phaser from "phaser"
class Game extends Phaser.Scene

 {
    preload(){
		
		this.load.image('background', "assets/airhockey.png");
		this.load.image('puck', 'assets/black_3.png');
		
    }
    create(){
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
			this.background = this.add.image(450, 240, 'background');
			this.background.height = this.game.height
			this.background.width = this.game.width;
			


			this.ball =  this.physics.add.sprite(100, 200, 'puck');
			console.log(this.physics.add.sprite);
			// this.test = ball

			this.ball.setCircle(20.5);
			

			this.ball.setCollideWorldBounds(true);
			

			this.ball.setBounce(0.8);
			
			this.ball.setVelocity(50);
			// ball.body.useDamping=true
			// ball.setDrag(0.90)
			
			
			
			this.physics.add.collider(this.ball);
			
			// const ball = this.add.circle(400, 250, 0xffffff);
			// this.physics.add.existing(ball);
			// ball.body.setBounce(0,1);
			// ball.body.setCollideWorldBounds(true, 1, 1);
			// ball.body.setVelocity(
			// 	Phaser.Math.Between(-200, 200)
			// );
				
			this.paddleLeft = this.add.circle(50, 255, 30,0xFF0000, 1);

			this.physics.add.existing(this.paddleLeft);
			this.paddleLeft.body.setCollideWorldBounds(true, 1, 1);
			this.paddleLeft.body.setImmovable(true);
			
			// console.log(this.paddleLeft.setCollideWorldBounds(true))500
			// const body = paddleLeft.body
			// body.setMass(5000)
			// body.setBounce(1,1)

			// ai paddle

			this.paddleRight = this.add.circle(830, 255, 30, 0x000000, 1);
			this.physics.add.existing(this.paddleRight);
			console.log(this.paddleRight.body)
			this.paddleRight.body.setCollideWorldBounds(true,1,1)
			this.paddleRight.body.setImmovable(true)

			// this.paddleRight.body.setCollideWorldBounds(true,1,1)
			
			this.physics.add.collider(this.paddleRight, this.ball);

			this.physics.add.collider(this.paddleLeft, this.ball);

			// this.cursors = this.input.keyboard.createCursorKeys();
		}
    update(){
		// this.test.setVelocity(100)
		const lbody = this.paddleLeft.body
		const rbody = this.paddleRight.body
		if (
			this.physics.collide(this.paddleLeft, this.ball) ||
			this.physics.collide(this.paddleRight, this.ball)
		) {
			console.log('hit');
			this.ball.setVelocity(350);
		}
			
        if (this.keyA.isDown) {
					// console.log('A key pressed');
					// console.log('D key pressed');
					this.paddleLeft.x -= 5;
					lbody.updateFromGameObject();
					
				} else if (this.keyS.isDown) {
					// console.log('S key pwressed');
					this.paddleLeft.y += 5;
					lbody.updateFromGameObject();
				} else if (this.keyD.isDown) {
					// console.log('D key pressed');
					this.paddleLeft.x += 5;
					lbody.updateFromGameObject();
				} else if (this.keyW.isDown) {
					// console.log('W key pressed');
					this.paddleLeft.y -= 5;
					lbody.updateFromGameObject();
				}
        if (this.keyUp.isDown){
            // console.log("up button")
            this.paddleRight.y -= 5
            rbody.updateFromGameObject()
        }
        else if(this.keyDown.isDown){
            this.paddleRight.y += 5
            rbody.updateFromGameObject()
		 }
		 else if(this.keyLeft.isDown){
			 this.paddleRight.x -= 5
			 rbody.updateFromGameObject()
		 }
		 else if(this.keyRight.isDown){
			 this.paddleRight.x += 5
			 rbody.updateFromGameObject()
		 }
         
		}
		
}



export default Game