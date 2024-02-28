import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';
import Calendar from 'primevue/calendar';
import Skeleton from 'primevue/skeleton';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import BlockUI from 'primevue/blockui';
import Dialog from 'primevue/dialog';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/aura-light-green/theme.css';      //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeflex/primeflex.css';
import './styles/common.css';

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);

app.component('InputText', InputText);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Dropdown', Dropdown);
app.component('Card', Card);
app.component('Menubar', Menubar);
app.component('Calendar', Calendar);
app.component('Skeleton', Skeleton);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('BlockUI', BlockUI);
app.component('Dialog', Dialog);

app.mount('#app');
