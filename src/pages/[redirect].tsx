import { prisma } from "../server/db";
import ErrorPage from "next/error";
import type { GetServerSideProps } from "next";

export const getServerSideProps = async (context: GetServerSideProps) => {
  const {params, res} = context;
  try {
    const url = await prisma.link.findFirst({
      where: {
        OR: [
          {
            customname: params.redirect,
          },
          {
            linkId: params.redirect,
          },
        ],
      },
    });
    if (url) {
      return {
        redirect: {
          destination: url.url,
        },
      };
    }
    if (!url) {
      res.statusCode = 404;
      return { props: { url: null } };
    }
  } catch (error) {
    console.error();
  }
};

const Link = () => {
  return <ErrorPage statusCode={404} />;
};

export default Link;
