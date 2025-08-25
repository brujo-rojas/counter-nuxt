import { createStore } from "vuex";

interface FilterState {
  filters: {
    minValue: number;
    maxValue: number;
  };
  searchText: string;
  sortBy: string;
  ascending: boolean;
}

// SessionStorage helpers
const loadFiltersFromStorage = (): FilterState => {
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("counter-filters");
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return {
    filters: {
      minValue: 0,
      maxValue: 0,
    },
    searchText: "",
    sortBy: "",
    ascending: false,
  };
};

const saveFiltersToStorage = (state: FilterState) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("counter-filters", JSON.stringify(state));
  }
};

const filtersStore = createStore<FilterState>({
  state: (): FilterState => loadFiltersFromStorage(),

  mutations: {
    SET_MIN_VALUE(state: FilterState, value: number) {
      state.filters.minValue = value;
      saveFiltersToStorage(state);
    },

    SET_MAX_VALUE(state: FilterState, value: number) {
      state.filters.maxValue = value;
      saveFiltersToStorage(state);
    },

    SET_SEARCH_TEXT(state: FilterState, text: string) {
      state.searchText = text;
      saveFiltersToStorage(state);
    },

    SET_SORT_BY(state: FilterState, sortBy: string) {
      state.sortBy = sortBy;
      saveFiltersToStorage(state);
    },

    SET_ASCENDING(state: FilterState, ascending: boolean) {
      state.ascending = ascending;
      saveFiltersToStorage(state);
    },

    RESET_FILTERS(state: FilterState) {
      state.filters.minValue = 0;
      state.filters.maxValue = 0;
      state.searchText = "";
      state.sortBy = "";
      state.ascending = false;
      saveFiltersToStorage(state);
    },
  },

  actions: {
    setMinValue({ commit }: any, value: number) {
      commit("SET_MIN_VALUE", value);
    },

    setMaxValue({ commit }: any, value: number) {
      commit("SET_MAX_VALUE", value);
    },

    setSearchText({ commit }: any, text: string) {
      commit("SET_SEARCH_TEXT", text);
    },

    setSortBy({ commit }: any, sortBy: string) {
      commit("SET_SORT_BY", sortBy);
    },

    setAscending({ commit }: any, ascending: boolean) {
      commit("SET_ASCENDING", ascending);
    },

    resetFilters({ commit }: any) {
      commit("RESET_FILTERS");
    },
  },

  getters: {
    getFilters: (state: FilterState) => state.filters,
    getSearchText: (state: FilterState) => state.searchText,
    getSortBy: (state: FilterState) => state.sortBy,
    isAscending: (state: FilterState) => state.ascending,

    getActiveFiltersCount: (state: FilterState) => {
      let count = 0;
      if (state.filters.minValue > 0) count++;
      if (state.filters.maxValue > 0) count++;
      if (state.searchText.trim()) count++;
      if (state.sortBy) count++;
      return count;
    },
  },
});

export default filtersStore;
