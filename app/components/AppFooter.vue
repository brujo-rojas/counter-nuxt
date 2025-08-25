<template>
  <footer>
    <div class="footer-content">
      <div>Total General: {{ totalValue }}</div>
      <div>Total Filtrado: {{ filteredTotalValue }}</div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import store from "../stores/index";
import filtersStore from "../stores/filters";

const totalValue = computed(() => store.getters.getTotalValue);

const filteredTotalValue = computed(() => {
  let result = store.state.items;

  if (filtersStore.state.searchText) {
    const search = filtersStore.state.searchText.toLowerCase();
    result = result.filter((item) => item.title.toLowerCase().includes(search));
  }

  if (filtersStore.state.filters.minValue > 0) {
    result = result.filter(
      (item) => item.value >= filtersStore.state.filters.minValue
    );
  }

  if (filtersStore.state.filters.maxValue > 0) {
    result = result.filter(
      (item) => item.value <= filtersStore.state.filters.maxValue
    );
  }

  return result.reduce((total, item) => total + item.value, 0);
});
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
