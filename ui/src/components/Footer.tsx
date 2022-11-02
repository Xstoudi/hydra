import { Link } from 'react-router-dom'
import LangSelector from './LangSelector'

export default function Footer() {
  return (
    <div className='mx-8 mt-8 border-t-2 border-gray-100 bg-white py-8'>
      <div className='mx-16 grid grid-rows-3 md:grid-rows-none md:grid-cols-2 md:gap-8 lg:gap-16 xl:grid-cols-3 2xl:mx-72 justify-between gap-4'>
        <div className='flex flex-col'>
            <h3 className='text-2xl'>Sources</h3>
            <p>
                OFEV through Bouni
            </p>
        </div>
        <div className='flex flex-col'>
            <h3 className='text-2xl'>Contact</h3>
            <p>
                Hydra is developed and hosted by Xavier Stouder.
            </p>
        </div>
        <div className='flex flex-col'>
            <h3 className='text-2xl'>About</h3>
            <p>
                This project was developed during my studies at the Haute Ecole Arc.
            </p>
        </div>
      </div>
    </div>
  )
}
