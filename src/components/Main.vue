<template>
  <div class="main">
    <video-item v-for="v in videos.slice(0, this.count)" v-bind:key="v.id" :id="v.id" voteProp ="3" v-bind:thumb="v.url" v-bind:title="'Titile i'" v-bind:desc="v.title"></video-item>
  </div>
  
</template>

<script>
import axios from "axios";
import VideoItem from "./VideoItem.vue";
export default {
  name: "Main",
  data() {
    return {
      videos: [],
      count: 9
    };
  },
  created: function() {
    if (this.videos.length == 0) {
      console.log("videos est vide, faut le remplir!! \nRest api call needed");
      this.getVideos();
      // Activer la methode onScroll
      window.addEventListener("scroll", this.handleScroll);
    } else {
      console.log("videos contient des videos");
    }
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function(event) {
      if(scrollY / (document.body.scrollHeight-document.body.offsetHeight) == 1){
        this.count += 3;

      }
    },
    getVideos: function() {
      axios.get("https://jsonplaceholder.typicode.com/photos").then(
        response => {
          this.videos = response.data;
        },
        error => {
          console.log(error);
        }
      );

      axios.get("http://localhost:8085/api/video/all").then(
        response => {
          console.log(response);
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

</style>
