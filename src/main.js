import Phaser from 'phaser'
import TitleScreen from "./scenes/TitleScreen"
import Game from './scenes/Game'
const config = {
    width: 960,
    height: 520,
    type: Phaser.AUTO,
    // backgroundColor: "#616161",
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            fps: 120,
            debug: false
        }

    }
}
const game = new Phaser.Game(config)

game.scene.add("titlescreen", TitleScreen)
game.scene.add('game', Game)
// game.scene.start('titlescreen')
game.scene.start('game')