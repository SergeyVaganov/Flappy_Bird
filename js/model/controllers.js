
export default class Controllers{
    constructor(stor) {
		this.canvas = stor.getCanvas('CANVAS')
		document.addEventListener("keypress", this.keypress.bind(this));   				
    	this.canvas.addEventListener("click", this.click.bind(this));   
      	this.canvas.addEventListener("touchstart", this.touch.bind(this));

    }
    
    click(event){
      	const f = this.callbackClikc.bind(this.contextClikc)
      	f(event)
    }
  
    setFanctionClick(func, context){
      	this.contextClikc = context;
      	this.callbackClikc = func;
    }

    keypress(event){
		this.callbackKey.bind(this.contextKey)(event)
    }

  	setFanctionKey(func, context){
		this.contextKey = context;
		this.callbackKey = func;
  	}

	touch(event){
		this.callbackTouch.bind(this.contextTouch)(event)
    }

  	setFanctionTouch(func, context){
		this.contextTouch = context;
		this.callbackTouch = func;
  	}

}

