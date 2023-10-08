import CommonElement from "./commonElement.js";
import { SOURCE } from "./sourceElements.js";


export default class Bird {
    constructor(stor){
        this.stor = stor;
        this.zIndex = 15;
        this.getNewBird()
    }

    getNewBird(){
        const birdX = this.stor.getCanvas('BIRD_X')
        const centerY = this.stor.getCanvas('HIEGTH_PLAY')/2
        this.birdFrame1 = new BirdFrame(this.stor, SOURCE[4], birdX, centerY, this.zIndex);
        this.birdFrame2 = new BirdFrame(this.stor, SOURCE[5], birdX, centerY, this.zIndex);
        this.birdFrame3 = new BirdFrame(this.stor, SOURCE[6], birdX, centerY, this.zIndex);
        this.iter = 0
    }

    getResult(){
        return this.birdFrame1.result
    }

    step(stop){
        this.iter +=1;
        if (!stop){
            this.birdFrame1.step();
            this.birdFrame2.step();
            this.birdFrame3.step();}
    }

    up(){
        this.birdFrame1.up();
        this.birdFrame2.up();
        this.birdFrame3.up();
    }

    draw(){
        const indexFrame =Math.floor((this.iter % 9) / 3)
        const frames = [ this.birdFrame1,  this.birdFrame2,  this.birdFrame3]
        frames[indexFrame].draw()
    }
}


class BirdFrame extends CommonElement{
    constructor(stor, sprite, centreX, centreY, zIndex){
        super(stor, sprite, centreX, centreY, zIndex);
        this.fallSpeed =0;  
        const corr = this.setCorrectionScaleY(this.stor.getCanvas('HIEGTH_PLAY') * this.stor.getPlay('Y_PASS') * this.stor.getPlay('BIRD_HIEGTH'), false)       
        this.setCorrectionScaleX(corr, true)
        this.stor.setPlay('WIDTH_BIRD', this.result.getCoord()[2])

    }

    step(){
        this.fallIndex++;
        this.result.stepY(this.fallSpeed + this.stor.getPlay('FALL')**2/2)      
        this.fallSpeed += this.stor.getPlay('FALL')**2/2 
        if (this.result.getBox()[1] < 0){
            this.result.stepY(-this.result.getBox()[1])
            this.fallSpeed = 0
        }    
         this.result.setRotate(this.fallSpeed*8)
    }    
    
    up(){
        this.fallSpeed = -5  
    }

    draw(){
        const context = this.stor.getCanvas('CONTEXT')
        const coordCenter = this.result.getCoord();
        const rotat = this.result.getRotate()
        context.save()
        context.translate(coordCenter[0], coordCenter[1]);  
        context.rotate(rotat * Math.PI / 180); 
        context.drawImage(
            this.img,
            ...this.source.getCoord(),
            0,0, this.result.getCoord()[2], this.result.getCoord()[3]) 
        context.restore()
    }

} 