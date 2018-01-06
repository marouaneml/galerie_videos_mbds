<template>
  <div id="app">
    <router-link to="/">Home</router-link>  
    <ul>
      <li><router-link to="/nouvelle-video">Nouvelle vidéo</router-link></li>
      <li><router-link to="/show">Détails</router-link></li>
    </ul>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
