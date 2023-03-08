import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";

import { api } from "../utils/api";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const Home: NextPage = () => {
  const [linkId, setLinkId] = useState<string | null | undefined>(null);
  const [customLink, setCustomLink] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);

  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_URL)
      return `https://${process.env.NEXT_PUBLIC_URL}/`;
    else if (process.env.NEXT_PUBLIC_VERCEL_URL)
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/`;
    else return `http://localhost:${process.env.PORT ?? 3000}/`;
  };

  const input = useRef<HTMLInputElement>(null);
  const customName = useRef<HTMLInputElement>(null);
  const urlPattern =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

  const mutation = api.url.shorten.useMutation();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setError("");
    setLinkId("");
    setCustomLink("");
    setLoading(true);
    let url = input.current?.value;

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    if (!urlPattern.test(url)) {
      setError("Please enter a valid URL");
      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    // mutation.mutate({ link: url, customName: customName.current!.value });
    const response = await mutation.mutateAsync({
      link: url,
      customName:
        customName.current?.value === "" ? null : customName.current?.value,
    });
    console.log(response);

    if (mutation.isLoading) {
      setLoading(true);
      return;
    }

    setLoading(false);
    // setLinkId(mutation.data?.link);
    setLinkId(response.link);
    // setError(mutation.data?.error);
    setError(response.error);
    // setCustomLink(mutation.data?.customName);
    setCustomLink(response.customName);
  };

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <meta
          name="description"
          content="URL Shortener built with create-t3-app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#191919] to-[#15162c] ${inter.className}`}
      >
        <h1 className="text-4xl font-semibold">Shortened Url</h1>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit} className="grid w-full max-w-xs gap-2">
          <input
            type="text"
            placeholder="Enter your URL"
            ref={input}
            className="rounded border-2 border-black bg-black p-2 outline-none transition duration-300 ease-in-out focus:border-white"
          />
          <input
            type="text"
            placeholder="Enter custom name"
            ref={customName}
            className="rounded border-2 border-black bg-black p-2 outline-none transition duration-300 ease-in-out focus:border-white"
          />
          <button
            type="submit"
            className="rounded border-2 border-white bg-white p-2 text-black transition duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Shorten
          </button>
        </form>
        <div className="h-1 max-w-md">
          {error && <div className="text-red-500">{error}</div>}
          {!error && loading && (
            <div className="text-green-500">Loading...</div>
          )}
          {!error && linkId && (
            <Link href={`/${linkId}`} className="text-blue-500">
              {`${getBaseUrl()}${linkId}`}
            </Link>
          )}
          {!error && customLink && (
            <Link href={`/${customLink}`} className="text-blue-500">
              {`${getBaseUrl()}${customLink}`}
            </Link>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
