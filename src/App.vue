<template>
  <v-app>
    <div class="header">
      <p class="header__title headline">Movie Marathon Maker</p>
    </div>
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/timeline">Timeline</router-link>
    <router-link to="/about">About</router-link> -->
    <div class="view">
      <router-view ></router-view>
    </div>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {},

  data () {
    return {}
  }
}
</script>

<style lang="scss">
.header {
  padding: 8px 0;
  text-align: center;
  border-bottom: 1px solid;
}

  .header__title {
    margin: 0;
  }

.view {
  padding: 16px 8px;
}
</style>
