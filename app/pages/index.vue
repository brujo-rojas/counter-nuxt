<template>
  <div class="items-header">
    <h1>Lista de Items</h1>
    <div class="header-info">
      <button
        @click="openDialog"
        :disabled="allItems.length >= LIMITS.MAX_ITEMS"
        class="add-btn"
      >
        Agregar Item
      </button>
    </div>
  </div>

  <div class="items-list">
    <div v-for="item in items" :key="item.id" class="item">
      <div class="item-header">
        <h3 class="item-title">{{ item.title }}</h3>

        <div class="counter-controls">
          <button @click="decrementItem(item.id)" class="decrement-btn">
            -1
          </button>
          <span>
            {{ item.value }}
          </span>
          <button @click="incrementItem(item.id)" class="increment-btn">
            +1
          </button>
        </div>

        <div class="item-actions">
          <button @click="removeItem(item.id)" class="delete-btn">
            Eliminar
          </button>
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
import { LIMITS } from "../../constants/limits";
import { useFilteredItems } from "../composables/useFilteredItems";
import ItemDialog from "../components/ItemDialog.vue";

const { allItems, filteredItems } = useFilteredItems();

const editMode = ref(false);
const editingItemId = ref(null);
const showDialog = ref(false);
const dialogItem = ref(null);

const items = filteredItems;

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
};

const handleSave = (itemData) => {
  if (editMode.value) {
    store.dispatch("updateItem", {
      id: editingItemId.value,
      ...itemData,
    });
  } else {
    store.dispatch("addItem", itemData);
  }
  closeDialog();
};

const editItem = (item) => {
  editMode.value = true;
  editingItemId.value = item.id;
  dialogItem.value = { title: item.title, value: item.value };
  showDialog.value = true;
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