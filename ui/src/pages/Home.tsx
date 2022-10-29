import { memo } from 'react'
import Hero from '../components/Hero'

function Home() {
  return (
    <>
      <Hero />
    </>
  )
}

export default memo(Home)