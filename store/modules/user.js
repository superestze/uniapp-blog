import {
  login
} from 'api/user';

const STORAGE_KEY = 'user-info';
const TOKEN_KEY = 'token';

export default {
  namespaced: true,
  state: () => {
    return {
      // 用户 token
      token: uni.getStorageSync(TOKEN_KEY) || '',
      // 用户信息
      userInfo: uni.getStorageSync(STORAGE_KEY) || {}
    };
  },
  mutations: {
    /**
     * 删除用户信息
     */
    removeUserInfo(state) {
      state.userInfo = {};
      this.commit('user/saveUserInfo');
    },
    /**
     * 删除 token
     */
    removeToken(state) {
      state.token = '';
      this.commit('user/saveToken');
    },
    /**
     * 保存 token 到 vuex
     */
    setToken(state, token) {
      state.token = token;
      this.commit('user/saveToken');
    },
    /**
     * 保存 token 到 本地存储
     */
    saveToken(state) {
      uni.setStorage({
        key: TOKEN_KEY,
        data: state.token
      });
    },
    /**
     * 保存 用户信息 到 vuex
     */
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      this.commit('user/saveUserInfo');
    },
    /**
     * 保存 用户信息 到 本地存储
     */
    saveUserInfo(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.userInfo
      });
    }
  },
  actions: {
    /**
     * 退出登录
     */
    logout(context) {
      this.commit('user/removeToken');
      this.commit('user/removeUserInfo');
    },
    /**
     * 完成登录
     */
    async login(context, userProfile) {
      console.log('用户profile:::', userProfile);
      // 用户数据
      const rawData = userProfile.userInfo;
      // 调用登录接口
      const {
        data: res
      } = await login({
        signature: userProfile.signature,
        iv: userProfile.iv,
        nickName: rawData.nickName,
        gender: rawData.gender,
        city: rawData.city,
        province: rawData.province,
        avatarUrl: rawData.avatarUrl
      });
      // TODO: 登录逻辑
      console.log('用户登录成功:::', res);
      this.commit('user/setToken', res.token);
      this.commit('user/setUserInfo', JSON.parse(userProfile.rawData));
    }
  }
};
