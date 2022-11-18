<template>
  <div class="flex flex-col p-4">
    <h1 class="text text-xl text-primary font-bold">Basic Javascript 01</h1>
    <div class="flex flex-col">
      <div>
        <span>X </span>
        <span> {{ x }}</span>
      </div>
      <div>
        <span>Y </span>
        <span>{{ y }}</span>
      </div>
      <div>
        <span>x + y </span>
        <span>{{ sum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const x = 12; // number
const y = "12"; // string

const sum = x + y; // 1215
</script>
