<template>
  <div class="apps">
    <h1 style="color: #262626">Demo Vue3 Drag Selector</h1>
    <UsageComponent/>
    <Ribbon/>

  </div>
</template>

<script setup>
import UsageComponent from "./UsageComponent.vue"
import Ribbon from "./Ribbon.vue"


</script>

<style>
  body {
    padding: 0 !important;
    margin: 0 !important;
    width: 100%;
    min-height: 100vh;
    background-image:
        linear-gradient(to right, #eeeeee 1px, transparent 1px),
        linear-gradient(to bottom, #eeeeee 1px, transparent 1px);
    background-size: 20px 20px;
  }



.apps {
  max-width:1284px;
  width: 100%;
  padding: 60px 40px;
  font-family: sans-serif;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  min-height: 100vh;
}

</style>