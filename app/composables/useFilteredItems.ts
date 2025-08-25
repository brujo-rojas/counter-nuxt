import { computed } from "vue";
import store from "../../stores/index";
import filtersStore from "../../stores/filters";

export const useFilteredItems = () => {
  const allItems = computed(() => store.state.items);
  
  const filteredItems = computed(() => {
    let result = allItems.value;
    
    if (filtersStore.state.searchText) {
      const search = filtersStore.state.searchText.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(search)
      );
    }
    
    if (filtersStore.state.filters.minValue > 0) {
      result = result.filter(item => 
        item.value >= filtersStore.state.filters.minValue
      );
    }
    
    if (filtersStore.state.filters.maxValue > 0) {
      result = result.filter(item => 
        item.value <= filtersStore.state.filters.maxValue
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
  
  const filteredTotal = computed(() => 
    filteredItems.value.reduce((total, item) => total + item.value, 0)
  );
  
  const totalItems = computed(() => store.getters.getTotalValue);
  
  return {
    allItems,
    filteredItems,
    filteredTotal,
    totalItems,
  };
};
