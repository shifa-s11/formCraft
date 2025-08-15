
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex bgColor justify-center items-center p-4">
      <div className="bg-slate-800 opacity-70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-xl text-center border border-gray-700 transform transition-all duration-300 hover:scale-[1.01] p-6 sm:p-10">
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-2 leading-tight">
          Welcome to <span className="text-red-500">FormCrafter</span>
        </h1>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8">
          The ultimate tool for creating beautiful and engaging forms.
        </p>
        <div>
          <Link href="/form">
            <Button
              className="w-full text-white py-2 px-4 sm:py-3 sm:px-5 md:py-4 md:px-6 rounded-xl shadow-lg buttonColor text-sm sm:text-base md:text-lg mt-8"
            >
              Start Building My Form
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

