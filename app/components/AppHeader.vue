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

          <div class="group">
            <label>Orden:</label>
            <select v-model="sortBy" @change="updateSortBy" class="select">
              <option value="">-</option>
              <option value="title">Título</option>
              <option value="value">Valor</option>
            </select>
          </div>

          <div class="group">
            <label class="checkbox">
              <input
                v-model="ascending"
                @change="updateAscending"
                type="checkbox"
              />
              Asc
            </label>
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
const sortBy = ref(filtersStore.state.sortBy);
const ascending = ref(filtersStore.state.ascending);

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

const updateSortBy = () => {
  filtersStore.dispatch("setSortBy", sortBy.value);
};

const updateAscending = () => {
  filtersStore.dispatch("setAscending", ascending.value);
};

const resetFilters = () => {
  filtersStore.dispatch("resetFilters");
  // Reset local refs
  searchText.value = "";
  minValue.value = 0;
  maxValue.value = 0;
  sortBy.value = "";
  ascending.value = false;
};
</script>

<style scoped>
header {
  background: #343a40;
  padding: 1rem;
  border-bottom: 1px solid #495057;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin: 0 0 1rem 0;
  color: #fff;
  text-align: center;
}

.filters {
  background: rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: 6px;
}

.row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.group label {
  color: #fff;
  font-size: 14px;
  min-width: 50px;
}

.input {
  padding: 6px 8px;
  border: 1px solid #495057;
  border-radius: 4px;
  background: #fff;
  min-width: 120px;
}

.input.small {
  min-width: 60px;
}

.select {
  padding: 6px 8px;
  border: 1px solid #495057;
  border-radius: 4px;
  background: #fff;
  min-width: 100px;
}

.checkbox {
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.reset {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: auto;
}

.reset:hover {
  background: #5a6268;
}
</style>
