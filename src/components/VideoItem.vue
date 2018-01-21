<template>
  <div class="wrap">
    <div class="video-item">
      <div class="thumb">
        <img :src="thumb" :alt="title">
      </div>
      <div class="title">{{title}}</div>
      <p>{{desc}}</p>
      <hr>
      <div class="vote">
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=5? true:false)}" @click="check(5)"></span>
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=4? true:false)}" @click="check(4)"></span>
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=3? true:false)}" @click="check(3)"></span>
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=2? true:false)}" @click="check(2)"></span>
        <span :class="{ checkbox: true, checked: checked, active: (this.vote>=1? true:false)}" @click="check(1)"></span>
      </div>
    </div>
  </div>
  
</template>
<script>
export default {
  name: "VideoItem",
  props: ["title", "voteProp", "thumb", "desc"],
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
    }
  }
};
</script>

<style scoped>
.video-item {
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 15px;
  overflow: hidden;
  display: inline-block;
  -moz-column-break-before: always;
  -webkit-column-break-before: always;
  margin: 3px 0;
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