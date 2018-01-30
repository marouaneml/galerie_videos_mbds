<template>
  <div class="new-video">
    <h2 class="view-title">Ajouter une vidéo</h2>
    <form enctype="multipart/form-data">
        <label>
            Url: {{videoUrl}}
            <input type="text" ref="url" v-model="videoUrl" />
        </label>
        <label>
            Description:
            <input type="text" ref="desc" />
        </label>
        <label>
            Légende :
            <input type="text" ref="legende" />
        </label>
        <button type="submit" :disabled="this.sent" @click.prevent="getFormValues()">Valider</button>
        <button @click="resetForm()">Annuler</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "New",
  data() {
    return {
      sent: false,
      videoUrl: "",
      videoData: {}
    };
  },
  watch: {
    videoUrl: function(newVal, oldVal) {
      var videoid = newVal;
      var matches =
        videoid.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) ||
        videoid.match(/^http:\/\/youtu\.be\/([^?]+)/i);
      if (matches) {
        videoid = matches[1];
        console.log("Recuperation des infos de la video ..");
        axios
          .get("https://www.googleapis.com/youtube/v3/videos", {
            params: {
              key: "AIzaSyBGyiApGXIvj2c0MaSSb0n5yAAZWIyInmU",
              part: "snippet,statistics",
              id: videoid
            }
          })
          .then(
            response => {
              this.videoData = {data: response.data.items[0].snippet}
            },
            error => {
              console.log(error);
            }
          );
      } else if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {
        console.log("C'est pas une url youtube!");
        return;
      }
    }
  },
  methods: {
    getFormValues: function() {
      this.sent = true;
      let video = {
        url: this.$refs.url.value,
        desc: this.$refs.desc.value,
        legende: this.$refs.legende.value,
        poster: this.videoData.poster,
        votes: []
      };
      let videoValues = Object.values(video);
      let ok = true;
      for (var i = 0; i < videoValues.length - 1; i++) {
        if (videoValues[i] == "") {
          alert("Des champs sont vides, verifiez!");
          ok = false;
          break;
        }
      }
      if (ok) {
        axios
          .post("http://localhost:8085/api/video/save", video)
          .then(response => {
            if (response.data.succes == true && response.status == 200) {
              alert("Video Ajouter avec succès!\nVous Voulez creer une autre?");
              this.resetForm();
              this.sent = false;
            }
          })
          .catch(error => Promise.reject(error));
      }
    },
    resetForm: function() {
      this.$refs.url.value = "";
      this.$refs.desc.value = "";
      this.$refs.legende.value = "";
      this.$refs.poster.value = "";
    }
  }
};
</script>

<style scoped>
.new-video {
  background-color: #ffffff;
  padding: 10px;
}
button:disabled {
  background-color: #ffc107;
}
</style>