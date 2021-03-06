import Phaser from "phaser"
class Game extends Phaser.Scene
	
 {
	 
	 rightPoints = 0;
		leftPoints = 0;
    preload(){
		
		this.load.image('background', "assets/airhockey-mod.png");
		this.load.image('puck', 'assets/black_3.png');
		this.load.image('blue', 'assets/blue.png');
		this.load.image('red', 'assets/red.png');
		this.load.image("help", "assets/help.png")
		this.load.audio("wall", ["assets/wall_sound.mp3"])
		this.load.audio("puckhit", ["assets/puckhit.mp3"])
		this.load.audio("goal", ["assets/goal.mp3"])
		this.load.audio("gamemusic", ["assets/music.mp3"])
		this.load.audio("cheer", ["assets/win.mp3"])
		this.title = this.add.text(430, 0, 'AIR HOCKEY', {
			fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
		});
		this.title.depth = 3

		
		
    }
    create(){
			this.rightPoints = 0;
			this.leftPoints = 0;
			this.physics.world.setBoundsCollision(true, true, true, true);
			this.physics.world.setFPS(45);
			this.leftScore = this.add.text(50, 0, `Blue Score: ${this.leftPoints}`, {
				fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
			});
			this.leftScore.depth = 3;

			this.rightScore = this.add.text(
				830,
				0,
				`Red Score: ${this.rightPoints}`,
				{
					fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
				}
			);
			this.rightScore.depth = 3;

			this.cursorKeys = this.input.keyboard.createCursorKeys();

			this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
			this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
			this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
			this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
			this.keyUp = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.UP
			);
			this.keyDown = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.DOWN
			);
			this.keyLeft = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.LEFT
			);
			this.keyRight = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.RIGHT
			);
			this.background = this.add.image(480, 260, 'background');
			this.background.height = this.game.height;
			this.background.width = this.game.width;

			

			this.rightGoal = this.add.rectangle(970, 260, 55, 110, 0x000000, 1);
			this.physics.add.existing(this.rightGoal);
			this.physics.add.collider(this.rightGoal);
			this.rightGoal.body.setImmovable(true);

			this.leftGoal = this.add.rectangle(-7, 260, 55, 110, 0x000000, 1);
			this.physics.add.existing(this.leftGoal);
			this.physics.add.collider(this.leftGoal);
			this.leftGoal.body.setImmovable(true);

			this.ballbounce = 1;
			this.ball = this.physics.add.sprite(480, 260, 'puck');
		
			this.ball.setCircle(20.5, 2);

			

			this.ball.setBounce(this.ballbounce);

			this.ball.setVelocity(-0, 500);
			this.ball.body.useDamping = true;
			this.ball.setDrag(0.85);

			

			this.ball.setMaxVelocity(500);
			this.physics.add.collider(this.ball);

			
			this.physics.add.existing(this.ball);
			

			this.paddleLeft = this.physics.add.sprite(60, 260, 'blue');
			this.paddleLeft.setCircle(35, 5, 5);
		
			this.physics.add.existing(this.paddleLeft);
			this.paddleLeft.body.setCollideWorldBounds(true, 1, 1);
			this.paddleLeft.body.setImmovable(true);


			this.paddleRight = this.physics.add.sprite(900, 260, 'red');
			this.paddleRight.setCircle(35, 5, 5);
			
			this.paddleRight.body.setCollideWorldBounds(true, 1, 1);
			this.paddleRight.body.setImmovable(true);

			

			this.physics.add.collider(this.paddleRight, this.ball);

			this.physics.add.collider(this.paddleLeft, this.ball);

			this.physics.add.collider(this.ball, this.paddleLeft);
			this.physics.add.collider(this.ball, this.paddleRight);

		
			this.puckhit = this.sound.add('puckhit', { loop: false });
			this.goal = this.sound.add('goal', { loop: false });
			this.wall = this.sound.add('wall', { loop: false });
			this.cheer = this.sound.add("cheer" , {loop: true})
			this.music = this.sound.add('gamemusic', { loop: true });
			this.music.play();
			this.help = this.add.sprite(480, 200, 'help');
			this.help.setScale(0.8);
			this.help.depth = 4;
			this.help.visible = false;
			this.helpModal = this.add.text(375, 0, 'Help', {
				color: 'white',
				
			});
			this.helpModal.setInteractive();
			this.helpModal.on('pointerover', (pointer) => {
				this.help.visible = true;
			});
			this.helpModal.on('pointerout', (pointer) => {
				this.help.visible = false;
			});
		}
    update(){
		
		
	
		
		
		
		const lbody = this.paddleLeft.body
		const rbody = this.paddleRight.body
		
		if (this.ball.body.checkWorldBounds()) {
			this.ball.setBounce(this.ballbounce - 0.1);
			
			this.wall.play()

		}



		if (this.physics.collide(this.paddleLeft, this.ball)) {
			this.puckhit.play()
			this.ball.setBounce(this.ballbounce + 0.5)
			
			
			this.ball.setVelocity(500);
			
		}
		 if(this.physics.collide(this.paddleRight, this.ball)){
			this.puckhit.play();
			 this.ball.setBounce(this.ballbounce + 0.5);

				this.ball.setVelocity(-500);
		 }
		if(this.physics.collide(this.ball,this.leftGoal)){
			this.goal.play()
			this.rightPoints += 1;
			this.rightScore.setText("Red Score: " + this.rightPoints)
			this.ball.setPosition(475,265)
			this.ball.setVelocity(0);
			this.paddleLeft.setPosition(60, 260);
			this.paddleRight.setPosition(900, 260);
			if (this.rightPoints == 5) {
				this.cheer.play()
				
				this.win = this.add.text(450, 500, `RED WINS!!!!!`, {
					fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
				});
				this.win.depth = 3;

				this.gameRestart = this.add.text(375, 200, 'Click to Restart Game?', {
					color: "black",
					backgroundColor: "white"
				});
				this.gameRestart.setInteractive()
				this.gameRestart.on('pointerdown', (pointer) => {
					
					this.cheer.stop()
					this.registry.destroy(); // destroy registry
					this.events.off(); // disable all active events
					this.music.stop();
					this.scene.restart(); // restart current scene
					
					
				});

			}
			
		}else if(this.physics.collide(this.ball,this.rightGoal)){
			this.goal.play();
		
			this.leftPoints += 1;
			
			this.leftScore.setText("Blue Score: " + this.leftPoints);
			this.ball.setPosition(475, 265);
			this.ball.setVelocity(0)
			this.paddleLeft.setPosition(60, 260);
			this.paddleRight.setPosition(900, 260);
			if (this.leftPoints == 5) {
				this.cheer.play();
				
				this.win = this.add.text(450, 500, `BlUE WINS!!!!`, {
				fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
			});
			
			this.win.depth = 3;
			this.gameRestart = this.add.text(375, 200, 'Click to Restart Game', {
				color: 'black',
				backgroundColor: 'white',
			});
			this.gameRestart.setInteractive();
			this.gameRestart.on('pointerdown', (pointer) => {
				
				this.cheer.stop()
				this.music.stop();
				this.registry.destroy(); // destroy registry
				this.events.off(); // disable all active events
				this.scene.restart(); // restart current scene
				
			});
			}
			
			
		}
        if (this.keyA.isDown) {
					
					this.paddleLeft.x -= 5;
					lbody.updateFromGameObject();
					
				} else if (this.keyS.isDown) {
					
					this.paddleLeft.y += 5;
					lbody.updateFromGameObject();
				} else if (this.keyD.isDown) {
					
					this.paddleLeft.x += 5;
					lbody.updateFromGameObject();
				} else if (this.keyW.isDown) {
					
					this.paddleLeft.y -= 5;
					lbody.updateFromGameObject();
				}
        if (this.keyUp.isDown){
          
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