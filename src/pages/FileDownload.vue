<template>
  <div>Selected File: {{ selectedFile ? selectedFile.fullPath : 'None' }}</div>
  <q-select
    outlined
    v-model="selectedFile"
    label="select file to download"
    :options="files"
    :on-update:model-value="onUpdate"
    :dense="true"
    :options-dense="true"
    style="max-width: 300px"
  >
    <template v-slot:after>
      <q-btn round dense flat icon="download" @click="downloadFile"></q-btn>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue'
import { storage } from '../plugins/fireFunctions'
import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage'
import { useQuasar } from 'quasar'
const $q = useQuasar()

// Representing files with simple objects containing only serializable properties
interface FileItem {
  label: string
  fullPath: string
}

const selectedFile: Ref<FileItem | null> = ref(null)
const files = ref<FileItem[]>([])

onMounted(async () => {
  try {
    const listRef = storageRef(storage, 'files/')
    const res = await listAll(listRef)
    files.value = res.items.map((item) => ({
      label: item.name,
      fullPath: item.fullPath // Assume fullPath here is a string representing the file path within Firebase storage
    }))
  } catch (error) {
    console.error('Failed to load files', error)
  }
})

function onUpdate(fileItem: FileItem) {
  selectedFile.value = fileItem
}

const downloadFile = async () => {
  if (!selectedFile.value) return

  try {
    const storageReference = storageRef(storage, selectedFile.value.fullPath)
    const url = await getDownloadURL(storageReference)

    // Trigger file download
    let tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = url
    tempLink.setAttribute('download', selectedFile.value.label)
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    $q.notify('Download complete!')
  } catch (error) {
    console.error('Download failed', error)
    $q.notify('Download failed!')
  }
}
</script>
