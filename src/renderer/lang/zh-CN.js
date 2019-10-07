import axios from 'axios'
export default () => {
  return new Promise(function (resolve) {
    axios
      .get(
        'https://translation.nknx.org/zh.json'
      )
      .then(function (response) {
        resolve(response.data)
      })
  })
}
