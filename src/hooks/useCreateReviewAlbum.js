import { useState } from "react";
import { db } from "../firebase";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useCreateReviewAlbum = () => {
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createReviewAlbum = async (collectionName, albumData) => {
    setError(null);
    setFinished(false);
    setLoading(true);
    // get the collection reference
    const colRef = collection(db, collectionName);
    try {
      await addDoc(colRef, {
        ...albumData,
        createAt: serverTimestamp(),
      });
      setFinished(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setFinished(false);
      setError(err);
    }
  };
  return {
    finished,
    error,
    loading,
    createReviewAlbum,
  };
};

export default useCreateReviewAlbum;
