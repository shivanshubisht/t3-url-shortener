import AddLinkForm from '../components/AddLinkForm';
import { useState } from 'react';

export default function Home() {
  const [linkId, setLinkId] = useState<string | null>(null);
  return (
    <main>
      <div className='h-screen flex justify-center items-center flex-col'>
        <h1 className='mb-32 text-4xl'>Shortened Url</h1>
        <AddLinkForm setLinkId={setLinkId} />
        {linkId ? (
          <div className='absolute mt-24'>
            <a
              href={`/${linkId}`}
            >{`https://url-shortner.shivanshu.in/${linkId}`}</a>
          </div>
        ) : null}
      </div>
    </main>
  );
}
