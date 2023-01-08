export default {
  namespaced: true,
  state: () => {
    return {
      searchData: []
    }
  },
  mutations: {
    addSearchData(state, val) {
      if (!val) return
      const index = state.searchData.findIndex((item) => item === val);
      if (index !== -1) {
        state.searchData.splice(index, 1);
      }
      state.searchData.unshift(val);
    },
    removeSearchData(state, index) {
      state.searchData.splice(index, 1);
    },
    removeAllSearchData(state) {
      state.searchData = [];
    }
  }
}
