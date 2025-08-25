<template>
  <div>
    <h2>Lista de Items (Vuex Store)</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <span>{{ item.title }} - {{ item.value }}</span>
        <div>
          <button @click="editItem(item)" class="edit-btn">Editar</button>
          <button @click="removeItem(item.id)" class="delete-btn">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
    <div class="total">Total: {{ totalValue }}</div>
    
    <!-- Botón para abrir el diálogo -->
    <button @click="openDialog" class="open-dialog-btn">
      ➕ Agregar Nuevo Item
    </button>

    <!-- Diálogo Modal -->
    <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <div class="dialog-header">
          <h3>{{ editMode ? "Editar Item" : "Agregar Nuevo Item" }}</h3>
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
          <button @click="editMode ? saveEdit() : addItem()" class="save-btn">
            {{ editMode ? "Guardar Cambios" : "Agregar Item" }}
          </button>
          <button @click="closeDialog" class="cancel-btn">Cancelar</button>
        </div>
      </div>
    </div>
    
    <!-- Información del store de Vuex -->
    <div class="store-info">
      <h4>🔄 Estado de Vuex:</h4>
      <p>Items en store: {{ items.length }}</p>
      <p>Usando getters: {{ store.getters.getAllItems.length }} items</p>
      <p>Total calculado por Vuex: {{ totalValue }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import store from "../../stores/index";

// Obtener items desde el store de Vuex
const items = computed(() => store.state.items);
const totalValue = computed(() => store.getters.getTotalValue);

// Nuevo item
const newItem = ref({
  title: "",
  value: 0,
});

// Estado para modo de edición
const editMode = ref(false);
const editingItemId = ref(null);

// Estado para controlar el diálogo
const showDialog = ref(false);

// Acciones que usan Vuex

const removeItem = (id) => {
  // Usar acción de Vuex en lugar de mutación directa
  store.dispatch("deleteItem", id);
};

// Función adicional para actualizar un item (ejemplo de uso completo de Vuex)
const updateItem = (id, updates) => {
  const item = store.getters.getItemById(id);
  if (item) {
    store.dispatch("updateItem", { ...item, ...updates });
  }
};

// Funciones para el modo de edición
const editItem = (item) => {
  editMode.value = true;
  editingItemId.value = item.id;
  newItem.value = { title: item.title, value: item.value };
  showDialog.value = true; // Abrir diálogo al editar
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

const cancelEdit = () => {
  editMode.value = false;
  editingItemId.value = null;
  newItem.value = { title: "", value: 0 };
  showDialog.value = false;
};

// Funciones para controlar el diálogo
const openDialog = () => {
  editMode.value = false;
  editingItemId.value = null;
  newItem.value = { title: "", value: 0 };
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  cancelEdit();
};

// Actualizar addItem para cerrar el diálogo
const addItem = () => {
  if (newItem.value.title && newItem.value.value > 0) {
    store.dispatch("addItem", { ...newItem.value });
    closeDialog();
  }
};
</script>

<style>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 8px 0;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
}

li span {
  font-weight: 500;
}

button {
  margin-left: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
}

.edit-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #da190b;
}

.save-btn {
  background-color: #2196f3;
  color: white;
}

.save-btn:hover {
  background-color: #0b7dda;
}

.cancel-btn {
  background-color: #ff9800;
  color: white;
}

.cancel-btn:hover {
  background-color: #e68900;
}

input {
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.total {
  font-size: 1.2em;
  font-weight: bold;
  margin: 16px 0;
  padding: 12px;
  background: #e3f2fd;
  border-radius: 6px;
  color: #1976d2;
}

.form-section {
  margin: 20px 0;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f5f5f5;
}

.store-info {
  margin-top: 20px;
  padding: 12px;
  background: #e8f5e8;
  border-radius: 6px;
  border-left: 4px solid #4caf50;
}

.store-info h4 {
  margin: 0 0 8px 0;
  color: #2e7d32;
}

.store-info p {
  margin: 4px 0;
  color: #388e3c;
}

/* Estilos para el botón de abrir diálogo */
.open-dialog-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.open-dialog-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Estilos para el diálogo modal */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.dialog-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: dialogAppear 0.3s ease-out;
}

@keyframes dialogAppear {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.dialog-header h3 {
  margin: 0;
  font-size: 1.4em;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.dialog-body {
  padding: 24px;
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

.dialog-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.dialog-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.dialog-footer button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.dialog-footer .save-btn:hover {
  background-color: #0b7dda;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
}

.dialog-footer .cancel-btn:hover {
  background-color: #e68900;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
}

/* Mejorar animaciones del overlay */
.dialog-overlay {
  animation: overlayFadeIn 0.3s ease-out;
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive design para el diálogo */
@media (max-width: 768px) {
  .dialog-content {
    width: 95%;
    margin: 10px;
  }
  
  .dialog-body {
    padding: 16px;
  }
  
  .dialog-footer {
    flex-direction: column;
    gap: 8px;
  }
  
  .dialog-footer button {
    width: 100%;
  }
}
</style>
