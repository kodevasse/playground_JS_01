<template>
  <div class="flex flex-col p-4">
    <h1 class="text text-xl text-primary font-bold">Basic Javascript 01</h1>
    <div>{{ x }} <br />{{ y }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useLocalStorage, useMouse, usePreferredDark } from "@vueuse/core";

// tracks mouse position
const { x, y } = useMouse();

// is user prefers dark theme
const isDark = usePreferredDark();

// persist state in localStorage
const store = useLocalStorage("my-storage", {
  name: "Apple",
  color: "red",
});
</script>
