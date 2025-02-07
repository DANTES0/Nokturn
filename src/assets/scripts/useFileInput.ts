import { ref } from 'vue'

export function useFileInput() {
  const selectedImage = ref<string | null>(null)

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        selectedImage.value = e.target?.result as string
      }
      reader.readAsDataURL(target.files[0])
    }
  }

  return { selectedImage, handleFileChange }
}
