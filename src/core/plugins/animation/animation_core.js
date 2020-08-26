import paper from "paper";

//require('paper')
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
        this.name = "animation";
        this.bus_handler = null;
    }
    watch(self = this){
    }
    async execute(self = this){
        var count = 0;
        //self.bus_handler.put(self.name,'executing')
        
        //rotationCube()
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
        this.bus_handler.attach_plugin(this, this.name, {});
    }
}
export default _init;

var rotationCube = function (){
    var project = new paper.Project(window.document.getElementById('cube'))
    var view = project.view

    //console.log(project)
    var path = new paper.Path.Circle(new paper.Point(80, 50), 75);
    path.fillColor = 'red'
    path.selected = true
	// Give the stroke a color
    path.strokeColor = 'black';

    var x = view.viewSize.width/2
    var y = view.viewSize.height/2

    var start = new paper.Point(x,y);
    console.log(start)

    project.activeLayer.activate()

    
    
}