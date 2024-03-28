import './styles/main.css'
import 'floating-vue/dist/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faFortAwesome, faPagelines } from "@fortawesome/free-brands-svg-icons";
import { VTooltip } from "floating-vue";


const app = createApp(App)

library.add(fas, faFortAwesome, faPagelines)

app.use(router)

app.directive('tooltip', VTooltip)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
