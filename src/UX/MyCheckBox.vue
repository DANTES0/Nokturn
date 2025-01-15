<script setup lang="ts"></script>

<template>
  <div class="">
    <input
      class="border border-black absolute -z-10 opacity-0 custom-checkbox w-6 h-6"
      type="checkbox"
      name="checkbox"
      id="checkbox"
    />
    <label for="checkbox"></label>
  </div>
</template>

<style scoped>
.custom-checkbox + label {
  display: inline-flex;
  cursor: pointer;
  width: 24px;
  height: 24px;
  align-items: center;
  user-select: none;
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
