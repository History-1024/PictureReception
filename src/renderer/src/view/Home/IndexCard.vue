<script setup lang="ts">
defineOptions({
  name: 'IndexCard'
})
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="rect_container_qipao">
    <div class="h_c_rect_container">
      <div class="h_c_rect_c_middler">
        <div class="h_c_rect_c_item">
          <div class="border_six_one"></div>
          <div class="border_six_two"></div>
          <div class="rect_text">
            <div class="title">
              {{ props.title }}
            </div>
            <div class="value">{{ props.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="IndexCard">

  </div> -->
</template>

<style lang="scss" scoped>
.rect_container_qipao {
  margin: 40px auto;
  transform: rotateZ(270deg);
}

.rect_container_qipao,
.h_c_rect_container,
.h_c_rect_c_middler,
.h_c_rect_c_item,
.border_six_one,
.border_six_two {
  width: 250px;
  height: 200px;
}

.h_c_rect_container,
.h_c_rect_c_middler,
.h_c_rect_c_item {
  overflow: hidden;
}

/* 这里的高度需要降低一些，让边框可以看到 */
.border_six_one,
.border_six_two {
  height: 198px;
}

.h_c_rect_container,
.h_c_rect_c_middler {
  visibility: hidden;
}

.rect_container_qipao .h_c_rect_container {
  margin-left: 10px;
  float: left;
  transform: rotate(120deg);
}

.h_c_rect_container .h_c_rect_c_middler {
  transform: rotate(-60deg);
}

.h_c_rect_c_item,
.border_six_one,
.border_six_two {
  box-shadow: 0px 0px 17px 2px rgba(51, 238, 63, 0.6) inset;
  border: 1px solid rgba(51, 238, 63, 1);
}

.h_c_rect_c_item {
  position: relative;
  transform: rotate(-60deg);
  background: no-repeat 50% center;
  background-size: 125% auto;
  visibility: visible;
}

.border_six_one {
  position: absolute;
  left: 0;
  top: 0;
  transform: rotateZ(60deg);
}

.border_six_two {
  position: absolute;
  left: 0;
  top: -3px;
  transform: rotateZ(120deg);
}

.rect_text {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -20%;
  top: -14%;
  width: 200px;
  height: 250px;
  transform: rotateZ(90deg);
  text-align: center;
  cursor: pointer;
  .title {
    font-size: 20px;
    color: #999999;
    margin-bottom: 10px;
  }
  .value {
    font-size: 32px;
    color: #ffffff;
  }
}
.IndexCard {
  width: 100%;
  height: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: var(--el-bg-color);

  .title {
    text-align: center;
    height: 30%;
    width: 100%;
    padding-top: 16px;
    font-size: 18px;
    color: gray;
    border-bottom: 2px solid var(--el-border-color);
  }
  .value {
    font-size: 30px;
    margin-top: 15%;
  }
}
</style>
