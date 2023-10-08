import Global from "./model/settings.js"; 
import Model from './model/model.js';


class Game{

    constructor(){
        this.model = new Model(new Global())
    }
}

//let g = new Global()
//g.getFPS()
const game = new Game;
