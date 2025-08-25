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

  <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
    <div class="dialog-content" @click.stop>
      <div class="dialog-header">
        <h3>{{ editMode ? "Editar Item" : "Agregar Item" }}</h3>
        <button @click="closeDialog" class="close-btn">✕</button>
      </div>

      <div class="dialog-body">
        <div class="input-group">
          <label for="title">Título:</label>
          <input
            id="title"
            v-model="newItem.title"
            placeholder="Ingresa el título"
            class="dialog-input"
          />
        </div>

        <div class="input-group">
          <label for="value">Valor (máx {{ LIMITS.MAX_ITEM_VALUE }}):</label>
          <input
            id="value"
            v-model.number="newItem.value"
            type="number"
            :min="LIMITS.MIN_ITEM_VALUE"
            :max="LIMITS.MAX_ITEM_VALUE"
            placeholder="Ingresa el valor"
            class="dialog-input"
          />
        </div>

        <div v-if="validationError" class="error-message">
          {{ validationError }}
        </div>
      </div>

      <div class="dialog-footer">
        <div class="dialog-actions">
          <button @click="editMode ? saveEdit() : addItem()" class="save-btn">
            {{ editMode ? "Guardar" : "Agregar" }}
          </button>
          <button @click="closeDialog" class="cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import store from "../../stores/index";
import filtersStore from "../../stores/filters";
import { LIMITS } from "../../constants/limits";

const newItem = ref({ title: "", value: 0 });
const editMode = ref(false);
const editingItemId = ref(null);
const showDialog = ref(false);
const validationError = ref("");

const allItems = computed(() => store.state.items);

const items = computed(() => {
  let result = allItems.value;

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

  if (filtersStore.state.sortBy) {
    result = [...result].sort((a, b) => {
      const field = filtersStore.state.sortBy;
      const aVal = field === "value" ? a[field] : a[field].toLowerCase();
      const bVal = field === "value" ? b[field] : b[field].toLowerCase();

      let comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return filtersStore.state.ascending ? comparison : -comparison;
    });
  }

  return result;
});

const totalValue = computed(() => store.getters.getTotalValue);

const validateItem = () => {
  validationError.value = "";

  if (!newItem.value.title.trim()) {
    validationError.value = "El título es requerido";
    return false;
  }

  if (newItem.value.value < LIMITS.MIN_ITEM_VALUE) {
    validationError.value = `El valor mínimo es ${LIMITS.MIN_ITEM_VALUE}`;
    return false;
  }

  if (newItem.value.value > LIMITS.MAX_ITEM_VALUE) {
    validationError.value = `El valor máximo es ${LIMITS.MAX_ITEM_VALUE}`;
    return false;
  }

  if (!editMode.value && allItems.value.length >= LIMITS.MAX_ITEMS) {
    validationError.value = `Máximo ${LIMITS.MAX_ITEMS} items permitidos`;
    return false;
  }

  return true;
};

const openDialog = () => {
  editMode.value = false;
  editingItemId.value = null;
  newItem.value = { title: "", value: 0 };
  validationError.value = "";
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editMode.value = false;
  editingItemId.value = null;
  newItem.value = { title: "", value: 0 };
  validationError.value = "";
};

const addItem = () => {
  if (validateItem()) {
    store.dispatch("addItem", { ...newItem.value });
    closeDialog();
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