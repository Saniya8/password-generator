import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  // useState hook usage
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')

  // useCallback hook usage
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789"
    }
    if (characterAllowed) {
      str += "~`!@#$%^&*()_''-+={}[]:;<,>.?/"
    }

    for (let i = 1; i <= length; i++) {
      let chhar = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(chhar)
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])


  // useEffect hook usage
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed])


  // useRef hook usage
  const copyRef = useRef(null)

  const copyToClipBoard = useCallback(() => {
    copyRef.current?.select(0, 7);
    // copyRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <div className='p-8 border-2 border-white rounded-lg'>
      <h1 className='text-xl sm:text-2xl text-white pt-4'>Password Generator</h1>
      <div className='flex justify-center items-center py-4 w-full'>
        <input className="px-4 py-2 sm:px-8 sm:py-4 w-full outline-none" value={password} type="text" placeholder='password' readOnly ref={copyRef} />
        <button className='bg-teal-500 text-black px-4 py-2 sm:px-8 sm:py-4 shrink-0 outline-none' onClick={copyToClipBoard}>Copy</button>
      </div>
      <div className='flex flex-col gap-4 sm:gap-0 sm:flex-row justify-center items-center pb-4'>
        <div className='flex flex-col sm:flex-row items-center'>
          <input type="range" min={4} max={100} onChange={(e) => setLength(e.target.value)} />
          <label className='text-white text-xl px-2'>Length {length}</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" value={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
          <label className='text-white text-xl px-2'>Numbers</label>
        </div>
        <div className='flex items-center'>
          <input type="checkbox" value={characterAllowed} onChange={() => setCharacterAllowed((prev) => !prev)} />
          <label className='text-white text-xl px-2'>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
