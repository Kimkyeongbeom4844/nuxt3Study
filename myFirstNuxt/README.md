# Nuxt3 정리

[nuxt3 공식문서](https://nuxt.com/docs/getting-started/introduction)에 다있다

## app.vue

`NextJS 13`처럼 없어도 된다. 뼈대는 `layouts/default.layout`으로 고정

만약 사용하게 되면

```javascript
//app.vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

이렇게 쓰면 된다

## assets, public

`assets`내부는 번들링과정 최적화되며 `public`내부는 최적화 안됨

대신 `public`내부에 있는 파일은 `절대경로`로 참조 가능하다

```javascript
<script setup lang="ts">
  import bg from '@/assets/images/logo.png'; //assets 참조 import test from
  '/images/test.png' //public 참조
</script>
```

## css

[css](https://nuxt.com/docs/api/configuration/nuxt-config#css)

## 상태관리(stores)

Vue에서도 공식적으로 `pinia`를 지지하고 있다.
`store`는 `defineStore`로 만들고, 사용할 component 및 page에서 참조해서 사용하면 된다

[pinia-plugin-persistedstate 라이브러리](https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html)와 함께 쓰면 새로고침시 로컬스토리지, 쿠키, 세션 등에 저장할 수도 있다.(Nuxt의 경우 `nuxt.config.ts` 수정 필요)

```javascript
// stores/count.ts
import { defineStore } from "pinia";

export const useCountStore = defineStore(
  "count",
  () => {
    const count = ref(0);
    const dbCount = computed(() => count.value * 2);
    const increment = (v) => {
      count.value += v;
    };
    const decrement = (v) => {
      count.value -= v;
    };
    return { count, dbCount, increment, decrement };
  },
  {
    //3번째 인자는 pinia-plugin-persistedstate 라이브러리 설치 해야 사용가능
    persist: true,
  }
);
```

## [미들웨어(middleware)](https://nuxt.com/docs/guide/directory-structure/middleware)

파일에 `.global`을 붙이면 모든 라우트에서 접근가능하다

`auth.global.ts` - 전역, `test.ts` - 사용자 지정

## [app.config.ts, nuxt.config.ts](https://nuxt.com/docs/getting-started/configuration)

`app.config.ts`는 `useConfigApp()`으로 접근가능하고

`nuxt.config.ts`는 접근불가능하지만 [`runtimeConfig`](https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig)에 있는 속성은 접근가능함

(`runtimeConfig`내부에서도 `client Side`에서는 `public`에 정의되어 있는 값만 접근가능)

```javascript
// nuxt.config.js
export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  }
})
//app.config.ts
export default defineAppConfig({
  foo: "barrrrr",
});
//pages/test.vue
<script setup lang='ts'>
const appConfig = useAppConfig();
const runtimeConfig = useRuntimeConfig();
console.log(appConfig.foo); //'barrrrr'
console.log(runtimeConfig.public.apiBase); //'/api'
</script>
```

`runtimeConfig` 내부에 있는 값은 `useRuntimeConfig()`를 통해 접근가능함

## definePageMeta()

사용하고 싶은 page에 `definePageMeta()`를 사용하여 middleWare 및 layout 지정가능

```javascript
<script setup>
import { useAlertStore } from "@/stores/alert";
definePageMeta({
  layout: "default", //기본값 : default
  middleware: ["auth"],
});
const appConfig = useAppConfig();
const alertStore = useAlertStore();
console.log(appConfig.foo);
</script>
```

## [useFetch()](https://nuxt.com/docs/api/composables/use-fetch)

`useFetch()`는 nuxt3에서 제공해주는 fetch함수이며 `useAysncData`와 `$fetch`를 합쳐놓음

```javascript
const { data, pending, error, refresh } = await useFetch("/api/login", {
  method: "POST",
  immediate: false, //기본값은 true며, false를 설정하지 않으면 자동적으로 실행됨
  lazy: true, // useLazyFetch() = useFetch() + lazy : true
  headers: {
    Authorization: "Bearer 12345",
  },
  body: {
    //body가 객체일때는 자동대로 JSON.stringify() 적용
    id: "bibix321",
    password: 1234,
  },
  watch: [inputRef], //inputRef가 변할때마다 자동적으로 수행
  // 또한 body에 state가 있으면 자동적으로 해당 state는 watch에 포함됨
  onRequest({ request, options }) {
    //요청을 보낼 때 실행
    // Set the request headers
    options.headers = options.headers || {};
    options.headers.authorization = "...";
  },
  onRequestError({ request, options, error }) {
    //요청을 보낼 때 에러 처리
    // Handle the request errors
  },
  onResponse({ request, response, options }) {
    //응답을 받을 때 실행
    // Process the response data
    localStorage.setItem("token", response._data.token);
  },
  onResponseError({ request, response, options }) {
    //응답을 받을 때 에러 처리
    // Handle the response errors
  },
});
```
