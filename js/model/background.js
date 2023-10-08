import CommonElement from "./commonElement.js";
import { SOURCE } from "./sourceElements.js";


export default class BackgroundGreator{
    constructor(stor) {
        this.stor = stor
        this.objectList = this.stor.getModel('OBJECTS')
    }

    create(){
        this.createLayer("BACKGROUND_LAYER1", SOURCE[0], 1, 1, false)
        this.createLayer("BACKGROUND_LAYER2", SOURCE[1], 1.1, 2, false)
        this.createLayer("BACKGROUND_LAYER3", SOURCE[2], 1.5, 3, false)
        this.createLayer("BACKGROUND_LAYER4", SOURCE[3], 3, 10, true, this.stor.getCanvas('HIEGTH_PLAY'))
    }

    createLayer(name, source, speed, zIndex, conflicting, coordY = 0){
        while(true){
            const layerBackground  =  this.objectList.filter(obj=>obj.name==name)           
            const coordX = layerBackground.map(el => el.result.getBox()[2]) 
            const maxX = coordX.reduce((acc, current) => (acc>current)?acc:current,0);
            if (maxX < this.stor.getCanvas('WIDTH')*1.5){
                const bground = new Background (this.stor, source, maxX, coordY, speed, zIndex, conflicting)
                this.objectList.push(bground) 
            }
            else {
                break;
            }
        }
    }    
}


class Background extends CommonElement{
    constructor(stor, sprite, X, Y,  speed, zIndex, conflicting) {
        const centreX = X + stor.getCanvas('SCALE')*sprite[2][0]*sprite[1][2]/2
        const centreY = Y +  stor.getCanvas('SCALE')*sprite[2][1]* sprite[1][3]/2
        super(stor, sprite, centreX, centreY, zIndex);
        this.speed = speed
        this.conflicting = conflicting
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


