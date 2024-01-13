import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { client } from "../src/utils/client";
import Cookies from "js-cookie";
import {
  Login,
  LoginMutation,
  LoginMutationVariables,
  Signup,
  SignupMutation,
  SignupMutationVariables,
} from "../generated/graphql";

export enum AUTH {
  AUTHED = "authed",
  NOT_AUTHED = "not_authed",
}

type LocalUser = {
  authed: AUTH;
  id?: string;
  token?: string | null;
  username?: string | null;
};

interface HasuraPizza {
  user: LocalUser;
  signup: (username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const useStore = create<HasuraPizza>()(
  devtools(
    persist(
      (set, get) => ({
        user: { authed: AUTH.NOT_AUTHED },
        signup: (username: string, password: string) => {
          console.log("Signing up user ", username);
          client
            .mutation<SignupMutation, SignupMutationVariables>(Signup, {
              username,
              password,
            })
            .toPromise()
            .then((d) => {
              if (d.error) {
                console.log(d.error.graphQLErrors);
              } else {
                if (d.data?.signup) {
                  const { token, id, username } = d.data?.signup;
                  Cookies.set("hasurapizza-user-id", id as string);
                  set({ user: { authed: AUTH.AUTHED, token, id, username } });
                }
              }
            });
        },
        login: (username: string, password: string) => {
          client
            .mutation<LoginMutation, LoginMutationVariables>(Login, {
              username,
              password,
            })
            .toPromise()
            .then((d) => {
              if (d.error) {
                console.log(d.error.graphQLErrors);
              } else {
                if (d.data?.login) {
                  const { token, id, username } = d.data?.login;
                  Cookies.set("hasurapizza-user-id", id as string);
                  set({ user: { authed: AUTH.AUTHED, token, id, username } });
                }
              }
            });
        },
        logout: () => {
          set({ user: { authed: AUTH.NOT_AUTHED } });
          Cookies.remove("hasurapizza-user-id");
        },
      }),
      {
        name: "hasurapizza",
        getStorage: () => localStorage,
      }
    )
  )
);

export { useStore };
