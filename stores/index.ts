import { createStore } from 'vuex'
import type { Item } from "~/types/items";

interface State {
  items: Item[];
}

const store = createStore<State>({
  state: (): State => ({
    items: [
      { id: 1, title: "Item 1", value: 10 },
      { id: 2, title: "Item 2", value: 20 },
      { id: 3, title: "Item 3", value: 30 },
    ],
  }),

  mutations: {
    ADD_ITEM(state: State, newItem: Omit<Item, "id">) {
      state.items.push({
        id: Date.now(),
        ...newItem,
      });
    },

    UPDATE_ITEM(state: State, updatedItem: Item) {
      const index = state.items.findIndex(
        (item: Item) => item.id === updatedItem.id
      );
      if (index !== -1) {
        state.items.splice(index, 1, updatedItem);
      }
    },

    DELETE_ITEM(state: State, itemId: number) {
      state.items = state.items.filter((item: Item) => item.id !== itemId);
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
  },
});

export default store;
