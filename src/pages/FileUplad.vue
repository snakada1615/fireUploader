<template>
  <input type="file" @change="onFileChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storage } from '../plugins/fireFunctions'
import { ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files) return
  const file = target.files[0]
  try {
    const storageReference = firebaseRef(storage, 'files/' + file.name)
    const snapshot = await uploadBytes(storageReference, file)
    const downloadUrl = await getDownloadURL(snapshot.ref)
    console.log('File uploaded! Get the file at:', downloadUrl)
  } catch (error) {
    console.error('Upload failed', error)
  }
}
</script>
