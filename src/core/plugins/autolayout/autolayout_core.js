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
        this.layout = layout_config
        this.initialize_events();
        this.container()
        

    }
    initialize_events(self = this){
        self.window.addEventListener('resize', 
                ()=>{
                self.container()
                    .then(()=>self.resize())
                    .finally(),false
            } 
        );
    }
    async autolayout_initialize(self = this){
        $(".block-container").css({
            "display":"flex",
            "flex-direction":"column",
            "background-image":"radial-gradient(98% 4%, #FFFFFF 0%, #F0FFFD 100%);",
            "font-weight": "bolder",
            "max-width":self.layout['container-width']+"px"
        })  
        $(".row-block").css({
            "background-color": "red",
            "display": "flex",
            "flex-direction": "row",
            "font-weight": "bolder",
        })
        await self.layout['block'].forEach(block => {

            self.observer.stop_observe();
            $("#"+block.id).css({
                "display": block.display,
                "flex-direction": block["flex-direction"],
            })
            if(block['item-repeat']!=null)
                for (let i = 0; i < block['item-repeat']; i++) {

                    $("#"+block.id).find("#"+block.items.id+"-"+(i+1)).css({
                        "max-width":block.items.width!=null?block.items.width+"px":';',
                        "min-width":block.items['min-width']!=null?block.items['min-width']+"px":';',
                        "max-height":block.items.height!=null?block.items.height+"px":';',
                        "width":block.items['width-size']!=null?block.items['width-size']:";",
                        "padding":"0px 15px"
                    })
                }
            else
                block["items"].forEach(item => {

                    $("#"+block.id).find("#"+item.id).css({
                        "max-width":item.width!=null?item.width+"px":';',
                        "min-width":item['min-width']!=null?item['min-width']+"px":';',
                        "max-height":item.height!=null?item.height+"px":';',
                        "width":item['width-size']!=null?item['width-size']:';',
                        "padding":"0px 15px"
                    })

                })
            if(block["flex-group"]>=1){
                
                var group = []
                
                var number_of_row =  block["item-repeat"]!=null?Math.round((block['item-repeat']/block["flex-group"])+0.25):Math.round((block["items"].length/block["flex-group"])+0.25);
                var length = block["item-repeat"]!=null?block["item-repeat"]:block["items"].length;
                var pointer = 0;
                for (let i = 0; i <= number_of_row; i++) {
                    var element = self.document.createElement("div")
                    element.id = "group-"+block.id+"-"+(number_of_row-i);
                    element.className = "group-sort "+block.id;
                    if(block["justify-content"]=="center")
                        element.style.cssText = "display:flex;flex-direction:row; justify-content: center;";
                    else
                        element.style.cssText = "display:flex;flex-direction:row;"; 
                    if($("#"+block.id)[0]!=null)
                        for (let j = 0; j < block["flex-group"]; j++) {
                            if(block['item-repeat']!=null&&pointer<length&&$("#"+block.id).find("#"+block.items.id+'-'+(pointer+1))!=undefined){
                                if($("#"+block.id).find("#"+block.items.id+'-'+(pointer+1))[0]!=undefined)
                                    if(block["order"]=="desc")
                                        element.prepend($("#"+block.id).find("#"+block.items.id+'-'+(pointer+1))[0])
                                    else
                                        element.appendChild($("#"+block.id).find("#"+block.items.id+'-'+(pointer+1))[0])
                                pointer += 1
                            }
                            else if(pointer<length&&$("#"+block.id).find("#"+block.items[pointer].id)!=undefined){
                                if($("#"+block.id).find("#"+block.items[pointer].id)[0]!=undefined)
                                    if(block["order"]=="desc")
                                        element.prepend($("#"+block.id).find("#"+block.items[pointer].id)[0])
                                    else
                                        element.appendChild($("#"+block.id).find("#"+block.items[pointer].id)[0])

                                pointer += 1
                            }
                            

                        }
                    group.push(element)
                    
                }
                if(block["order"]=="desc")
                    group.reverse()
                
                group.forEach(div=>{
                    if($("#"+div.id)[0]==null)
                        $("#"+block.id).append(div)
                    else{
                        $("#"+block.id).find("#"+div.id).replaceWith(div)
                        $("#"+block.id).append($("#"+block.id).find("#"+div.id))
                    }

                })
            }
            self.observer.start_observe();
        });  
    }
    sort(elementId,asSort,self = this){
        for (let i = 0; i < self.layout["block"].length; i++) {
            const block = self.layout["block"][i]
            if(block.id == elementId){

                if(block['flex-group']==asSort)
                    return;
                    self.layout["block"][i]["flex-group"] = asSort
                break;
            }

        }
        self.autolayout_initialize();
    }
    async execute(self = this){

        await function(){
            
        }()
        self.container()
            .then(self.resize())
        
        this.observer.start_observe();
        
    }
    
    async container(self = this){
        
        self.width = await $('html').width();
        self.height = await $('html').height();
    }
    async resize(self = this){

        var main = {}
        var flex_group = 0;
        if(self.width>=1000){
            flex_group = 3;
            main = {
                "display":"flex",
                "justify-content": "center"
            }
        }else if(self.width<=1000){
            flex_group = 1;
            main = {
                "display":" ",
            }
        }
        
        self.layout['block'].forEach(block=>{
            if(block['flex-group']!=null&&block['flex-group']!=flex_group)
                block['flex-group'] = flex_group;  
        })
        $("#main").css(main);
        self.autolayout_initialize();
    }
    watch(self = this){
        var flow = self.bus_handler.access_flow(self.name)
        //console.log(flow)
        self.layout = flow.data
        self.autolayout_initialize()
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
                    self.container()
                        .then(self.resize())
                changed = false;
            }
        };
        console.log('watcher created')
        return func;
    }
    

    set_bus(bus=null){
        this.bus_handler = bus;
        this.bus_handler.attach_plugin(this, this.name, this.layout);
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