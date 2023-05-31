<template>
  <section>
    <h2>홈</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa zut, laborum
      perferendis commodi nulla sunt? Et vitae ipsam rerum labore, vel quidem
      voluptatem aliquam voluptas provident quod possimus sunt cumque.
    </p>
    <button @click="() => alertStore.increment()">pinia카운트 증가</button>
    {{ alertStore.count }}
  </section>
</template>

<script setup>
import { useAlertStore } from "@/stores/alert";
definePageMeta({
  layout: "default", //기본값 : default
});
const appConfig = useAppConfig();
const alertStore = useAlertStore();
console.log(appConfig.foo);
</script>

<style scoped>
section {
  flex: 1;
}
</style>
