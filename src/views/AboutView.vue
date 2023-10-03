<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="connectFtp()"></button>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import * as ftp from 'ftp';

export default defineComponent({
    setup() {
        
    },
    async connectFtp() {
    }
})
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
