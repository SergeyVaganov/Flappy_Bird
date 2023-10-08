export default class Global{
    constructor(){
        this.canvas = {
            'OFFSET_BIRD': 60
        }

        this.canvas['CANVAS']= document.getElementById("canvas");
        const widthWrapper = document.getElementById("wrapper").clientWidth
        this.canvas['CANVAS'].width = widthWrapper
        this.canvas['WIDTH']= widthWrapper
        if (this.canvas['WIDTH'] < 500) {
            this.canvas['SCALE'] = 0.8
        }
        else {
            this.canvas['SCALE'] = 1
        }
        
        this.canvas['HIEGTH'] = 500 * this.canvas['SCALE']; 
        this.canvas['HIEGTH_PLAY'] = 400 * this.canvas['SCALE'];        
        this.canvas['CONTEXT'] = this.canvas['CANVAS'].getContext("2d");
        this.canvas['CONTEXT'].globalCompositeOperation ='destination-over';
        this.canvas['CANVAS'].height = this.canvas['HIEGTH'];
        this.canvas['RECT'] = this.canvas['CANVAS'].getBoundingClientRect();
        this.canvas['CENTER_X'] = this.canvas['WIDTH'] / 2;
        this.canvas['BIRD_X'] =  this.canvas['OFFSET_BIRD'] + (this.canvas['WIDTH'] / 30);
        
        this.model = {
        }

        this.audio = {
            'VOLUME':0.05
        }

        this.play = {  
            'FPS':60,     // число кадров с секунду (постоянно обновляется)
            'SPEED':3.5,    // на сколько пикселей двигается картинка за step 
            'FALL':0.8,     // ускорение падения Bird при расчёте координат
            'Y_PASS': 0.25, // Свободный промежуток в трубе   
            'Y_PROTECT': 0.125, // минимальное растояние свободного промежутка трубы от края поля       
            'BIRD_HIEGTH': 0.2, //Высота птицы составляет 20 % от высоты свободного промежутка в трубе.
            'WIDTH_TUBE':2, //Ширина трубы вдвое больше ширины птицы.
            'UP': 0.5, //клике на окно игры птица подлетает вверх на высоту, равную половине высоты свободного промежутка в трубе
            'TUBE_START': 250  // начальное положение труб
        }
    }

    setModel(field, object){
        this.model[field] = object
    }
    
    getModel(field){
        return this.model[field]
    }
    
    getCanvas(field){
        return this.canvas[field]
    }
    
    getAudio(field){
        return this.audio[field]
    }
    
    setPlay(field, object){
        this.play[field] = object
    }
    
    getPlay(field){
        return this.play[field]
    }
}
