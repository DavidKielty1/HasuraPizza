"use server";

import React from "react";

interface Friend {
  name: string;
}

async function getFriends() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string,
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query {
            friend {
              name
            }
          }`,
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const friends = await response.json();
    return friends;
  } catch (error) {
    console.error("Error fetching friends:", error);
    return [];
  }
}

export default async function Home() {
  const friendsObjects = await getFriends();
  console.log(friendsObjects.data.friend);
  const friends = friendsObjects.data.friend;

  return (
    <ul>
      {friends.length ? (
        friends.map((friend: Friend) => (
          <div key={friend.name}>{friend.name}</div>
        ))
      ) : (
        <div>hi</div>
      )}
    </ul>
  );
}
