import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, query, orderBy } from "firebase/firestore";

const useAlbum = (id) => {
  console.log("id: ", id);
  const [albumData, setAlbumData] = useState(null);

  const docRef = doc(db, "albums", id);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      console.log("albums data in hook: ", snap.data());
      setAlbumData(snap.data());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    albumData,
  };
};

export default useAlbum;
