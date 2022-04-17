import { defineStore, StoreDefinition, DefineStoreOptions } from 'pinia';
import { Buffer } from 'buffer';

export enum LoginType {
  custom,
  oauth,
}
type State = {
  accessToken: string | null
  uuid: string | null
  name: string | null
  loginType: LoginType | null
  isVerify: boolean
  isInit: boolean
}
type Getter = {
  isLogin: () => boolean
}
type Action = {
  login: (accessToken: string) => void
  logout: () => void
}
type Options = DefineStoreOptions<string, State, Getter, Action>

const options: Options = {
  id: 'auth',

  state: () => ({
    accessToken: null,
    uuid: null,
    name: null,
    loginType: null,
    isVerify: false,
    isInit: false,
  }),

  getters: {
    isLogin() {
      return this.accessToken !== null;
    },
  },

  actions: {
    login(accessToken: string) {
      this.accessToken = accessToken;
      const {
        uuid, name, loginType, isVerify,
      } = JSON.parse(
        Buffer.from(accessToken.split('.')[1], 'base64').toString('utf8'),
      );
      this.uuid = uuid;
      this.name = name;
      this.loginType = loginType;
      this.isVerify = isVerify;
    },
    logout() {
      this.accessToken = null;
      this.uuid = null;
      this.name = null;
      this.loginType = null;
      this.isVerify = false;
    },
  },
};

export type AuthStore = State & { isLogin: boolean } & Action;
export const useAuthStore: StoreDefinition = defineStore(options);
