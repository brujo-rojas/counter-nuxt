// Declaraciones de tipo para Vuex
import { Store } from 'vuex'

declare module 'vuex' {
  export function useStore(key?: string): Store<any>;
  export function createStore<S>(options: any): Store<S>;
  export class Store<S> {
    constructor(options: any);
    state: S;
    commit(type: string, payload?: any): void;
    dispatch(type: string, payload?: any): Promise<any>;
    getters: any;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

export {};
