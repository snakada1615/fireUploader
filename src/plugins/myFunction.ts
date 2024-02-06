import { useQuasar } from 'quasar'
const $q = useQuasar()

export default class myFunc {
  static dlg(title: string, message: string) {
    console.log(title)
    console.log(message)
  }

  static alert(title: string, message: string) {
    myFunc.dlg(title, message)
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
}
