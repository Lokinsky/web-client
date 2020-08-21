import config from './config.js';

class bootstrap {

    constructor(){ 
        this.plugins = config.plugins;  
    }
    getPlugins() { 
        return this.plugins;
    }
}
export default new bootstrap();
