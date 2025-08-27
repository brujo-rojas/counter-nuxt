<template>
  <div class="items-header">
    <h1>Lista de Items</h1>
    <div class="header-info">
      <span class="items-count"
        >{{ allItems.length }}/{{ LIMITS.MAX_ITEMS }} items</span
      >
      <button
        @click="openDialog"
        :disabled="allItems.length >= LIMITS.MAX_ITEMS"
        class="add-btn"
      >
        <Icon name="heroicons:plus" />
        Agregar Item
      </button>
    </div>
  </div>

  <div v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </div>

  <div class="sort-controls">
    <div class="sort-group">
      <label>Ordenar por:</label>
      <select v-model="sortBy" @change="updateSortBy" class="sort-select">
        <option value="">-</option>
        <option value="title">Título</option>
        <option value="value">Valor</option>
      </select>
    </div>

    <div class="sort-group">
      <label class="sort-checkbox">
        <input v-model="ascending" @change="updateAscending" type="checkbox" />
        Ascendente
      </label>
    </div>
  </div>

  <div class="items-list">
    <div v-for="item in filteredItems" :key="item.id" class="item">
      <div class="item-header">
        <h3 class="item-title">{{ item.title }}</h3>

        <div class="item-controls">
          <div class="counter-controls">
            <button @click="decrementItem(item.id)" class="decrement-btn">
              <Icon name="heroicons:minus" />
            </button>
            <span class="counter-value">
              {{ item.value }}
            </span>
            <button @click="incrementItem(item.id)" class="increment-btn">
              <Icon name="heroicons:plus" />
            </button>
          </div>

          <div class="item-actions">
            <button @click="removeItem(item.id)" class="delete-btn">
              <Icon name="heroicons:trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ItemDialog
    :show="showDialog"
    :item="dialogItem"
    :is-edit="editMode"
    :max-items-reached="allItems.length >= LIMITS.MAX_ITEMS"
    @close="closeDialog"
    @save="handleSave"
  />
</template>

<script setup>
import { ref } from "vue";
import store from "../../stores/index";
import filtersStore from "../../stores/filters";
import { LIMITS } from "../../constants/limits";
import { useFilteredItems } from "../../composables/useFilteredItems";
import ItemDialog from "../components/ItemDialog.vue";

const { allItems, filteredItems } = useFilteredItems();

const sortBy = ref(filtersStore.state.sortBy);
const ascending = ref(filtersStore.state.ascending);

const editMode = ref(false);
const editingItemId = ref(null);
const showDialog = ref(false);
const dialogItem = ref(null);
const errorMessage = ref("");

const updateSortBy = () => {
  filtersStore.dispatch("setSortBy", sortBy.value);
};

const updateAscending = () => {
  filtersStore.dispatch("setAscending", ascending.value);
};

const openDialog = () => {
  editMode.value = false;
  editingItemId.value = null;
  dialogItem.value = null;
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editMode.value = false;
  editingItemId.value = null;
  dialogItem.value = null;
  errorMessage.value = "";
};

const handleSave = (itemData) => {
  try {
    errorMessage.value = "";

    if (editMode.value) {
      store.dispatch("updateItem", {
        id: editingItemId.value,
        ...itemData,
      });
    } else {
      store.dispatch("addItem", itemData);
    }
    closeDialog();
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const removeItem = (id) => {
  store.dispatch("deleteItem", id);
};

const incrementItem = (id) => {
  const item = allItems.value.find((item) => item.id === id);
  if (item && item.value < LIMITS.MAX_ITEM_VALUE) {
    store.dispatch("updateItem", {
      id: item.id,
      title: item.title,
      value: item.value + 1,
    });
  }
};

const decrementItem = (id) => {
  const item = allItems.value.find((item) => item.id === id);
  if (item && item.value > LIMITS.MIN_ITEM_VALUE) {
    store.dispatch("updateItem", {
      id: item.id,
      title: item.title,
      value: item.value - 1,
    });
  }
};
</script>