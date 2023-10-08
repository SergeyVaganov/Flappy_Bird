import CommonElement from "./commonElement.js";
import { SOURCE } from "./sourceElements.js";
import { NumberGreator } from './number.js';


class StartMenuGreator{
    constructor(stor){
        this.stor = stor
        this.objectList = this.stor.getModel('OBJECTS')
        this.numberGreator = new NumberGreator(this.stor) 
        this.centerX = this.stor.getCanvas('CENTER_X')
        this.hieght_play = this.stor.getCanvas('HIEGTH_PLAY')
        this.scale = this.stor.getCanvas('SCALE')
        this.zIndex = 10
    }

    create(){
        const objMenu  =  this.objectList.filter(obj=>obj.name=="START_MENU")
        if (objMenu.length == 0){
            this.objectList.push(new Menu (this.stor, SOURCE[7], this.centerX - 25 * this.scale, this.hieght_play/5, true , this.zIndex))
            this.objectList.push(new Menu (this.stor, SOURCE[4], this.centerX + 100 * this.scale, this.hieght_play/5, true , this.zIndex))

            const menu = new Menu (this.stor, SOURCE[14], this.centerX, this.hieght_play/2, false , this.zIndex)
            this.numberGreator.createForMenu(menu, this.stor.getModel('SCORE').getMax(), "0")
            this.objectList.push(menu) 

            const buttonStart = new Button (this.stor, SOURCE[10], this.centerX, this.hieght_play*0.75, false , this.zIndex)
            buttonStart.setFunctionCallback(this.stor.getModel('MODEL').startPlay, this.stor.getModel('MODEL'))
            this.stor.getModel('CONTROLLER').setFanctionClick(buttonStart.click, buttonStart)
            this.stor.getModel('CONTROLLER').setFanctionKey(buttonStart.keyPress, buttonStart)
            this.stor.getModel('CONTROLLER').setFanctionTouch(buttonStart.touch, buttonStart)
            this.objectList.push(buttonStart)
        }
    }
}


class StartPlayGreator{
    constructor(stor){
        this.stor = stor
        this.objectList = this.stor.getModel('OBJECTS')
        this.zIndex = 10
    }

    create(){
        const objMenu  =  this.objectList.filter(obj=>obj.name=="START_PLAY")
        if (objMenu.length == 0){
            const menu = new Menu (this.stor, SOURCE[11], this.stor.getCanvas('BIRD_X'), this.stor.getCanvas('HIEGTH_PLAY') * 0.6, false , this.zIndex)
            menu.delete = true
            this.stor.getModel('CONTROLLER').setFanctionClick(this.stor.getModel('MODEL').play, this.stor.getModel('MODEL'))   
            this.stor.getModel('CONTROLLER').setFanctionKey(this.stor.getModel('MODEL').play, this.stor.getModel('MODEL'))   
            this.stor.getModel('CONTROLLER').setFanctionTouch(this.stor.getModel('MODEL').play, this.stor.getModel('MODEL'))    
            this.objectList.push(menu)

        }
    }
}


class StopMenuGreator{
    constructor(stor){
        this.stor = stor
        this.objectList = this.stor.getModel('OBJECTS')
        this.numberGreator = new NumberGreator(this.stor)
        this.centerX = this.stor.getCanvas('CENTER_X')
        this.hieght_play = this.stor.getCanvas('HIEGTH_PLAY')
        this.scale = this.stor.getCanvas('SCALE')   
        this.zIndex = 10
    }

    create(){
        const objMenu  =  this.objectList.filter(obj=>obj.name=="START_MENU")
        if (objMenu.length == 0){
            this.objectList.push(new Menu (this.stor, SOURCE[15], this.centerX, this.hieght_play/5, false, this.zIndex))
            
            const menu = new Menu (this.stor, SOURCE[14], this.centerX, this.hieght_play/2, false, this.zIndex)
            this.numberGreator.createForMenu(menu, this.stor.getModel('SCORE').getMax(), this.stor.getModel('SCORE').getScore())
            this.objectList.push(menu)     
            const buttonStart = new Button (this.stor, SOURCE[10], this.centerX, this.hieght_play*0.75, false, this.zIndex)
            buttonStart.setFunctionCallback(this.stor.getModel('MODEL').reStartPlay, this.stor.getModel('MODEL'))
            this.stor.getModel('CONTROLLER').setFanctionClick(buttonStart.click, buttonStart)
            this.stor.getModel('CONTROLLER').setFanctionKey(buttonStart.keyPress, buttonStart)
            this.stor.getModel('CONTROLLER').setFanctionTouch(buttonStart.touch, buttonStart)

            this.objectList.push(buttonStart)
        }
    }
}


class Menu extends CommonElement{
    constructor(stor, sprite, centerX, centerY, move, zIndex){
        super(stor, sprite, centerX, centerY, zIndex);
        this.conflicting = false
        this.move = move;
        this.iter = 0;
        this.corrY_old = 0;
        this.corrY_new = 0;
    }

    isConflicting(){
        return this.conflicting
    }

    step(){
        if (this.move){
        this.iter += 1;
        this.corrY_new = 10*Math.sin((this.iter % 360 ) * Math.PI / 180) 
        this.corrY = this.corrY_old - this.corrY_new;
        this.result.stepY(this.corrY);
        this.corrY_old = this.corrY_new;
        }
    }
} 


class Button extends Menu{
    constructor(stor, sprite, centerX, centerY, move, zIndex){
        super(stor, sprite, centerX, centerY, move, zIndex);

    }

    setFunctionCallback(func, context) {
        this.context = context;
        this.func = func;
    }

    click(event){
        const X = event.clientX - this.stor.getCanvas('RECT').left;
        const Y = event.clientY - this.stor.getCanvas('RECT').top;
        let [x, y, w, h] = this.result.getCoord([0,0])
        if ((X > x) && (X < (x + w)) && (Y > y) && (Y < (y + h))) {
            this.func.bind(this.context)();
        } 
    }

    keyPress(event){
        const keyName = event.key
        if (keyName == 'Enter') {
            
            this.func.bind(this.context)();
        } 
    }

    touch(event){
        const X = event.clientX - this.stor.getCanvas('RECT').left;
        const Y = event.clientY - this.stor.getCanvas('RECT').top;
        let [x, y, w, h] = this.result.getCoord([0,0])
        if ((X > x) && (X < (x + w)) && (Y > y) && (Y < (y + h))) {
            this.func.bind(this.context)();
        } 
    }

}

export {StartMenuGreator, StartPlayGreator, StopMenuGreator}

