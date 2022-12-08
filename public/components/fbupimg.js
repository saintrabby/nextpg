import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import React from 'react'


const fbupimg = (props) => {

  // getDownloadURL(ref(getStorage(), 'image'))
  //   .then((res) => console.log(res))
  //   .catch((err) => {
  //     (/object-not-found/g).test(err) ? console.log('이미지 없음') : console.log('오류')
  //   })

  if (props.type.match(/image/g)) {
    uploadBytes(ref(getStorage(), 'image'), props)
      .then((res) => console.log('업로드중..'))
      .catch((err) => console.log('업로드 오류'))
  }
  else
    console.log('이미지가 아닙니다')
}

export default fbupimg