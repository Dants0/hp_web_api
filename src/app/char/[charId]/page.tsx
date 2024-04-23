// pages/char/[id].tsx
"use client"

import { CharactersInterface } from '@/interface/CharInterface'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CharDetailsPage = ({params}:{
  params: {charId: string}
}) => {

  const [chars, setChars] = useState<CharactersInterface>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(()=>{
    async function loadeChar(){
      setLoading(true)
      await axios.get("https://hp-api.onrender.com/api/character/"+params.charId).then((response)=>{
        const data = response.data[0]
        setChars(data)
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
      })
    }
    loadeChar()
  },[params.charId])

  console.log(chars)


  if(loading){
    return <>Carregando...</>
  }

  function handleExitDetails(){
    router.push("http://localhost:3000")
  }

  return (
    <div>
      <h1>Detalhes do Personagem</h1>
      <button onClick={handleExitDetails}>Voltar</button>
      <p>ID do Personagem: {params.charId}</p>
      <h4>{chars?.actor}</h4>
      <p>{chars?.name}</p>
      <p>{chars?.ancestry}</p>
      <p>{chars?.dateOfBirth}</p>
      <p>{chars?.gender}</p>
      <p>{chars?.house}</p>
      <p>{chars?.species}</p>
      <p>{chars?.wizard}</p>
      <Image src={chars ? chars.image : ""} alt="Foto do personagem" width={200} height={200} />
    </div>
  )
}

export default CharDetailsPage
