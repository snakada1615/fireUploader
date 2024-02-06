<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="q-pa-md q-gutter-sm">
    <div>halo</div>
    <q-btn label="Alert" color="primary" @click="alert('Alert', 'you complete!')" />
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
const $q = useQuasar()

function alert(title: string, message: string) {
  $q.dialog({
    title: title,
    message: message
  })
    .onOk(() => {
      // console.log('OK')
    })
    .onCancel(() => {
      // console.log('Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
  $q.notify('Message')
}
</script>
