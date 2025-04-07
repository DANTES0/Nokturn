<script setup lang="ts">
import { ref } from 'vue'

// const props = defineProps({
//   modelValue: { default: false, type: Boolean },
// })

// const checkboxModel = ref(props.modelValue || false)

const checkboxModel = ref(false)

const emit = defineEmits(['update:modelValue'])

const onChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<template>
  <input
    class="border border-black dark:border-[#CCCCCC] absolute -z-10 opacity-0 custom-checkbox w-[1.6vw] aspect-square"
    type="checkbox"
    name="checkbox"
    id="checkbox"
    :checked="checkboxModel"
    @change="onChange"
  />
  <label for="checkbox"></label>
</template>

<style scoped>
.custom-checkbox + label {
  display: inline-flex;
  cursor: pointer;
  width: 24px;
  height: 24px;
  align-items: center;
  user-select: none;
  background-color: white;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

html.dark .custom-checkbox + label {
  background-color: #1c1c1c;
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
html.dark .custom-checkbox + label {
  border: 1px solid #cccccc;
}

.custom-checkbox:checked + label::before {
  background-image: url('../assets/images/check.svg');
  background-size: 100% 100%;
}
.custom-checkbox:checked + label:hover::before {
  background-color: #eeeeee;
}
html.dark .custom-checkbox:checked + label::before {
  filter: invert(1);
}

html.dark .custom-checkbox:checked + label:hover::before {
  background-color: #3c3c3c;
}

html.dark .custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  background-color: #3c3c3c;
}

.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  background-color: #eeeeee;
}
</style>
