import { prisma } from "../server/db";

interface Params {
  linkId: string;
}

export const getServerSideProps = async ({ params }: { params: Params }) => {
  try {
    const url = await prisma.link.findFirst({
      where: {
        linkId: params.linkId,
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
      return {
        redirect: {
          destination: "http://localhost:3000",
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "http://localhost:3000",
      },
    };
  }
};

const Link = () => {
  return <></>;
};

export default Link;
