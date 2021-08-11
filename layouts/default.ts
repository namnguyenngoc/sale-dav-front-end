
import Vue from 'vue';

export default Vue.extend({
    name:'routers',
    data: ()=>{
        return {
          clipped: false,
          drawer: false,
          fixed: false,
          items: [
            {
              icon: 'mdi-apps',
              title: 'Welcome',
              to: '/'
            },
            {
              icon: 'mdi-chart-bubble',
              title: 'Dashboard',
              to: '/dashboad'
            },
            {
              icon: 'mdi-chart-bubble',
              title: 'Chi Tiêu',
              to: '/chitieus/chitieu'
            },
            {
              icon: 'mdi-chart-bubble',
              title: 'Trả góp',
              to: '/tragop/tragop'
            }
            ,
            {
              icon: 'mdi-sale',
              title: 'Bán hàng',
              to: '/sales/qlbanhang'
            }
          ],
          miniVariant: false,
          right: true,
          rightDrawer: false,
          title: 'Vuetify.js'
        }
      }
});
