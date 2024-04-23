// pages/char/[id].tsx
"use client";

import { CharactersInterface } from "@/interface/CharInterface";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import { ArrowLeftFromLine } from "lucide-react";

const CharDetailsPage = ({ params }: { params: { charId: string } }) => {
  const [chars, setChars] = useState<CharactersInterface>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function loadeChar() {
      setLoading(true);
      await axios
        .get("https://hp-api.onrender.com/api/character/" + params.charId)
        .then((response) => {
          const data = response.data[0];
          setChars(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadeChar();
  }, [params.charId]);

  console.log(chars);

  if (loading) {
    return <>Carregando...</>;
  }

  function handleExitDetails() {
    router.push("http://localhost:3000");
  }

  return (
    <div className={styles.containerDetails}>
      <h1>Character Details</h1>
      <ArrowLeftFromLine onClick={handleExitDetails} style={{cursor: "pointer"}}/>
      <div className={styles.wrapper}>
        <div className={styles.leftBox}>
          <Image
            src={chars ? chars.image : ""}
            alt="Foto do personagem"
            width={200}
            height={200}
          />
        </div>
        <div className={styles.rightBox}>
          <h4>{chars?.actor}</h4>
          <p>{chars?.name}</p>
          <p>{chars?.ancestry}</p>
          <p>{chars?.dateOfBirth}</p>
          <p>{chars?.gender}</p>
          <p>{chars?.house}</p>
          <p>{chars?.species}</p>
          <p>{chars?.wizard}</p>
        </div>
      </div>
    </div>
  );
};

export default CharDetailsPage;
