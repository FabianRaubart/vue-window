import Vue from "vue";
import vueWindow from "./vue-window.vue";

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(vueWindow);
  },
}).$mount("#app");
