
<template>
  <div class="ribbon">
    <a href="https://github.com/JamshidDev/vue3-drag-selector">Fork me on GitHub</a>
  </div>
</template>

<style scoped>
.ribbon {
  position: fixed;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  overflow: hidden;
  z-index: 999;
  pointer-events: none;
}

.ribbon a {
  position: absolute;
  top: 32px;
  left: -35px;
  width: 170px;
  padding: 6px 0;
  background: linear-gradient(135deg, #2d3436 0%, #636e72 100%);
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  font-size: 10px;
  font-weight: 600;
  font-family: system-ui, sans-serif;
  letter-spacing: 0.3px;
  transform: rotate(-45deg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  pointer-events: auto;
  transition: all 0.3s ease;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}

.ribbon a::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.ribbon a:hover {
  background: linear-gradient(135deg, #636e72 0%, #2d3436 100%);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.18);
}

.ribbon a:hover::before {
  transform: translateX(100%);
}

.ribbon a::after {
  content: '→';
  margin-left: 6px;
  opacity: 0;
  transition: opacity 0.3s, margin-left 0.3s;
}

.ribbon a:hover::after {
  opacity: 1;
  margin-left: 8px;
}
</style>
<script setup lang="ts">
</script>