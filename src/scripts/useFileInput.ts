import { ref } from 'vue'

export function useFileInput(multiple: boolean = false) {
  const selectedImage = ref<string | null>(null)
  const selectedFile = ref<File | null>(null)
  const selectedImagesArray = ref<string[]>([])
  const selectedFilesArray = ref<File[]>([])
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0] && !multiple) {
      selectedFile.value = target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        selectedImage.value = e.target?.result as string
      }
      reader.readAsDataURL(target.files[0])
    }
    if (target.files && multiple) {
      const files = Array.from(target.files)

      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          selectedImagesArray.value.push(e.target?.result as string)
        }
        reader.readAsDataURL(file)

        selectedFilesArray.value.push(file)
      })
    }
  }

  return { selectedImage, handleFileChange, selectedFile, selectedImagesArray, selectedFilesArray }
}
