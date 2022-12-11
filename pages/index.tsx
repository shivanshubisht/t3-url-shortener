import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import AddLinkForm from '../components/AddLinkForm';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [linkId, setLinkId] = useState<string | null>(null);
  return (
    <div className={styles.container}>
      <Head>
        <title>URL Shortner</title>
        <meta name='description' content='url-shortner' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1>URL Shortner</h1>
        <AddLinkForm setLinkId={setLinkId} />
        {linkId && (
          <div>
            <Link
              href={`http://localhost:3000/${linkId}`}
            >{`http://localhost:3000/${linkId}`}</Link>
          </div>
        )}
      </main>
    </div>
  );
}
