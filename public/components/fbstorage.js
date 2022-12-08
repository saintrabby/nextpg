import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'

const Fbstorage = () => {

  const [fbimg, setFbimg] = useState(null)

  useEffect(() => {
    getDownloadURL(ref(getStorage(), 'image'))
      .then((res) => setFbimg(res))
      .catch((err) => {
        if ((/object-not-found/g).test(err)) {
          getDownloadURL(ref(getStorage(), 'default'))
            .then((res) => setFbimg(res))
            .catch((err) => console.log('오류'))
        }
      })
  }, [fbimg])

  return (
    <div>
      {fbimg ? <img src={fbimg} style={{ maxWidth: '200px', maxHeight: '200px' }} /> : ''}
    </div>
  )
}

export default Fbstorage