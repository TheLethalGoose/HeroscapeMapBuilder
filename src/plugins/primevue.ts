import 'primevue/resources/themes/aura-dark-green/theme.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css';
import '/node_modules/primeflex/primeflex.css'

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Toolbar from 'primevue/toolbar';
import AutoComplete from "primevue/autocomplete";
import Carousel from "primevue/carousel";
import InputNumber from "primevue/inputnumber";

export default {
    install(app: any) {
        app.use(PrimeVue);
        app.component('Button', Button);
        app.component('Toolbar', Toolbar);
        app.component('AutoComplete', AutoComplete);
        app.component('Carousel', Carousel);
        app.component('InputNumber', InputNumber)
    }
};
