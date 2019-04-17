/** @module */

/**
 * http请求工具类
 */
export default class HttpRequest {
  static get (url, headers = {}, params = {}, isAlert = false) {
    return new Promise((resolve, reject)=> {
      if (Object.keys(params).length > 0) {
        url = url + '?'
        for (let key in params) {
          let val = params[key]
          url = url + key + '=' + val + '&'
        }
        url = url.substring(0, url.length - 1)
      }
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          ...headers
        },
        credentials: 'include'
      }).then((res)=>{
        return res.json()
      }).then((data)=>{
        if (data['succeed']) {
          delete data['succeed']
          resolve(data)
        } else {
          delete data['succeed']
          isAlert === true && alert(data['error_message'])
          reject(new Error(data['error_message']))
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  static post (url, headers = {}, params = {}, isAlert = false) {
    return new Promise((resolve, reject)=> {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          ...headers
        },
        body: JSON.stringify(params),
        credentials: 'include'
      }).then((res)=>{
        return res.json()
      }).then((data)=> {
        if (data['succeed']) {
          delete data['succeed']
          resolve(data)
        } else {
          delete data['succeed']
          isAlert === true && alert(data['error_message'])
          reject(new Error(data['error_message']))
        }
      }).catch((err)=> {
        reject(err)
      })
    })
  }
}
