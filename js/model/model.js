import Creator from "./creator.js";
import Bird from "./bird.js";
import Coord from "./coord.js";
import Controllers from "./controllers.js";
import Score from "./score.js";


export default class Model{
    constructor(storege){
        this.stor = storege;
        this.objectList = []; 
        this.stor.setModel('MODEL', this)       
        this.stor.setModel('OBJECTS', this.objectList)
        this.stor.setModel('CONTROLLER', new Controllers(this.stor))
        this.bird = new Bird(this.stor);   
        this.score = new Score(this.stor);
        this.stor.setModel('SCORE', this.score)
        this.creator = new Creator(this.stor)
        this.setRenderingFunction(this.startMenuRender)
		this.times = []        
		this.render()
        this.startMenu()
    }

	getFPS(){
		const now = performance.now();
    	while (this.times.length > 0 && this.times[0] <= now - 1000) {
      		this.times.shift();
    		}
    	this.times.push(now);
		this.stor.setPlay('FPS', this.times.length)
	}

	render(){
    	this.stor.getCanvas('CONTEXT').clearRect(0, 0, this.stor.getCanvas('WIDTH'), this.stor.getCanvas('HIEGTH'));  
    	this.RenderingFunction.bind(this)()
		this.getFPS.bind(this)()
    	this.rAF = window.requestAnimationFrame(this.render.bind(this)); 
	}

	setRenderingFunction(func){
    	this.RenderingFunction = func
	}

	clearObjectList(){
  		this.objectList.map(el => el.delete = true)
        this.delete()
    
    }
          
    delete(){
        let index =-1;
        while(true){
            index = this.objectList.findIndex(obj=>obj.delete==true);
            if (index == -1){break;}
            this.objectList.splice(index, 1)
        }   
    }
                   
	startMenu(){
    	this.clearObjectList();
    	this.creator.creareMenu();
	}

	startMenuRender(){
    	this.objectList.map(el => el.step())  
    	this.objectList.map(el => el.del()) 
    	this.delete()      
    	this.creator.creareMenu();
    	this.objectList.sort((a, b) => a.getzIndex() - b.getzIndex())
    	this.objectList.map(el => el.draw())
	}

	reStartPlay(){
    	this.bird.getNewBird();
		this.startPlay()
	}

	startPlay(){
    	this.score.clearScore();
    	this.clearObjectList();
    	this.creator.create();
    	this.creator.creareStartPlay();
    	this.setRenderingFunction(this.startPlayRender)
	}

	startPlayRender(){
    	this.bird.step('stop')
    	this.objectList.map(el => el.del())   
    	this.objectList.sort((a, b) => a.getzIndex() - b.getzIndex())
    	this.objectList.map(el => el.draw()) 
    	this.bird.draw()
	}

	play(){
		this.stor.getModel('CONTROLLER').setFanctionClick(this.bird.up, this.bird)
		this.stor.getModel('CONTROLLER').setFanctionKey(this.bird.up, this.bird)
		this.stor.getModel('CONTROLLER').setFanctionTouch(this.bird.up, this.bird)	
   		this.bird.up.bind(this.bird)()
    	this.creator.create();
   		this.setRenderingFunction(this.playRender)
	}

	playRender(){
    	this.objectList.map(el => el.step())  
    	this.bird.step()
    	this.conflict()
    	this.delete()      
    	this.creator.create();
    	this.objectList.sort((a, b) => a.getzIndex() - b.getzIndex())
    	this.objectList.map(el => el.draw())
    	this.bird.draw()
	}

	stopPlay(){
    	this.creator.createStopMenu()
    	this.setRenderingFunction(this.stopRender)
	}


	stopRender(){
    	this.delete()      
    	this.objectList.map(el => el.draw())
    	this.bird.draw()
	}

	conflict(){ 
    for (let obj of this.objectList){
        if ((obj.isConflicting()) && (Coord.isBoxOverlay(obj.result, this.bird.getResult())))   {
            this.score.setScoreMax()
            obj.conflict()
        }
    }
	}
}

