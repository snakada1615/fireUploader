import { useQuasar } from 'quasar'

const $q = useQuasar()
export function alert(title: string, message: string) {
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
}
