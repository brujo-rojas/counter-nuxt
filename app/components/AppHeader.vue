<template>
  <header>
    <div class="content">
      <div class="filters">
        <div class="row">
          <div class="group">
            <label>Buscar:</label>
            <input
              v-model="searchText"
              @input="updateSearchText"
              placeholder="Buscar items..."
              class="input"
            />
          </div>

          <div class="group">
            <label>Min:</label>
            <input
              v-model.number="minValue"
              @input="updateMinValue"
              type="number"
              class="input small"
            />
          </div>

          <div class="group">
            <label>Max:</label>
            <input
              v-model.number="maxValue"
              @input="updateMaxValue"
              type="number"
              class="input small"
            />
          </div>

          <button @click="resetFilters" class="reset">
            Reset ({{ activeFiltersCount }})
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import filtersStore from "../stores/filters";

// Reactive refs for form inputs
const searchText = ref(filtersStore.state.searchText);
const minValue = ref(filtersStore.state.filters.minValue);
const maxValue = ref(filtersStore.state.filters.maxValue);

// Computed
const activeFiltersCount = computed(
  () => filtersStore.getters.getActiveFiltersCount
);

// Methods to update store
const updateSearchText = () => {
  filtersStore.dispatch("setSearchText", searchText.value);
};

const updateMinValue = () => {
  filtersStore.dispatch("setMinValue", minValue.value || 0);
};

const updateMaxValue = () => {
  filtersStore.dispatch("setMaxValue", maxValue.value || 0);
};

const resetFilters = () => {
  filtersStore.dispatch("resetFilters");
  // Reset local refs
  searchText.value = "";
  minValue.value = 0;
  maxValue.value = 0;
};
</script>
