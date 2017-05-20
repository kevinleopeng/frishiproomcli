import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import routes from './router/router'
import ajax from './config/ajax'
import axios from 'axios'
import './style/common'
import './config/rem'
import ExpenseManage from './components/expensemanage.vue'
import IncomeManage from './components/incomemanage.vue'
import RenterCollectManage from './components/rentercollectmanage.vue'
import LandlordCollectManage from './components/landlordcollectmanage.vue'
import friendshipexpense from './components/friendshipexpense.vue'
import friendshipcollect from './components/friendshipcollect.vue'


Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(axios)
Vue.prototype.$ajax = axios
const router = new VueRouter({
	routes:[
    {
	    path:"/expense/manage",
      name:"expense.manage",
      components: {
	      expensemanage: ExpenseManage
	    }
    },
    {
      path:"/expense/income",
      name:"income.manage",
      components: {
        incomemanage:IncomeManage
      }
    },
    {
      path:"/collect/renter",
      name:"rentercollect.manage",
      components: {
        rentercollectmanage:RenterCollectManage
      }
    },
    {
      path:"/collect/landlord",
      name:"landlordcollect.manage",
      components: {
        landlordcollectmanage: LandlordCollectManage
      }
    }
  ]
})

new Vue({
  components : {
    'friendship-expense': friendshipexpense,
    'friendship-collect': friendshipcollect
  },
	router,
  template:"<div id='wrapper'>" +
   " <el-row :gutter='10'> " +
   "    <el-col :xs='8' :sm='6' :md='4' :lg='3'> " +
   "      <div class='grid-content bg-purple'> " +
   "        <friendship-expense></friendship-expense>" +
   "        <friendship-collect></friendship-collect>" +
   "    </el-col>" +
   "    <el-col :xs='4' :sm='6' :md='8' :lg='20'> " +
   "      <div class='grid-content bg-purple-light'> " +
   "        <router-view name='expensemanage'></router-view> " +
   "        <router-view name='incomemanage'></router-view> " +
   "        <router-view name='rentercollectmanage'></router-view> " +
   "        <router-view name='landlordcollectmanage'></router-view> " +
   "     </div> " +
   "    </el-col> " +
   " </el-rom> " +
 " </div>"
}).$mount('#main')
