<template>
  <div>HeyHo, {{text}} and <h5>Multiplied count: {{multiplied}}</h5></div>
</template>
 <script>
export default {
  props: {
    child_count: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      count: 1,
      text: "It's the child component!"
    };
  },
  computed: {
    multiplied: function() {
      return this.child_count * 2;
    }
  }
};
</script>	

 <style>
</style> 