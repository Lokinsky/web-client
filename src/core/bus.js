class bus{
    constructor(){
        this.plugins = [];
        this.flow = [];
        this.update = true;
        this.pointer = 0;
        this.watching_flow()
    }
    async put(plugin_name,action,data, self = this){
        await this.flow.push({"plugin":plugin_name,"action":action,"data":data});
        this.update = false;
        self.plugins.forEach(plugin=>{
            plugin.watch();
        })
    }
    async watching_flow(){
        await setInterval(()=>{
            if(this.flow!=[]&&!this.update)
                for (let index = this.pointer; index < this.flow.length; index++) {
                    const element = this.flow[index];   
                    this.pointer++;
                    this.update = true;
                    console.log(`plugin: ${element.plugin} action: ${element.action} data: ${element.data}`)
                    
                }
        },1000)
    }
    attach_plugin(plugin, self = this){
        self.plugins.push(plugin)
    }
    access_flow(plugin,action,self = this){
        var result = [];
        this.flow.forEach(flow_note => {
            if( flow_note.action==action && flow_note.plugin == plugin 
                ||
                flow_note.action==action && plugin == '*'
                ||
                '*'==action && plugin == flow_note.plugin){
                result.push(flow_note)
            }
        });
        return result;
    }
}

export default new bus();