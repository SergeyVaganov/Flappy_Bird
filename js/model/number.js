import CommonElement from "./commonElement.js";
import { SOURCE_LETTERS, SOURCE_LETTERS_LOWER } from "./sourceElements.js";


class NumberGreator{
    constructor(stor){
        this.stor = stor
        this.objectList = this.stor.getModel('OBJECTS')
        this.zIndex = 11
    }

    createForMenu(menu, digital, digital2){
        digital = digital || 0
        const coordMenu = menu.result.getBox();
        const startCenterX = coordMenu[2] - 27;
        const startCenterY = coordMenu[3] - 30;
        let arrayOfDigits =  Array.from(String(digital)).reverse();
        for (let [i, character] of arrayOfDigits.entries()) {
            this.objectList.push( new Number (this.stor, SOURCE_LETTERS[character], startCenterX - 14*i, startCenterY, this.zIndex)) ;
        }
        arrayOfDigits =  Array.from(String(digital2)).reverse();
        for (let [i, character] of arrayOfDigits.entries()){
            this.objectList.push( new Number (this.stor, SOURCE_LETTERS[character], startCenterX - 14*i, startCenterY-43, this.zIndex)) ;
        }  
    }

}


class CounterScoreGreator{
    constructor(stor){
        this.stor = stor
        this.objectList = this.stor.getModel('OBJECTS')
        this.zIndex = 15
    }

    createNumber(){
        const digital = this.stor.getModel('SCORE').getScore()
        let arrayOfDigits =  Array.from(String(digital)).reverse();
        for (let [i, character] of arrayOfDigits.entries()){
            const number = new Number (this.stor, SOURCE_LETTERS_LOWER[character], this.stor.getCanvas('CENTER_X') - 14*i,  
                                                            this.stor.getCanvas('HIEGTH_PLAY')*0.25, this.zIndex);
            number.delete = true;
            this.objectList.push(number ) ;
        }
    }
}


class Number extends CommonElement{
    constructor(stor, sprite, centreX, centreY,  zIndex ){
        super(stor, sprite, centreX, centreY, zIndex);
        this.conflicting = false
    }

    isConflicting(){
        return this.conflicting
    }

    step(){
    }
} 


export{NumberGreator, CounterScoreGreator}