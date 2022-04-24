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
  email: string | null
  loginType: LoginType | null
  isVerify: boolean
}
type Getter = {
  isLogin: () => boolean
}
type Action = {
  login: (accessToken: string) => void
  logout: () => void
}
type Options = DefineStoreOptions<string, State, Getter, Action>

const initState = {
  accessToken: null,
  uuid: null,
  name: null,
  email: null,
  loginType: null,
  isVerify: false,
};

const options: Options = {
  id: 'auth',

  state: () => ({ ...initState }),

  getters: {
    isLogin() {
      return this.accessToken !== null;
    },
  },

  actions: {
    login(accessToken: string) {
      this.accessToken = accessToken;
      const {
        uuid, name, email, loginType, isVerify,
      } = JSON.parse(
        Buffer.from(accessToken.split('.')[1], 'base64').toString('utf8'),
      );

      Object.assign(this, {
        uuid, name, email, loginType, isVerify,
      });
    },
    logout() {
      Object.assign(this, initState);
    },
  },
};

export type AuthStore = State & { isLogin: boolean } & Action;
export const useAuthStore: StoreDefinition = defineStore(options);
