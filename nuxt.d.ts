// https://nuxt.com/docs/guide/directory-structure/types

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, values?: any) => string;
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Asegura que los módulos en el directorio types/ sean reconocidos
declare module '#app' {
  interface NuxtApp {
    $t: (key: string, values?: any) => string;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, values?: any) => string;
  }
}

export {};
