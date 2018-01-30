<template>
<router-link :to="{ name: 'details', params: { id: id }}">
  <div class="wrap">
    <div class="video-item">
      <span @click.prevent= "deleteMe(id)">Supprimer</span>
      <div class="thumb">
        <img :src="thumb" :alt="title">
      </div>
      <div class="title">{{title.slice(0, 50) +" ..."}}</div>
      <p>{{desc.slice(0, 100) + " ..."}}</p>
      <hr>
      <div class="vote">
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=5? true:false)}" @click.prevent= "check(5)"></span>
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=4? true:false)}" @click.prevent="check(4)"></span>
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=3? true:false)}" @click.prevent="check(3)"></span>
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=2? true:false)}" @click.prevent="check(2)"></span>
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=1? true:false)}" @click.prevent="check(1)"></span>
      </div>
    </div>
  </div>

</router-link>
  
  
</template>
<script>
import axios from "axios";

export default {
  name: "VideoItem",
  props: ["title", "voteProp", "thumb", "desc", "id"],
  data() {
    return {
      checked: false,
      vote: this.voteProp
    };
  },
  methods: {
    check(val) {
      this.vote = val;
      this.checked = !this.checked;

      if (this.getCookie("mbds-gallery-user-cookie") != null) {
        console.log(this.getCookie("mbds-gallery-user-cookie"));
      } else {
        // generer une clé
        this.setCookie("mbds-gallery-user-cookie", "yyyyyy", 365);
        // envoyer la clé à mongodb
        
      }
    },
    setCookie: function(name, value, days) {
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
      } else var expires = "";
      document.cookie = name + "=" + value + expires + "; path=/";
    },
    getCookie: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    deleteMe(id) {
      axios.delete("http://localhost:8085/api/video?id=" + id).then(
        response => {
          if (response.data == 0) {
            alert("Plus de video à supprimé!");
          } else {
            alert("Video supprimé avec succès!");
            this.$emit('delete-evt', this.id);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 33.33333333%;
  display: inline-block;
  vertical-align: top;
}
.video-item {
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 15px;
  overflow: hidden;
  position: relative;
  margin: 5px;
  /*break-before: verso;
  -moz-column-break-before: always;
  -webkit-column-break-before: always;*/
}
.video-item>span{
      position: absolute;
    background: #fafafa;
    right: 5px;
    top: 5px;
    padding: 3px 5px;
    font-size: 13px;
    color: #F44336;
    display: block;
    border-radius: 5px;
}
.video-item:hover {
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
hr {
  margin: 10px -15px;
  border: 0;
  border-bottom: 1px solid #f2f1f0;
}
.thumb {
  margin: -15px -15px 10px -15px;
}
.thumb img {
  width: 100%;
  display: block;
}
.title {
  color: #7b7d7a;
  font-size: 18px;
}
p {
  color: #c6c7cb;
  font-size: 14px;
}
/* donner un vote à cette video */
.vote {
  unicode-bidi: bidi-override;
  direction: rtl;
}
.vote > span {
  position: relative;
  font-size: 18px;
}
.vote > span:before,
.vote > span ~ span:before {
  content: "\2605";
  color: #dcdad9;
  font-size: 25px;
  line-height: 0;
}
.vote > span:hover:before,
.vote > span:hover ~ span:before {
  color: #ffed53;
}

.vote span.active:before {
  color: #ffed53;
}
</style>