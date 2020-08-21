import paper from "paper";
class _init {
    constructor(){
        this.plugin = new Plugin();
    }
    _bus(bus=null){
        if(bus!=null)
            this.plugin.set_bus(bus);
    }
    _start(){
        this.plugin.execute();
    }

}
class Plugin{
    constructor(){
        this.name = "animation.js";
        this.bus_handler = null;
    }
    async watch(self = this){
        await function(){
            

        }()
    }
    async execute(self = this){
        var count = 0;
        self.bus_handler.put(self.name,'state','executing')
        
        await function(){

            /*setInterval(()=>{
                //console.log(count)
                //console.log('bye.js')
                
                //bus_handler.put(name,'state',count)
                count++;
            },2000)*/
        }()
    }
    set_bus(bus=null){
        this.bus_handler = bus;
        this.bus_handler.attach_plugin(this);
    }
}
export default _init;