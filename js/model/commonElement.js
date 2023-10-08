import Coord from "./coord.js";


export default class CommonElement{
    constructor(stor, sprite, centreX, centreY, zIndex){
        this.stor = stor;
        this.zIndex = zIndex;
        this.img = new Image();
        this.img.src = sprite[0]; 
        this.name = sprite[3]
        this.scaleX = this.stor.getCanvas('SCALE') * sprite[2][0];
        this.scaleY = this.stor.getCanvas('SCALE') * sprite[2][1];
        this.source = new Coord(    sprite[1][0] + sprite[1][2]/2, 
                                    sprite[1][1]+ sprite[1][3]/2, 
                                    sprite[1][2], 
                                    sprite[1][3])
        this.result = new Coord(    centreX, 
                                    centreY,
                                    sprite[1][2]*this.scaleX,
                                    sprite[1][3]*this.scaleY)   
        this.delete = false
    }

    setCorrectionScaleY(hiegth, corr){
        if (corr) {
            this.result.correctionHiegth(hiegth)
        }
        else {
            const correccion = hiegth / this.result.getCoord()[3]
            this.result.correctionHiegth(correccion)
            return correccion
        }
    }

    setCorrectionScaleX(width, corr){
        if (corr) {
            this.result.correctionWidth(width)
        }
        else{
            const correccion = width / this.result.getCoord()[2]
            this.result.correctionWidth(correccion)
            return correccion 
        }
    }

    step(){
        alert('step')
    }

    draw(){
        this.stor.getCanvas('CONTEXT').drawImage(
            this.img,
            ...this.source.getCoord(),
            ...this.result.getCoord())
    }

    getzIndex(){
        return this.zIndex
    }

    del(){
        if (this.result.getBox()[2]<=0) {
            this.delete = true
        }
    }
}


