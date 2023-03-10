const STORAGE_KEY = 'search-list'
const HISTIRT_MAX = 10
export default {
  namespaced: true,
  state: () => {
    return {
      searchData: uni.getStorageSync(STORAGE_KEY) || []
    }
  },
  mutations: {
    saveToStorage(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.searchData
      })
    },
    addSearchData(state, val) {
      if (!val) return
      const index = state.searchData.findIndex((item) => item === val);
      if (index !== -1) {
        state.searchData.splice(index, 1);
      }
      state.searchData.unshift(val);

      if (state.searchData.length > HISTIRT_MAX) {
        state.searchData.splice(HISTIRT_MAX, state.searchData.length - HISTIRT_MAX)
      }

      this.commit('search/saveToStorage')
    },
    removeSearchData(state, index) {
      state.searchData.splice(index, 1);
      this.commit('search/saveToStorage')
    },
    removeAllSearchData(state) {
      state.searchData = [];
      this.commit('search/saveToStorage')
    }
  }
}
