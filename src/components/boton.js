'use client'
import { useFormStatus } from 'react-dom'
import Spinner from '@/components/spinner';


export default function Boton ({ texto }) {
    const { pending } = useFormStatus()

    return (
        <button type='submit' disabled={pending}
            className='bg-sky-600 transition duration-500 hover:bg-sky-600/50 bg-center text-white bg-no-repeat h-10 rounded-xl w-56  cursor-pointer'>
            {pending ? <Spinner /> : texto}
        </button>
    )
}
