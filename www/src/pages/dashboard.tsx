import type { NextPage } from "next";
import Head from "next/head";
import { GetServerSideProps } from "next";

import { client } from "../utils/client";
import {
  GetFriends,
  GetFriendsQuery,
  GetFriendsQueryVariables,
} from "../../generated/graphql";
import Link from "next/link";
import Cookies from "js-cookie";
import OrderPizza from "../../components/OrderPizza";
import PizzaOrders from "../../components/PizzaOrders";
import ActiveOrder from "../../components/ActiveOrder";

interface Props {
  friends: GetFriendsQuery["friend"];
}

const Dashboard: NextPage<Props> = ({ friends }) => {
  return (
    <div>
      <Head>
        <title>BYP | Dashbaord</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <article className="prose mb-12">
          <h1>My BYP</h1>
        </article>

        <section className="mb-12">
          <OrderPizza />
        </section>

        <section className="mb-12">
          <ActiveOrder />
        </section>

        <section>
          <article className="prose mb-12">
            <h1>Pizza&apos;s you&apos;ve ordered</h1>
          </article>
          <PizzaOrders />
        </section>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4"></div>
      </main>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authed = Cookies.get("byp-user-id");

  if (authed) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
