<template>
  <div class="new-video">
    <h2 class="view-title">Ajouter une vidéo</h2>
    <form enctype="multipart/form-data">
        <label>
            Url:
            <input type="text" placeholder="https://www" ref="url" v-model="videoUrl" />
        </label>
        <label>
            Légende :
            <input type="text" ref="legende" />
        </label>
        <label>
            Description:
            <textarea type="text" ref="desc" ></textarea>
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
      videoData: null
    };
  },
  watch: {
    videoUrl: function(newVal, oldVal) {
      var videoid = newVal.trim();
      var matches = videoid.match(
        /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      );
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
              if (response.data.items.length > 0) {
                let data = response.data.items[0].snippet;
                this.videoData = {
                  url: videoid,
                  desc: data.description,
                  legende: data.title,
                  poster: data.thumbnails.standard.url,
                  vote: 0
                };
                this.$refs.desc.value = data.description;
                this.$refs.legende.value = data.title;
              }
              else{
                console.log("Video n'existe pas!")
              }
            },
            error => {
              this.videoData = null;
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
        vote: 0
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
      if (ok && this.videoData != null) {
        axios
          .post("http://localhost:8085/api/video/save", this.videoData)
          .then(response => {
            if (response.data.succes == true && response.status == 200) {
              alert("Video Ajouter avec succès!\nVous Voulez creer une autre?");
              this.resetForm();
            }
          })
          .catch(error => { 
            //Promise.reject(error);
            console.log("Sauvgarde echouée!")
          });
        this.sent = false;
      }
    },
    resetForm: function() {
      this.$refs.url.value = "";
      this.$refs.desc.value = "";
      this.$refs.legende.value = "";
      this.sent = false;
      this.videoData = null;
      return;
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