import { useEffect, useState } from "react";
// firebase
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
// context
import { useAuthContext } from "../context/AuthContext";

const useGetAlbums = () => {
  const { user } = useAuthContext();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(null);
  // create a reference to the entire albums-collection
  const colRef = collection(db, "albums");

  // subsrcribe to albums when their is a user, and get that users albums
  useEffect(() => {
    if (user) {
      // fetch all the albums where the current user id matches the "createdBy" id
      const albumsQuery = query(
        colRef,
        where("createdBy", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(albumsQuery, (snap) => {
        const data = snap.docs.map((doc) => {
          return {
            id: doc.id,
            // takes out all the data properties value with spread and adds it to the object
            ...doc.data(), // data here = title, completed
          };
        });
        setAlbums(data);
        setLoading(false);
      });
      // unsubscribe to the realtime data when component is dismounted
      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    loading,
    albums,
  };
};

export default useGetAlbums;
