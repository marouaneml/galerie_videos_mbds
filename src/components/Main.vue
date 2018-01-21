<template>
  <div class="main">
    <video-item v-for="v in videos.slice(1, 10)" v-bind:key="v.id" voteProp ="3" v-bind:thumb="v.url" v-bind:title="'Titile i'" v-bind:desc="v.title"></video-item>
  </div>
  
</template>

<script>
import axios from "axios";
import VideoItem from "./VideoItem.vue";
export default {
  name: "Main",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      videos: []
    };
  },
  created: function() {
    if (this.videos.length == 0) {
      console.log("videos est vide, faut le remplir!! \nRest api call needed");
      this.getVideos();
    } else {
      console.log("videos contient des videos");
    }
  },
  methods: {
    getVideos: function() {
      axios.get("https://jsonplaceholder.typicode.com/photos").then(
        response => {
          this.videos = response.data;
          this.msg = response.data[1];
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  components: {
    VideoItem
  }
};
</script>

<style scoped>
.main {
  -moz-column-count: 4;
  -webkit-column-count: 4;
  -moz-column-gap: 10px;
  -webkit-column-gap: 10px;
}

@media screen and (max-width: 768px) {
  .main {
    -moz-column-count: 3;
    -webkit-column-count: 3;

  }
}
@media screen and (max-width: 480px) {
  .main {
    -moz-column-count: 1;
    -webkit-column-count: 1;

  }
}
</style>
