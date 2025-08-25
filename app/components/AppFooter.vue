<template>
  <footer>
    <div class="footer-content">
      <div>Total General: {{ totalItems }}</div>
      <div>Total Filtrado: {{ filteredTotal }}</div>
    </div>
  </footer>
</template>

<script setup>
import { useFilteredItems } from "../composables/useFilteredItems";

const { totalItems, filteredTotal } = useFilteredItems();
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

.footer-content {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.footer-content div {
  font-size: 14px;
}
</style>
