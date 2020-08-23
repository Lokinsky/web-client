class bus{
    constructor(){
        this.plugins = [];
        this.flow = [];
        this.update = true;
        this.pointer = 0;
        this.watching_flow()
    }
    async put(plugin_name,data, callback = (l,e)=>{}, self = this){
        for (let i = 0; i < self.flow.length; i++) {
            if(self.flow[i].plugin == plugin_name){
                self.flow[i].data = await callback(self.flow[i].data,data)
                self.update = false;
                self.emit()
                break;
            }
        }
        
    }
    emit(){
        this.plugins.forEach(plugin=>{
            plugin.watch()
        })
    }
 
    async remove_field_flow(index, self = this){
        var del = self.flow.splice(index,1);
    }
    async watching_flow(){
        await setInterval(()=>{
            if(this.flow!=[]&&!this.update)
                for (let index = this.pointer; index < this.flow.length; index++) {
                    const element = this.flow[index];   
                    this.pointer++;
                    this.update = true;
                    //console.log(`plugin: ${element.plugin} data: ${element.data}`)
                    
                }
        },1000)
    }
    attach_plugin(plugin, name, data, self = this){
        self.flow.push({"plugin":name, "data":data})
        self.plugins.push(plugin)
    }
    access_flow(plugin,self = this){
        var result = null;
        self.flow.forEach(flow_note => {
            if(flow_note.plugin == plugin) {
                result = flow_note
                return;
            }
        });
        //console.log(self.flow)
        return result!=null?result:0;
    }
}

export default new bus();