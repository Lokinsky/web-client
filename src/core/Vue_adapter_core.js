import Core from './Core.js';
export default{
  install(Vue, options) {
      // 1. add global method or property
      var core = null;
      Vue.core = function () {
        // some logic ...
      }
    
      // 2. add a global asset
      Vue.directive('my-directive', {
        bind (el, binding, vnode, oldVnode) {
          // some logic ...
        }

      })
    
      // 3. inject some component options
      Vue.mixin({
        created: function () {
          // some logic ...
          core = Core;
          core._init_plugins();
        }
      })
    
      // 4. add an instance method
      
      Vue.prototype.$core = function () {
        return core;
      }
  }
}