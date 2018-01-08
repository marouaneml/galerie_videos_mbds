<template>
  <div id="app">
    <div id="bg"></div>
    <div class="content">
      <span id="logo"><router-link to="/"><img src="./assets/logo.png" alt="logo"></router-link> </span> 
      <ul>
        <li><router-link to="/nouvelle-video">Nouvelle vidéo</router-link></li>
        <li><router-link to="/show">Détails</router-link></li>
      </ul>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import url(./assets/css_reset.css);
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.1s;
}

.fade-enter-active {
  transition-delay: 0.1s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
#app {
  background-color: #952a3e;
  padding: 0 20px;
  height: 100%;
}
html,
body {
  height: 100%;
}
.content{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 90%;
  height: 450px;
  background: #FAFAFA;
  border-radius: 8px;
  padding: 10px;
}
#bg {
  display: block;
  width: 30%;
  height: 100%;
  border-left: 100% solid;
  background: linear-gradient(98deg, transparent, transparent, transparent 40%, #F3CF6E 40%);
  position: absolute;
  right: 0;
  top: 0;
}
#logo{
  position: absolute;
  height: 40px;
  top: -45px;
}#logo img{
  height: 100%;
}
</style>
