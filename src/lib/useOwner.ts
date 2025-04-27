import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRoom } from "@liveblocks/react/suspense";
import { db } from "@/../firebase";

function useOwner() {
  const { user } = useUser();

  const room = useRoom();

  const [isOwner, setisOwner] = useState<boolean>();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  useEffect(() => {
    if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
      const owners = usersInRoom.docs.filter(
        (doc) => doc.data().role === "owner"
      );

      if (
        owners.some(
          (owner) => owner.data().userId === user?.emailAddresses[0].toString()
        )
      ) {
        setisOwner(true);
      }
    }
  }, [usersInRoom, user]);

  return isOwner;
}

export default useOwner;
