"use client";

import React, { useEffect, useState } from "react";

async function getFriends() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_HASURA_PROJECT_ENDPOINT as string,
      {
        method: "POST",
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
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

    const data = await response.json();
    return data.data.friend;
  } catch (error) {
    console.error("Error fetching friends:", error);
  }
}

getFriends();

interface Friend {
  name: string;
}

export default function Home() {
  const [friends, setFriends] = useState<Friend[]>([]);
  console.log(friends);
  useEffect(() => {
    getFriends().then((fetchedFriends) => {
      setFriends(fetchedFriends);
    });
  }, []);

  return (
    <div className="w-full">
      <div className="text-center">
        {friends.length > 0
          ? friends.map((friend, index) => <div key={index}>{friend.name}</div>)
          : "Loading..."}
      </div>
    </div>
  );
}
