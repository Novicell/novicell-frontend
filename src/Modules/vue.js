import Vue from 'vue';
import './components/vue.css';
import Test from './components/Test.vue';

Vue.component('test-component', Test);

const data = {
    count: 1,
    text: 'hello'
};

const vm = new Vue({
    delimiters: [ '${', '}' ],
    el: '#app',
    data
});

vm.count;
