<script setup lang="ts"></script>

<template>
  <input
    class="border border-black absolute -z-10 opacity-0 custom-checkbox w-[1.6vw] aspect-square"
    type="checkbox"
    name="checkbox"
    id="checkbox"
  />
  <label for="checkbox"></label>
</template>

<style scoped>
.custom-checkbox + label {
  display: inline-flex;
  cursor: pointer;
  width: 1.6vw;
  aspect-ratio: 1/1;
  align-items: center;
  user-select: none;
  background-color: white;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.custom-checkbox + label::before {
  content: '';
  display: inline-block;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #000000;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.custom-checkbox:checked + label::before {
  background-image: url('../assets/images/check.svg');
  background-size: 100% 100%;
}
.custom-checkbox:checked + label:hover::before {
  background-color: #eeeeee;
}

.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  background-color: #eeeeee;
}
</style>
