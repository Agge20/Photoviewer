import { useState } from "react";

// firebase
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// function for creating a new album when the reviewer has submitted his/her review
const useCreateReviewAlbum = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createReviewAlbum = async (collectionName, albumData) => {
    setError(null);
    setLoading(true);
    // get the collection reference
    const colRef = collection(db, collectionName);
    try {
      await addDoc(colRef, {
        ...albumData,
        createAt: serverTimestamp(),
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  return {
    error,
    loading,
    createReviewAlbum,
  };
};

export default useCreateReviewAlbum;
