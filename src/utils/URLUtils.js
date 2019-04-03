/**
 * @Date:   2017-08-31T10:15:58+08:00
 * @Email:  jaxchow@gmail.com
 * @Last modified time: 2017-09-11T17:52:18+08:00
 */

const URLUtil = {
  urlStringify: function(obj) {
    if (typeof(obj) == 'string') {
      obj = JSON.parse(obj)
    }
    if (obj) {
      return Object.keys(obj).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
      }).join('&')
    } else {
      return ""
    }
  }
}

export default URLUtil;
