<template>
  <div>여기는 about</div>
  <button @click="() => refresh()">헬로월드 api GET</button>
  <template v-if="isHelloGET === false"> 위 버튼을 눌러보세요 </template>
  <template v-else>
    <p v-if="pending">로딩 중</p>
    <p v-else-if="error">에러</p>
    <p v-else>{{ data }}</p>
  </template>
  <input v-model="inputText" />
  <button @click="onClickPOSTButton">헬로월드 api 인풋값 POST</button>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
const inputText = ref("");
const isHelloGET = ref(false);
const { data, pending, error, refresh } = await useFetch("/api/hello", {
  method: "GET",
  lazy: true,
  immediate: false,
  onRequest: ({ request, response }) => {
    isHelloGET.value = true;
  },
  onResponse: ({ request, response }) => {
    console.log(response);
  },
});
const onClickPOSTButton = async () => {
  await useFetch("/api/hello", {
    method: "POST",
    lazy: true,
    watch: false,
    body: { data: inputText },
    onResponse: ({ response }) => {
      console.log(response._data);
    },
  });
};
</script>

<style scoped></style>
