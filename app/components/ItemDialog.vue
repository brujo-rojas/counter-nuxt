<template>
  <Transition name="dialog" appear>
    <div v-if="show" class="dialog-overlay" @click="$emit('close')">
      <Transition name="dialog-content" appear>
        <div class="dialog-content" @click.stop>
          <div class="dialog-header">
            <h3>{{ title }}</h3>
            <button @click="$emit('close')" class="close-btn">✕</button>
          </div>

          <div class="dialog-body">
            <div class="input-group">
              <label for="item-title">
                Título (máx {{ LIMITS.MAX_TITLE_LENGTH }} caracteres):
              </label>
              <input
                id="item-title"
                v-model="localItem.title"
                :maxlength="LIMITS.MAX_TITLE_LENGTH"
                placeholder="Ingresa el título"
                class="dialog-input"
                @keyup.enter="handleSave"
              />
              <div class="character-count">
                {{ localItem.title.length }}/{{ LIMITS.MAX_TITLE_LENGTH }}
              </div>
            </div>

            <div class="input-group">
              <label for="item-value">
                Valor (máx {{ LIMITS.MAX_ITEM_VALUE }}):
              </label>
              <input
                id="item-value"
                v-model.number="localItem.value"
                type="number"
                :min="LIMITS.MIN_ITEM_VALUE"
                :max="LIMITS.MAX_ITEM_VALUE"
                placeholder="Ingresa el valor"
                class="dialog-input"
                @keyup.enter="handleSave"
              />
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>
          </div>

          <div class="dialog-footer">
            <div class="dialog-actions">
              <button @click="handleSave" class="save-btn">
                {{ saveButtonText }}
              </button>
              <button @click="$emit('close')" class="cancel-btn">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { LIMITS } from "../../constants/limits";

const props = defineProps({
  show: Boolean,
  item: Object,
  isEdit: Boolean,
  maxItemsReached: Boolean,
});

const emit = defineEmits(["close", "save"]);

const localItem = ref({ title: "", value: 0 });
const error = ref("");

const title = computed(() => (props.isEdit ? "Editar Item" : "Agregar Item"));

const saveButtonText = computed(() => (props.isEdit ? "Guardar" : "Agregar"));

watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      localItem.value = { ...newItem };
    } else {
      localItem.value = { title: "", value: 0 };
    }
    error.value = "";
  },
  { immediate: true }
);

watch(
  () => props.show,
  (isShowing) => {
    if (!isShowing) {
      error.value = "";
    }
  }
);

const validateItem = () => {
  error.value = "";

  if (!localItem.value.title.trim()) {
    error.value = "El título es requerido";
    return false;
  }

  if (localItem.value.title.length > LIMITS.MAX_TITLE_LENGTH) {
    error.value = `El título no puede exceder ${LIMITS.MAX_TITLE_LENGTH} caracteres`;
    return false;
  }

  if (localItem.value.value < LIMITS.MIN_ITEM_VALUE) {
    error.value = `El valor mínimo es ${LIMITS.MIN_ITEM_VALUE}`;
    return false;
  }

  if (localItem.value.value > LIMITS.MAX_ITEM_VALUE) {
    error.value = `El valor máximo es ${LIMITS.MAX_ITEM_VALUE}`;
    return false;
  }

  if (!props.isEdit && props.maxItemsReached) {
    error.value = `Máximo ${LIMITS.MAX_ITEMS} items permitidos`;
    return false;
  }

  return true;
};

const handleSave = () => {
  if (validateItem()) {
    emit("save", { ...localItem.value });
  }
};
</script>
