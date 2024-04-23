"use client"

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import axios from 'axios'
import Image from 'next/image'
import { CharactersInterface } from '@/interface/CharInterface'
import { useRouter } from 'next/navigation'

export const Characters = () => {
  
  const [chars, setChars] = useState<CharactersInterface[]>([])
  const router = useRouter()
  
  useEffect(()=>{
    const getAllChars = async () => {
      await axios.get("https://hp-api.onrender.com/api/characters").then((response)=>{
        const data = response.data
        setChars(data)
      }).catch((err)=>{
        console.log(err)
      })
    }

    getAllChars()

  },[])

  function handleEnterChar(id:string){
    router.push(`http://localhost:3000/char/${id}`, {
      scroll: true,
    })
  }

  function quantityWoman(){
    return chars?.filter((item)=>item.gender == "female").length
  }


  return (
    <div className={styles.containerChar}>
      {quantityWoman()}
      {chars.filter(item=>item.image != "" && item.species == "human").map((char)=>(
        <div key={char.id} className={styles.cardsChar}>
          <h1>{char.actor}</h1>
          <h4>{char.name}</h4>
          <Image src={char.image} alt="Foto do personagem" width={200} height={200} />
          <button onClick={()=>handleEnterChar(char.id)}>Detalhes</button>
        </div>
      ))}
    </div>
  )
}
