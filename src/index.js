import Vue from "vue"
import VueRouter from 'vue-router'
import core from './core/Vue_adapter_core.js'


import App from './App.vue'

//import component from "./{bundle}/components/component.vue" 


Vue.use(VueRouter)
Vue.use(core)
Vue.config.productionTip = false



//Vue.component('LoginComponent', {})


const routes = [
    {   path: '/', component: App},
]

const router = new VueRouter({
    routes,
    
})

const application = new Vue({
    core,
    created(){
       
    },
    watch: {
        $route(to, from) {

        }
    },
    async mounted(){
    },
    update(){
  
    },
    methods:{

    },
    router
  }).$mount('#app')