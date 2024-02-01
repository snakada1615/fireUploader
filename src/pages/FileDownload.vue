<template>
  <select v-model="selectedFile">
    <option disabled value="">Please select a file</option>
    <option v-for="file in files" :key="file.name" :value="file">{{ file.name }}</option>
  </select>

  <button @click="downloadFile">Download Selected File</button>
</template>

<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { storage } from '../plugins/fireFunctions'
import { ref as storageRef, getDownloadURL, listAll, type StorageReference } from 'firebase/storage'
interface FileWithFullPath {
  [x: string]: string
  fullPath: string
  // ... any other properties that might be needed ...
}

const selectedFile: Ref<FileWithFullPath | null> = ref(null) // Define the property as a ref with an initial value.
const files = ref<StorageReference[]>([]) // Specify the type of the elements in the array.const selectedFile = ref(null);

onMounted(async () => {
  try {
    const listRef = storageRef(storage, 'files/')
    const res = await listAll(listRef)
    files.value = res.items // This will be an array of Reference objects
  } catch (error) {
    console.error('Failed to load files', error)
  }
})

const downloadFile = async () => {
  if (!selectedFile.value) return

  try {
    const storageReference = storageRef(storage, selectedFile.value.fullPath)
    const url = await getDownloadURL(storageReference)

    // Trigger file download
    let tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = url
    tempLink.setAttribute('download', selectedFile.value.name)
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
  } catch (error) {
    console.error('Download failed', error)
  }
}
</script>
