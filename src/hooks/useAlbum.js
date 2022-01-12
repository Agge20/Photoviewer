import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";

const useAlbum = (id) => {
  const { user } = useAuthContext();

  const [albumOwner, setAlbumOwner] = useState(null);
  const [albumData, setAlbumData] = useState(null);
  const [unAuthUser, setUnAuthUser] = useState(false);
  const docRef = doc(db, "albums", id);

  const getOwner = async () => {
    const snap = await getDoc(docRef);
    const albumOwnerData = snap.data();
    setAlbumOwner(albumOwnerData.createdBy);
  };

  useEffect(() => {
    console.log("use effect ran");
    if (user.uid !== albumOwner) {
      setAlbumData(null);
      setUnAuthUser(true);
      console.log("reset album data");
      return;
    }
    setUnAuthUser(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], user, albumOwner]);

  useEffect(() => {
    getOwner();
    // subscribe to the album data
    const unsubscribe = onSnapshot(docRef, (snap) => {
      setAlbumData(snap.data());
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*   const albumOwner = await getDoc(docRef);
  console.log("albumOwner: ", albumOwner); */

  return {
    albumData,
    unAuthUser,
  };
};

export default useAlbum;
