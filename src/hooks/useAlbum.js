import { useEffect, useState } from "react";
// firebase
import { db } from "../firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
// context
import { useAuthContext } from "../context/AuthContext";

// hook to get the album images
const useAlbum = (id, loginNeeded) => {
  // from hooks
  const { user } = useAuthContext();
  const [albumOwner, setAlbumOwner] = useState(null);
  const [albumData, setAlbumData] = useState(null);
  const [unAuthUser, setUnAuthUser] = useState(false);
  // album reference in firestore
  const docRef = doc(db, "albums", id);

  // this function gets the album-document and check who is the owner, and saves it
  const getOwner = async () => {
    const snap = await getDoc(docRef);
    const albumOwnerData = snap.data();
    setAlbumOwner(albumOwnerData.createdBy);
  };

  useEffect(() => {
    // if login is needed to check the owner of the album
    if (loginNeeded) {
      // if the current logged in user is not the owner of the document reset all data
      if (user.uid !== albumOwner) {
        setAlbumData(null);
        setUnAuthUser(true);
        return;
      }
    }
    setUnAuthUser(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], user, albumOwner]);

  // on mount fetch the album data and run getOwner
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

  return {
    albumData,
    unAuthUser,
  };
};

export default useAlbum;
