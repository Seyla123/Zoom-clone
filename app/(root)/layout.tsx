import React, { ReactNode } from 'react'

function Rootlayout({children}:{children: ReactNode}) {
  return (
    <main>
        {children}
    </main>
  )
}

export default Rootlayout