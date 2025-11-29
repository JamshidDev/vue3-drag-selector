<template>
  <div class="apps">
    <UsageComponent/>

  </div>
</template>

<script setup>
import UsageComponent from "./UsageComponent.vue"
</script>

<style>
  body {
    padding: 0 !important;
    margin: 0 !important;
    width: 100%;
    min-height: 100vh;
    background:#F8FAFC;
  }


.apps {
  max-width:1260px;
  width: 100%;
  padding: 60px 10px;
  font-family: sans-serif;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

</style>