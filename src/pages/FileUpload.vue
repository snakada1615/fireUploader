<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-file
        v-model="files"
        label="Pick files to upload"
        @update:model-value="onFileChange"
        filled
        counter
        dense
        style="max-width: 300px"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storage } from '../plugins/fireFunctions'
import { ref as firebaseRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const files= ref(null)
const uploadStatus = ref<string>('');

const onFileChange = async (newFile: File) => {
  if (!newFile) {
    uploadStatus.value = "No file selected.";
    return;
  }
  
  try {
    const storageReference = firebaseRef(storage, 'files/' + newFile.name)
    const snapshot = await uploadBytes(storageReference, newFile)
    const downloadUrl = await getDownloadURL(snapshot.ref)
    console.log('File uploaded! Get the file at:', downloadUrl)
    alert('File uploaded! Get the file at:'+ downloadUrl)
  } catch (error) {
    console.error("Error uploading file: ", error);
    uploadStatus.value = "Error during upload.";
    alert("Error uploading file: ")
  }
}
</script>

