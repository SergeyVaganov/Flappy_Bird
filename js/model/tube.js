import CommonElement from "./commonElement.js";
import { SOURCE } from "./sourceElements.js";


export default class TubeCreator{
    constructor(stor){
        this.stor = stor
        this.objectList = this.stor.getModel('OBJECTS')
        this.hieght_play = this.stor.getCanvas('HIEGTH_PLAY')  
        this.speed = this.stor.getPlay('SPEED')
        this.zIndex = 6
    }

    #getRandomInt() {
        const min = Math.ceil(this.hieght_play * this.stor.getPlay('Y_PROTECT') + (this.hieght_play * this.stor.getPlay('Y_PASS'))/2 );
        const max = Math.floor(this.hieght_play*(1-this.stor.getPlay('Y_PROTECT')) - (this.hieght_play * this.stor.getPlay('Y_PASS'))/2);
        return Math.floor(Math.random() * (max - min + 1) + min); 
        }

    create(){
        while(true){
            const layerTube  =  this.objectList.filter(obj=>obj.name == "TUBE_TOP")
            const coordX = layerTube.map(el => el.result.getCenter()[0]) 
            const maxX = coordX.reduce((acc, current) => (acc > current) ? acc : current, this.stor.getPlay('TUBE_START')); //' +500);
            const nextCenterX = maxX + (this.stor.getPlay('FPS') * this.speed)
            if (nextCenterX < this.stor.getCanvas('WIDTH')*2){
                const wayCenterY = this.#getRandomInt() 
                this.objectList.push( new TubeTop (this.stor, SOURCE[12], nextCenterX, wayCenterY, this.zIndex)) 
                this.objectList.push( new TubeBottom (this.stor, SOURCE[13], nextCenterX, wayCenterY, this.zIndex)) 
            }
            else {
               break;
            }
        }
    }
}



class TubeTop extends CommonElement{
    constructor(stor, sprite, centerX, wayY, zIndex){
        const heightTube = sprite[1][3]/2
        const way = stor.getCanvas('HIEGTH_PLAY')*0.25;
        const centerY =  wayY - way/2 - sprite[1][3]*stor.getCanvas('SCALE')/2
        super(stor, sprite, centerX, centerY, zIndex);
        this.speed = this.stor.getPlay('SPEED')
        this.conflicting = true
        this.pass = false
        const corr = this.setCorrectionScaleX(this.stor.getPlay('WIDTH_BIRD') * 2, false)       

    }

    isConflicting(){
        return this.conflicting
    }
    
    conflict(){
        const wav = new Audio('../wav/strike1.mp3')
        wav.volume = this.stor.getAudio('VOLUME');
        wav.play();
        this.stor.getModel('MODEL').stopPlay()
    }

    step(){
        this.result.stepX(this.speed)      
        if (!this.pass && this.result.getCenter()[0] < this.stor.getCanvas('BIRD_X')){
            this.pass = true
            this.stor.getModel('SCORE').stepScore()
            const wav = new Audio('../wav/point.mp3')
            wav.volume = this.stor.getAudio('VOLUME');
            wav.play()
        } 
    }
} 


class TubeBottom extends CommonElement{
    constructor(stor, sprite, centerX, wayY,  zIndex){
        const heightTube = sprite[1][3]/2
        const way = stor.getCanvas('HIEGTH_PLAY')*0.25;
        const centerY =  wayY + way/2 + sprite[1][3]*stor.getCanvas('SCALE')/2
        super(stor, sprite, centerX, centerY, zIndex);
        this.speed = this.stor.getPlay('SPEED')
        this.conflicting = true
        const corr = this.setCorrectionScaleX(this.stor.getPlay('WIDTH_BIRD') * 2, false)    
    }

    conflict(){
        const wav = new Audio('../wav/strike1.mp3')
        wav.volume = this.stor.getAudio('VOLUME');
        wav.play();
        this.stor.getModel('MODEL').stopPlay()
    }


    isConflicting(){
        return this.conflicting 
    }

    step(){
        this.result.stepX(this.speed)
    }
} 

