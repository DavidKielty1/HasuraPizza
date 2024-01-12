import React, { useEffect, useState } from "react";

export default function Homepage() {
  const [friends, setFriends] = useState([]);
  console.log(friends);
  useEffect(() => {
    getFriends().then((fetchedFriends) => {
      setFriends(fetchedFriends);
    });
  }, []);

  return (
    <div>
      {friends.length > 0
        ? friends.map((friend, index) => <div key={index}>{friend.name}</div>)
        : "Loading..."}
    </div>
  );
}
