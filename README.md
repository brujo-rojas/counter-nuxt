# 📊 Counter Nuxt - Gestión de Items con Vuex

Una aplicación web moderna construida con **Nuxt 4** y **Vuex 4** para la gestión centralizada del estado. Esta aplicación permite agregar, eliminar y gestionar una lista de items con cálculo automático de totales.

## ✨ Características

- 🔄 **Gestión de estado centralizada** con Vuex 4
- ⚡ **Nuxt 4** con soporte completo para TypeScript
- 🎯 **Reactividad automática** - Los cambios se reflejan inmediatamente en la UI
- 📝 **CRUD completo** - Crear, leer, actualizar y eliminar items
- 🧮 **Cálculo automático** - Total de valores calculado en tiempo real
- 💻 **Interfaz intuitiva** - Diseño limpio y fácil de usar
- 🔒 **Tipado fuerte** con TypeScript para mejor desarrollo

## 🏗️ Arquitectura

### **Vuex Store (`/stores/index.ts`)**
```typescript
// Estado centralizado
interface State {
  items: Item[];
}

// Mutaciones disponibles
- ADD_ITEM: Agregar nuevo item
- UPDATE_ITEM: Actualizar item existente  
- DELETE_ITEM: Eliminar item

// Acciones
- addItem, updateItem, deleteItem

// Getters
- getItemById: Obtener item por ID
- getAllItems: Obtener todos los items
- getTotalValue: Calcular suma total
```

### **Componente Principal (`/app/pages/index.vue`)**
- **Lista reactiva** de items desde el store de Vuex
- **Formulario** para agregar nuevos items
- **Botones de eliminación** para cada item
- **Total automático** calculado con getters

### **Plugin de Integración (`/plugins/vuex.client.ts`)**
- Inicializa el store de Vuex en la aplicación Nuxt
- Proporciona el store a todos los componentes
- Compatible con Nuxt 4 y Vue 3

## 🎯 Funcionalidades Principales

### 📝 **Gestión de Items**
- **Agregar items**: Completa título y valor, haz clic en "Agregar"
- **Eliminar items**: Haz clic en "Eliminar" junto a cualquier item
- **Vista en tiempo real**: Los cambios se muestran instantáneamente

### 🧮 **Cálculo Automático**
- **Total dinámico**: Se calcula automáticamente la suma de todos los valores
- **Reactividad**: Se actualiza al agregar o eliminar items
- **Precisión**: Manejo correcto de números y decimales

### 🔄 **Estado Centralizado**
- **Vuex Store**: Un solo punto de verdad para todos los datos
- **Mutaciones controladas**: Cambios de estado predecibles
- **Getters computados**: Datos derivados calculados eficientemente

## 🛠️ Tecnologías Utilizadas

- **[Nuxt 4.0.3](https://nuxt.com/)** - Framework de Vue.js
- **[Vue 3.5.19](https://vuejs.org/)** - Framework JavaScript reactivo
- **[Vuex 4.0.2](https://vuex.vuejs.org/)** - Gestión de estado
- **[TypeScript 5.9.2](https://www.typescriptlang.org/)** - Tipado estático
- **[Sass 1.90.0](https://sass-lang.com/)** - Preprocesador CSS
- **[Vite](https://vitejs.dev/)** - Herramienta de construcción rápida

## 📦 Instalación y Configuración

### **Requisitos Previos**
- Node.js 18+ 
- npm, pnpm, yarn o bun

### **1. Instalar Dependencias**

```bash
# npm
npm install

# pnpm  
pnpm install

# yarn
yarn install

# bun
bun install
```

### **2. Configuración de Vuex**
El proyecto incluye configuración completa de Vuex:
- ✅ Store configurado en `/stores/index.ts`
- ✅ Plugin de integración en `/plugins/vuex.client.ts`
- ✅ Tipos TypeScript en `/vuex.d.ts`

## 🚀 Desarrollo

### **Servidor de Desarrollo**
Inicia el servidor en `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏭 Producción

### **Construcción para Producción**

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

### **Vista Previa Local**

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 💡 Uso del Store de Vuex

### **En Componentes Vue**
```vue
<script setup>
import store from '../../stores/index';
import { computed } from 'vue';

// Acceder al estado
const items = computed(() => store.state.items);

// Usar getters
const totalValue = computed(() => store.getters.getTotalValue);

// Ejecutar mutaciones
const addItem = (newItem) => {
  store.commit('ADD_ITEM', newItem);
};

// Ejecutar acciones
const removeItem = (id) => {
  store.dispatch('deleteItem', id);
};
</script>
```

### **Estado Disponible**
- `items`: Array de items con `{id, title, value}`

### **Mutaciones Disponibles**
- `ADD_ITEM`: Agregar nuevo item
- `UPDATE_ITEM`: Actualizar item existente
- `DELETE_ITEM`: Eliminar item por ID

### **Getters Disponibles**
- `getAllItems`: Obtener todos los items
- `getItemById(id)`: Obtener item específico
- `getTotalValue`: Suma total de todos los valores

## 📋 Estructura del Proyecto

```
counter-nuxt/
├── app/
│   ├── pages/
│   │   └── index.vue          # Página principal con lista de items
│   ├── layouts/
│   │   └── Default.vue        # Layout por defecto
│   └── scss/                  # Estilos globales
├── stores/
│   └── index.ts              # Store principal de Vuex
├── plugins/
│   └── vuex.client.ts        # Plugin de integración Vuex
├── types/
│   └── items.ts              # Tipos TypeScript
├── nuxt.config.ts            # Configuración de Nuxt
└── package.json              # Dependencias del proyecto
```

## 🔧 Configuración Técnica

### **Vuex + Nuxt 4**
- ✅ Vuex 4.0.2 integrado con Nuxt 4.0.3
- ✅ Plugin client-side para inicialización
- ✅ Soporte completo para TypeScript
- ✅ Transpilación configurada en Vite

### **TypeScript**
- ✅ Configuración estricta habilitada
- ✅ Type checking en tiempo de desarrollo
- ✅ Tipos personalizados para el dominio

## 📚 Recursos Adicionales

- [Documentación de Nuxt](https://nuxt.com/docs/getting-started/introduction)
- [Documentación de Vuex](https://vuex.vuejs.org/)
- [Guía de TypeScript con Vue](https://vuejs.org/guide/typescript/overview.html)

---

**🚀 ¡Tu aplicación Counter con Nuxt + Vuex está lista para usar!**
