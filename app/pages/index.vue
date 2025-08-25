<template>
  <div class="items-header">
    <h1>Lista de Items</h1>
    <button @click="openDialog" class="add-btn">Agregar Item</button>
  </div>

  <div class="items-list">
    <div v-for="item in items" :key="item.id" class="item">
      <div class="item-header">
        <h3 class="item-title">{{ item.title }}</h3>
        <div class="item-actions">
          <button @click="editItem(item)" class="edit-btn">Editar</button>
          <button @click="removeItem(item.id)" class="delete-btn">
            Eliminar
          </button>
        </div>
      </div>
      <p class="item-description">Valor: {{ item.value }}</p>
    </div>
  </div>

  <div class="total">Total: {{ totalValue }}</div>

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
          <label for="value">Valor:</label>
          <input
            id="value"
            v-model.number="newItem.value"
            type="number"
            placeholder="Ingresa el valor"
            class="dialog-input"
          />
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

  <div class="store-info">
    <h4>Estado de Vuex:</h4>
    <p>Items: {{ items.length }}</p>
    <p>Total: {{ totalValue }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import store from "../../stores/index";

const items = computed(() => store.state.items);
const totalValue = computed(() => store.getters.getTotalValue);

const newItem = ref({ title: "", value: 0 });
const editMode = ref(false);
const editingItemId = ref(null);
const showDialog = ref(false);

const removeItem = (id) => {
  store.dispatch("deleteItem", id);
};

const editItem = (item) => {
  editMode.value = true;
  editingItemId.value = item.id;
  newItem.value = { title: item.title, value: item.value };
  showDialog.value = true;
};

const saveEdit = () => {
  if (editingItemId.value && newItem.value.title && newItem.value.value > 0) {
    store.dispatch("updateItem", {
      id: editingItemId.value,
      title: newItem.value.title,
      value: newItem.value.value,
    });
    closeDialog();
  }
};

const openDialog = () => {
  editMode.value = false;
  editingItemId.value = null;
  newItem.value = { title: "", value: 0 };
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editMode.value = false;
  editingItemId.value = null;
  newItem.value = { title: "", value: 0 };
};

const addItem = () => {
  if (newItem.value.title && newItem.value.value > 0) {
    store.dispatch("addItem", { ...newItem.value });
    closeDialog();
  }
};
</script>