<template>
  <footer>
    <div>Total Counter: {{ totalValue }}</div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import store from "../stores/index";

const totalValue = computed(() => store.getters.getTotalValue);
</script>

<style scoped>
footer {
  background: #343a40;
  padding: 1rem;
  border-top: 1px solid #495057;
  text-align: center;
  margin-top: auto;
  color: #fff;
}
</style>
