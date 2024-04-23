import Image from "next/image";
import styles from "./styles.module.scss";
import { Characters } from "@/components/Characters/Characters";

export default function Home() {
  return (
    <main className={styles.main}>
      <Characters/>
    </main>
  );
}
