<template>
  <div class="show-content">
    <h2 class="view-title">{{video.legende}} </h2>

    <div id="video-wrapper">
      <iframe :src="'https://www.youtube.com/embed/'+video.url+'?modestbranding=1&autohide=1&showinfo=0'" frameborder="0" allowfullscreen></iframe>
    </div>

    <p class="desc">{{video.desc}} </p>

    <div class="comments">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Show",
  data() {
    return {
      video: {}
    };
  },
  methods: {
    getDetail: function() {
      let id = this.$route.params.id;
      axios.get("http://localhost:8085/api/video?id=" + this.$route.params.id).then(
        response => {
          this.video = response.data;
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  created: function(){
      //console.log(this.$route.params.id)
    this.getDetail();
  },
  watch: {
    
  }
};
</script>

<style scoped>
.show-content {
  background-color: #ffffff;
  padding: 10px;
}
#video-wrapper {
  position: relative;
	padding-bottom: 56.25%;
	padding-top: 30px;
	height: 0;
  overflow: hidden;
  max-width: 600px;
  margin: auto
}
#video-wrapper iframe,  
#video-wrapper object,  
#video-wrapper embed {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

p{
  margin: 20px 0;
}
</style>