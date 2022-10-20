export const uploadFileToS3 = (presignedPostData, file) =>
  new Promise((resolve, reject) => {
    const formData = new FormData()
    Object.keys(presignedPostData.fields).forEach(key => {
      formData.append(key, presignedPostData.fields[key])
    })

    // Actual file has to be appended last.
    formData.append('file', file)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', presignedPostData.url, true)
    xhr.send(formData)
    xhr.onload = function() {
      return this.status === 204 ? resolve() : reject(this.responseText)
    }
  })
