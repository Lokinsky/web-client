import $ from 'jQuery';
import layout_config from './layout_config.js';
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
        this.name = "autolayout";
        this.width = 0
        this.height = 0
        this.window = global.window
        this.document = global.window.document
        this.observer = new Observer(this.observe());
        this.initialize_events();
        this.container()

    }
    initialize_events(self = this){
        self.window.addEventListener('resize', 
                ()=>{
                self.container()
                    .then(()=>self.resize())
                    .finally(),true
            } 
        );
    }
    autolayout_initialize(self = this){
        $(".block-container").css({
            "display":"flex",
            "flex-direction":"column",
            "background-image":"radial-gradient(98% 4%, #FFFFFF 0%, #F0FFFD 100%);",
            "font-weight": "bolder"
        })  
        $(".row-block").css({
            "background-color": "red",
            "display": "flex",
            "flex-direction": "row",
            "font-weight": "bolder"
        })
        layout_config['block'].forEach(block => {
            //console.log(block)
            self.observer.stop_observe();
            $("#"+block.id).css({
                "display": block.display,
                "flex-direction": block["flex-direction"],
            })
            block["items"].forEach(item => {
                //console.log($(".row-block .1"))
                $("#"+block.id).find("#"+item.id).css({
                    "min-width":item.width+"px",
                    "min-height":item.height+"px",
                    "width":";",
                })

            })
            if(block["flex-group"]>=1){
                
                var group = []
                var number_of_row =  Math.round((block["items"].length/block["flex-group"])+0.25);
                var length = block["items"].length;
                var pointer = 0;
                for (let i = 0; i <= number_of_row; i++) {
                    var element = self.document.createElement("div")
                    element.id = "group-"+block.id+"-"+(number_of_row-i);
                    element.className = "group-sort-"+block.id;
                    if(block["justify-content"]=="center")
                        element.style.cssText = "display:flex;flex-direction:row; justify-content: center;";
                    else
                        element.style.cssText = "display:flex;flex-direction:row;"; 
                    for (let j = 0; j < block["flex-group"]; j++) {
                        if(pointer<length&&$("#"+block.id).find("#"+block.items[pointer].id)[0]!=null){
                            element.appendChild($("#"+block.id).find("#"+block.items[pointer].id)[0])
                            pointer += 1
                        }
                    }
                    group.push(element)
                    
                }
                if(block["order"]=="desc")
                    group.reverse()
                //console.log(group)
                group.forEach(div=>{
                    if($("#"+div.id)[0]==null)
                        $("#"+block.id).append(div)
                    else{
                        $("#"+block.id).find("#"+div.id).replaceWith(div)
                        $("#"+block.id).append($("#"+block.id).find("#"+div.id))
                    }
                    //console.log(div)
                })
            }
            self.observer.start_observe();
        });  
    }
    sort(elementId,asSort,self = this){
        for (let i = 0; i < layout_config["block"].length; i++) {
            const block = layout_config["block"][i]
            if(block.id == elementId){
                //console.log(layout_config["block"][i])
                if(block['flex-group']==asSort)
                    return;
                layout_config["block"][i]["flex-group"] = asSort
                break;
            }

        }
        self.autolayout_initialize();
    }
    async execute(self = this){
        self.bus_handler.put(this.name,'state','executing');
        
        
        await function(){
            
        }()
        self.container()
            .then(self.resize())
        
        this.observer.start_observe();
        
    }
    
    async container(self = this){
        if(self.width==0)
            await function(){
                while(self.width==0){
                    self.width = $('#container').width();
                    self.height = $('#container').height();
                }
                console.log(self.width)
            } 
        self.width = $('#container').width();
        self.height = $('#container').height();
        
    }
    async resize(self = this){

            
        if(self.width>=1000&&self.width<=1200){
            layout_config['block'].forEach(block=>{
                if(block['flex-group']!=null&&block['flex-group']!=3)
                    block['flex-group'] = 3;
            })
            self.autolayout_initialize();
        }else if(self.width<=1000){
            layout_config['block'].forEach(block=>{
                if(block['flex-group']!=null&&block['flex-group']!=1)
                    block['flex-group'] = 1;
            })
            self.autolayout_initialize();
        }
    }
    async watch(self = this){
        await function(){
            var flow = self.bus_handler.access_flow(self.name,"*")
            flow.forEach(f=>{
                //console.log(f)
                switch(f.action){
                    case 'sort':
                        //console.log(f)
                        self.sort(f.data.blockid,f.data.type)
                        break;
                }
            })
        }()
    }
    observe(self = this){
        var changed = false;
        const func = function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    //console.log('A child node has been added or removed.');
                    changed = true;
                }
                else if (mutation.type === 'attributes') {
                    //console.log('The ' + mutation.attributeName + ' attribute was modified.');
                }
            }
            if(changed){
                if($("#container")[0]!={})
                    self.autolayout_initialize()
                changed = false;
            }
        };
        console.log('watcher created')
        return func;
    }
    

    set_bus(bus=null){
        this.bus_handler = bus;
        this.bus_handler.attach_plugin(this);
    }
}

class Observer{
    constructor(_callback){
        // Select the node that will be observed for mutations
        this.targetNode = document.getElementById('main');

        // Options for the observer (which mutations to observe)
        this.config = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = _callback 

        // Create an observer instance linked to the callback function
        this.observer = new MutationObserver(callback);        
    }
    start_observe(self = this){
        // Start observing the target node for configured mutations
        self.observer.observe(self.targetNode, self.config);
    }
    stop_observe(self = this){
        // Later, you can stop observing
        self.observer.disconnect();
    }
}


export default _init;