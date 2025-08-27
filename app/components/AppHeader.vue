<template>
  <header>
    <div class="content">
      <div class="filters">
        <h3 class="filters-title">Filtros</h3>
        <div class="row">
          <div class="left-filters">
            <div class="group">
              <label>
                <Icon name="heroicons:magnifying-glass" />
              </label>
              <input
                v-model="searchText"
                @input="updateSearchText"
                placeholder="Buscar"
                class="input"
              />
            </div>
          </div>

          <div class="right-filters">
            <div class="group">
              <label>
                <Icon name="heroicons:funnel" />
                Min:
              </label>
              <input
                v-model.number="minValue"
                @input="updateMinValue"
                type="number"
                class="input small"
              />
            </div>

            <div class="group">
              <label>
                <Icon name="heroicons:funnel" />
                Max:
              </label>
              <input
                v-model.number="maxValue"
                @input="updateMaxValue"
                type="number"
                class="input small"
              />
            </div>

            <button @click="resetFilters" class="reset">
              <Icon name="heroicons:arrow-path" />
              Reset ({{ activeFiltersCount }})
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import filtersStore from "../stores/filters";

const searchText = ref(filtersStore.state.searchText);
const minValue = ref(filtersStore.state.filters.minValue);
const maxValue = ref(filtersStore.state.filters.maxValue);

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
  searchText.value = "";
  minValue.value = 0;
  maxValue.value = 0;
};
</script>
