<template>
 <div>
   <DragSelector
       :live-selection="liveSelection"
       :disable="false"
       @selection-change="onChangeSelectionEv"
       class="container">
     <div class="grid">
       <div
           v-for="item in 100"
           :key="item"
           data-selectable
           :data-id="item"
           class="item"
           :class="{ selected: selectedItems.includes(String(item)) }"
       >
         {{ item }}
       </div>
     </div>
   </DragSelector>
 </div>
</template>

<script setup>
import { ref } from 'vue'
import {DragSelector} from '../index.js'

const selectedItems = ref([])

const liveSelection = ref(false)

const onChangeSelectionEv = (v)=>{
  selectedItems.value = v.map(dataset=>dataset.id)
}
</script>

<style>


.container {
  height: 500px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background-color:#fff;
}

.grid {
  width: 2000px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 10px;
  padding: 15px;
}

.item {
  padding: 30px;
  text-align: center;
  font-weight: bold;
  user-select: none;
  color: #262626;
  background: #F8F8F8;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
}

.selected {
  background: #E7000A;
  color:white;
}
</style>