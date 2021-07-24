<template>
  <div class="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout.vue'
import MainLayout from './layouts/MainLayout.vue'

export default {
  components:{
    EmptyLayout, MainLayout
  },
  computed:{
    layout(){
      return (this.$route.meta.layout || 'empty')+"-layout";  
    },
  }
}
</script>


<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
// @import '../dist/css/main.css';
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 0.75rem;
}
.app{
  height: 100vh;
  width: 100vw;
  // position: absolute;
}
.btn.dark{
  background-color: #134949 !important;
}
.btn-floating {
  &.light {
    background-color: darken(rgb(34, 134, 134), 6%);
  }
  &.dark {
    background-color: darken(rgb(34, 134, 134), 20%);
  }
}
.dark{
  color: white;
}
.light{
  color: black;
}

.input-field.dark > input{
  color: white;
}

</style>
