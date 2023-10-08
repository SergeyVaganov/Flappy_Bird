import BackgroundGreator from "./background.js";
import TubeCreator from "./tube.js";
import {StartMenuGreator, StartPlayGreator, StopMenuGreator} from "./menu.js";
import { CounterScoreGreator } from "./number.js";


export default class Creator{

    constructor(stor){
        this.stor = stor
        this.background = new BackgroundGreator(this.stor)
        this.tube = new TubeCreator(this.stor)
        this.startMenu = new StartMenuGreator(this.stor)
        this.startPlay = new StartPlayGreator(this.stor)
        this.count = new CounterScoreGreator(this.stor)
        this.stopMenu = new StopMenuGreator(this.stor)
    }

    create(){
        this.background.create()
        this.tube.create()
        this.count.createNumber()
    }

    creareMenu(){
        this.background.create()
        this.startMenu.create()
    }

    creareStartPlay(){
        this.startPlay.create()
    }

    createStopMenu(){
        this.stopMenu.create()
    }

}