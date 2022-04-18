import { defineStore, StoreDefinition, DefineStoreOptions } from 'pinia';

type State = {
  isSideBarOpen: boolean
  isDropdownOpen: boolean
}
// eslint-disable-next-line @typescript-eslint/ban-types
type Getter = {}
type Action = {
  triggerSideBar: () => void
  triggerDropdown: () => void
}
type Options = DefineStoreOptions<string, State, Getter, Action>

const options: Options = {
  id: 'component',

  state: () => ({
    isSideBarOpen: false,
    isDropdownOpen: false,
  }),

  getters: {},

  actions: {
    triggerSideBar() {
      this.isSideBarOpen = !this.isSideBarOpen;
    },
    triggerDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};

export type ComponentStore = State & Action;
export const useComponentStore: StoreDefinition = defineStore(options);
