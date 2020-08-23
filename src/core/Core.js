import bootstrap from './bootstrap.js';
import bus from './bus.js';

class core{
    
    constructor(){

        this.plugins = [];
        console.log('core initialized')
        
    }
    getBoostrap() {
        return bootstrap;
    }
    access_flow(plugin){
        return bus.access_flow(plugin)
    }
    put(plugin_name,data, callback){
        bus.put(plugin_name,data,callback)
    }
    async _init_plugins(){
        if(bootstrap.plugins!=null&&this.plugins.length==0){  
            await bootstrap.plugins.forEach((plgn) => {
                var plugin = new plgn.plugin()
                plugin._bus(bus)
                plugin._start();
                this.plugins.push({
                        "plugin":plugin,
                        "name": plgn['name']
                }) 
            });
            console.log('plugins are installed')  
        }
    }

}
var Core = (function () {
    var instance;
 
    function createInstance() {
        var object = new core();
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default Core.getInstance();