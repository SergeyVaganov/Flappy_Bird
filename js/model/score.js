export default class Score{
    constructor(){
        this.score = 0;
    }

    clearScore(){
        this.score = 0;
    }

    stepScore(){
        this.score +=1;
    }

    setScoreMax(){
        if (this.score > localStorage.getItem('FLAPPY_BIRD')){
            localStorage.setItem('FLAPPY_BIRD', this.score )
        }
    }

    getMax(){
        return localStorage.getItem('FLAPPY_BIRD') || 0
    }

    getScore(){
        return this.score
    }
}