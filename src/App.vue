<template>
  <div id="app">
    
      <div id="header">
        <div id="logo"><router-link to="/">MBDS Gallery</router-link></div> 
        <div id="serach-input">
          <input @keyup.enter="search()" placeholder="Chercher une vidéo ..." type="text" v-model="searchInput" />
        </div>
        <nav id="menu">
          <input type="checkbox">
          <div id="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul>
            <li><router-link to="/nouvelle-video">Nouvelle vidéo</router-link></li>
          </ul>
        </nav>
        
      </div>

    <div class="content">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      searchInput: ""
    };
  },
  methods: {
    search: function() {
      this.$router.app.$emit("search-event", this.searchInput);
    }
  }
};
</script>

<style>
@import url(./assets/css_reset.css);
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto+Slab");
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.2s;
}

.fade-enter-active {
  transition-delay: 0.2s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

#app {
  height: 100%;
}

html,
body {
  height: 100%;
  font-family: "Open Sans", sans-serif;
  color: rgba(0, 0, 0, 0.87);
  background: #f2f1f0;
}

h1,
h2,
h3 {
  font-family: "Roboto Slab", serif;
}

a,
a:visited {
  color: #b9cb43;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.content {
  margin: auto;
  padding: 20px 0;
  max-width: 84%;
}
.view-title {
  padding: 5px;
  font-size: 25px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
#menu-icon {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 5px 0 5px;
  width: 30px;
}
#menu {
  float: right;
  position: relative;
  margin-top: -27px;
}
#menu ul {
  position: absolute;
  top: 40px;
  min-width: 120px;
  right: 0px;
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.51);
  display: none;
}
#menu input:checked + #menu-icon + ul {
  display: block;
}
#menu ul > li {
  font-size: 13px;
  margin: 5px 0;
}
#menu ul > li > a {
  color: #efeff1;
}
#menu input,
#menu-icon {
  position: absolute;
  right: 0;
}
#menu input {
  z-index: 2;
  opacity: 0;
  position: absolute;
  width: 30px;
  height: 25px;
  cursor: pointer;
}
#menu input:hover + #menu-icon span,
#menu input:checked + #menu-icon span {
  border-color: #b9cb43;
}

#menu-icon span {
  display: block;
  border-bottom: 2px solid #ddd;
  margin-bottom: 3px;
}

#menu-icon span:last-child {
  margin-bottom: 5px;
}

#header {
  background-color: #fff;
  border-top: 1px solid #b9cb43;
  position: relative;
  padding: 20px 8%;
  border-bottom: 3px solid #efeff1;
}
#logo {
  position: absolute;
  font-weight: bolder;
  font-size: 20px;
}
#logo a {
  color: #9e9e9e;
}
#logo a:hover {
  text-decoration: none;
}
#logo img {
  height: 100%;
  display: block;
}

#serach-input {
  padding-left: 140px;
  padding-right: 40px;
}
#serach-input input {
  border: 0;
  border-radius: 5px;
  background-color: #f2f1f0;
  padding-left: 10px;
  color: #9e9e9e;
}
/* Style general */
input[type="text"],
textarea {
  border: none;
  border-bottom: 2px solid #e1e2db;
  width: 100%;
  outline: none;
  padding: 5px 0;
}
input[type="text"]:focus,
textarea:focus {
  border-bottom: 2px solid #b9cb43;
}
textarea {
  max-width: 100%;
  min-width: 100%;
  min-height: 200px;
}
input[type="text"],
textarea,
button {
  font-size: 15px;
  font-family: "Open Sans", sans-serif;
}

label {
  margin-bottom: 10px;
  display: block;
}

button {
  background-color: #b9cb43;
  color: #fafafa;
  border: none;
  padding: 5px 10px;
  font-size: 15px;
  font-family: "Open Sans", sans-serif;
}
</style>

