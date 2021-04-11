import Phaser from "phaser"
class Game extends Phaser.Scene

 {
    preload(){
		
		this.load.image('background', "assets/airhockey-mod.png");
		this.load.image('puck', 'assets/black_3.png');
		this.load.image('blue', 'assets/blue.png');
		this.load.image('red', 'assets/red.png');
		this.title = this.add.text(430, 0, 'AIR HOCKEY', {
			fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
		});
		this.title.depth = 3

		
		
    }
    create(){
		this.leftScore = this.add.text(50, 0, 'Score: ', {
			fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
		});
		this.leftScore.depth = 3;

		this.rightScore = this.add.text(863, 0, 'Score: ', {
			fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
		});
		this.rightScore.depth = 3;









		this.cursorKeys = this.input.keyboard.createCursorKeys();
		
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
			this.background = this.add.image(480, 260, 'background');
			this.background.height = this.game.height
			this.background.width = this.game.width;
			
			var rightScore = 0;
			var leftScore = 0;
			var scoreText;




			this.rightGoal = this.add.rectangle(960, 260, 55,110, 0x000000,1);
			this.physics.add.existing(this.rightGoal)
			this.physics.add.collider(this.rightGoal)
			this.rightGoal.body.setImmovable(true);

			this.leftGoal = this.add.rectangle(0, 260, 55, 110, 0x000000, 1);
			this.physics.add.existing(this.leftGoal);
			this.physics.add.collider(this.leftGoal);
			this.leftGoal.body.setImmovable(true);





			this.ball =  this.physics.add.sprite(480, 260, 'puck');
			// console.log(this.physics.add.sprite);
			// this.test = ball

			this.ball.setCircle(20.5,2);
			

			this.ball.setCollideWorldBounds(true);
			

			this.ball.setBounce(.8);
			
			this.ball.setVelocity(0,500);
			// this.ball.body.useDamping=true
			// this.ball.setDrag(0.90)
			
			
			
			this.physics.add.collider(this.ball);
			
			// const ball = this.add.circle(400, 250, 0xffffff);
			this.physics.add.existing(this.ball);
			// ball.body.setBounce(0,1);
			// ball.body.setCollideWorldBounds(true, 1, 1);
			// ball.body.setVelocity(
			// 	Phaser.Math.Between(-200, 200)
			// );
				
			this.paddleLeft = this.physics.add.sprite(60, 260, "blue");
			// this.paddleLeft.setCircle(35,5,5)
			// this.physics.add.existing(this.paddleLeft.body)
			this.physics.add.existing(this.paddleLeft);
			this.paddleLeft.body.setCollideWorldBounds(true, 1, 1);
			this.paddleLeft.body.setImmovable(true);
			
			// console.log(this.paddleLeft.setCollideWorldBounds(true))500
			// const body = paddleLeft.body
			// body.setMass(5000)
			// body.setBounce(1,1)

			// ai paddle

			this.paddleRight = this.physics.add.sprite(900, 260, "red");
			// this.paddleRight.setCircle(35,5,5)
			// console.log(this.paddleRight.body)
			this.paddleRight.body.setCollideWorldBounds(true,1,1)
			this.paddleRight.body.setImmovable(true)

			// this.paddleRight.body.setCollideWorldBounds(true,1,1)
			
			this.physics.add.collider(this.paddleRight, this.ball);

			this.physics.add.collider(this.paddleLeft, this.ball);

			this.physics.add.collider(this.ball,this.paddleLeft)
			this.physics.add.collider(this.ball, this.paddleRight);

			this.physics.add.collider(this.ball,this.leftGoal)
			this.physics.add.collider(this.ball, this.RightGoal);

			// this.cursors = this.input.keyboard.createCursorKeys();
		}
    update(){
	
		// this.test.setVelocity(100)
		const lbody = this.paddleLeft.body
		const rbody = this.paddleRight.body
		if (
			this.physics.collide(this.paddleLeft, this.ball) ||
			this.physics.collide(this.paddleRight, this.ball) ||
			this.physics.collide(this.ball, this.paddleRight) ||
			this.physics.collide(this.ball, this.paddleLeft)
		) {
			console.log('hit');
			this.ball.setVelocity(350,350);
		}
		if(this.physics.collide(this.ball,this.leftGoal)){
			console.log("Right scored a point")
			
		}else if(this.physics.collide(this.ball,this.rightGoal)){
			console.log("Left scored a point")
			
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