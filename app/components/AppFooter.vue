<template>
  <footer>
    <div class="footer-content">
      <div>Total General: {{ totalItems }}</div>
      <div>Total Filtrado: {{ filteredTotal }}</div>
    </div>
  </footer>
</template>

<script setup>
import { useFilteredItems } from "../../composables/useFilteredItems";
const { totalItems, filteredTotal } = useFilteredItems();
</script>
