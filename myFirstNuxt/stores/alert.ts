import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", () => {
  const count = ref(0);
  const dbCount = computed(() => count.value * 2);
  const increment = () => {
    count.value++;
  };
  return { count, dbCount, increment };
});
