export default class Coord{
    #centerX;
    #centerY;
    #widht;
    #hiegth;  
    #rotate; 
    constructor(centerX, centerY, widht, hiegth, rotate = 0){
        this.#centerX = centerX;
        this.#centerY = centerY;
        this.#widht = widht;
        this.#hiegth = hiegth;  
        this.#rotate = rotate;  
    }

    getRotate(){
        return this.#rotate
    }

    setRotate(rotate){
        this.#rotate = rotate
    }


    stepX(speed){
        this.#centerX -= speed
    }

    stepY(speed){
        this.#centerY += speed
    }


    correctionHiegth(hiegth){
        this.#hiegth *= hiegth
    }

    correctionWidth(widht){
        this.#widht *= widht;
    }




    getCoord(){
        const X = this.#centerX - this.#widht/2;
        const Y = this.#centerY-this.#hiegth/2;  
        return [X, Y, this.#widht, this.#hiegth]
    }


    getBox(){
        return [this.#centerX - this.#widht/2, 
        this.#centerY - this.#hiegth/2,
        this.#centerX + this.#widht/2, 
        this.#centerY + this.#hiegth/2
        ]
    }


    getCenter(){
        return [this.#centerX, this.#centerY, this.#widht, this.#hiegth]
    }


    static isBoxOverlay(box1, box2){
        const coordBox1 =   box1.getCoord()
        const coordBox2 =   box2.getCoord()

        if (coordBox1[1] > coordBox2[1]+coordBox2[3] || coordBox2[1] > coordBox1[1]+coordBox1[3]) {
        return false;
        }
      
        if (coordBox1[0] > coordBox2[0]+coordBox2[2] || coordBox2[0] > coordBox1[0]+coordBox1[2]) {
        return false;
        }

        return true
     }
}
