import Vue from 'vue';
Vue.component('test-component', require('./components/Test.vue').default);

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
