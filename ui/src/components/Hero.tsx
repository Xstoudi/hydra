export default function Hero() {
  return (
    <header className='w-full h-screen bg-hero-background bg-cover bg-center'>
      <div className='w-full h-full flex flex-col justify-center items-center backdrop-blur-sm text-white gap-4'>
        <h1 className='text-6xl'>Hydra</h1>
        <p className='text-2xl'>A one place to check swiss hydrological data.</p>
        <a href='/stations' className='py-4 px-8 text-xl rounded-full bg-gradient-to-r from-cyan-500 to-blue-500'>Enter app</a>
      </div>
    </header>
  )
}