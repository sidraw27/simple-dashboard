import { defineStore, StoreDefinition, DefineStoreOptions } from 'pinia';

type State = {
  alert: string | null
}
// eslint-disable-next-line @typescript-eslint/ban-types
type Getter = {}
type Action = {
  flush: () => void
}
type Options = DefineStoreOptions<string, State, Getter, Action>

const options: Options = {
  id: 'alert',

  state: () => ({
    alert: null,
  }),

  actions: {
    flush() {
      this.alert = null;
    },
  },
};

export type AlertStore = State & { isLogin: boolean } & Action;
export const useAlertStore: StoreDefinition = defineStore(options);
