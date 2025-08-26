import { createStore } from "vuex";
import type { Item } from "~/types/items";
import { LIMITS } from "../constants/limits";

interface State {
  items: Item[];
}

const loadFromStorage = (): Item[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("counter-items");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const saveToStorage = (items: Item[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("counter-items", JSON.stringify(items));
  }
};

const store = createStore<State>({
  state: (): State => ({
    items: loadFromStorage(),
  }),

  mutations: {
    ADD_ITEM(state: State, newItem: Omit<Item, "id">) {
      if (state.items.length >= LIMITS.MAX_ITEMS) {
        throw new Error(`No se pueden agregar más de ${LIMITS.MAX_ITEMS} items`);
      }
      
      state.items.push({
        id: Date.now(),
        ...newItem,
      });
      saveToStorage(state.items);
    },

    UPDATE_ITEM(state: State, updatedItem: Item) {
      const index = state.items.findIndex(
        (item: Item) => item.id === updatedItem.id
      );
      if (index !== -1) {
        state.items.splice(index, 1, updatedItem);
        saveToStorage(state.items);
      }
    },

    DELETE_ITEM(state: State, itemId: number) {
      state.items = state.items.filter((item: Item) => item.id !== itemId);
      saveToStorage(state.items);
    },
  },

  actions: {
    addItem({ commit }: any, newItem: Omit<Item, "id">) {
      commit("ADD_ITEM", newItem);
    },

    updateItem({ commit }: any, updatedItem: Item) {
      commit("UPDATE_ITEM", updatedItem);
    },

    deleteItem({ commit }: any, itemId: number) {
      commit("DELETE_ITEM", itemId);
    },
  },

  getters: {
    getItemById: (state: State) => (id: number) => {
      return state.items.find((item: Item) => item.id === id);
    },

    getAllItems: (state: State) => {
      return state.items;
    },

    getTotalValue: (state: State) => {
      return state.items.reduce(
        (total: number, item: Item) => total + item.value,
        0
      );
    },

    canAddMoreItems: (state: State) => {
      return state.items.length < LIMITS.MAX_ITEMS;
    },

    getItemsCount: (state: State) => {
      return state.items.length;
    },

    getMaxItems: () => {
      return LIMITS.MAX_ITEMS;
    },
  },
});

export default store;
