<template>
  <div class="main">
    <video-item @delete-evt="handleDelete(v._id)" v-for="v in videos.slice(0, this.count)" v-bind:key="v._id" :id="v._id" voteProp ="3" v-bind:thumb="v.poster" v-bind:title="v.legende" v-bind:desc="v.desc"></video-item>
    <p v-if="videos.length == 0">Pas de videos! Vérifiez le serveur nodeJs.</p>
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
  mounted: function() {
    this.$router.app.$on("search-event", param => {
      this.searchVideo(param);
    });
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function(event) {
      if (
        scrollY / (document.body.scrollHeight - document.body.offsetHeight) ==
        1
      ) {
        this.count += 3;
      }
    },
    handleDelete: function(id) {
      let i = this.videos.map(item => item._id).indexOf(id);
      this.videos.splice(i, 1);
    },
    getVideos: function() {
      axios.get("http://localhost:8085/api/video/all").then(
        response => {
          this.videos = response.data;
          console.log(this.videos);
        },
        error => {
          console.log(error);
        }
      );
    },
    searchVideo: function(val) {
      axios
        .get("http://localhost:8085/api/video/search?like="+val)
        .then(
          response => {
            this.videos = response.data;
            console.log(response.data);
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
