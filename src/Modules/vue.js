import Vue from 'vue';
import './components/vue.css';
import Test from './components/Test.vue';

const data = {
  count: 1,
  text: 'hello',
};

const vm = new Vue({
  components: {
    Test,
  },
  delimiters: ['${', '}'],
  el: '#app',
  data,
});

vm.count;
