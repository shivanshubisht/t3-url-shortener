import { prisma } from "../server/db";
import ErrorPage from "next/error";

type ContextType = {
  params: {
    redirect: string;
  };
  res: {
    statusCode: number;
  };
};

export const getServerSideProps = async ({ params, res }: ContextType) => {
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
