import type { NextPage } from "next";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { client } from "../utils/client";
import {
  GetFriends,
  GetFriendsQuery,
  GetFriendsQueryVariables,
} from "../../generated/graphql";

interface Props {
  friends: GetFriendsQuery["friend"];
}

const Home: NextPage<Props> = ({ friends }) => {
  return (
    <div className="">
      <Head>
        <title>Hasura Pizza</title>
        <meta name="Hasura pizza app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {friends.map((friend) => (
          <p key={friend.id}>{friend.name}</p>
        ))}
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return client
    .query<GetFriendsQuery, GetFriendsQueryVariables>(GetFriends)
    .toPromise()
    .then((d) => {
      return {
        props: { friends: d.data?.friend },
      };
    })
    .catch((e) => {
      return {
        props: {},
      };
    });
};
