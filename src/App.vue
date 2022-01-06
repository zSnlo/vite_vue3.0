
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import {Login,About} from '@/config/api'

// Login.login({add:'123456'}).then(res=>{
//   console.log(res)
// }).finally(err=>{
//   console.log(err)
// })

const color='red'
let fontSize='20px'
let fontSizes=20
import { ref } from 'vue'

const count = ref(0)
let fontSizess = ref(fontSizes)
function setFont(){
  this.count++;
  this.fontSizess++

  document.getElementById('app').className='theme'+this.count

  window.document.documentElement.setAttribute('data-size', this.count)

  // document.body.style.setProperty('--themeColor','#ff6050')
  // document.body.style.setProperty('--themeFontSize','20px')
}

</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <button @click="setFont()">{{ count }}</button>
  <p>
    <router-link to="/" class="red">Go to Home</router-link>
    <router-link to="/about" class="abouts">Go to About</router-link>
  </p>
  <router-view></router-view>
</template>

<style lang='less'>
  // 引入全局样式
  @import url(./global.less);

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
  .add-size()
}
// 样式表中可以直接使用变量
.abouts{
  color: @fontColor;

  // setup函数中的变量  在style样式中可以使用 v-bind 引用
  // font-size: v-bind(fontSize);


  // 借助style setProperty 实现动态变化
  // color: var(--themeColor);
  // font-size: var(--themeFontSize);

}


</style>
