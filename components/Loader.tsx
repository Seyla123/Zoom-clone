import Image from 'next/image'
import React from 'react'

function Loader() {
  return (
    <div>
        <Image
            src={'/icons/loading-circle.svg'}
            alt='Loading'
            width={50}
            height={50}
        />
    </div>
  )
}

export default Loader