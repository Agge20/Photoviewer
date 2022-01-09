import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const useAlbum = (id) => {
  const [albumData, setAlbumData] = useState(null);

  const docRef = doc(db, "albums", id);

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
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
