import { useState } from "react";
// firebase
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
// packages
import { v4 as uuidv4 } from "uuid";
// context
import { useAuthContext } from "../context/AuthContext";

// hook for creating an album
const useCreateAlbum = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  // create a new album document
  const createAlbum = async (collectionName, albumData, coverFile, images) => {
    /* if the use has just created an empty album and not 
    provided any images-data make it an empty array */
    if (images === undefined) {
      images = [];
    }
    setError(null);
    setFinished(false);
    setLoading(true);

    // get the collection reference
    const colRef = collection(db, collectionName);
    // create unique id for cover-image file
    const coverId = uuidv4();

    // get the storage cover path reference
    const coverRef = ref(storage, `covers/${coverId}`);
    // try to upload the cover image
    try {
      // wait for uploading the cover image
      await uploadBytes(coverRef, coverFile);

      // wait for getting the downloadURL from the newly created cover image
      const downURL = await getDownloadURL(coverRef);
      // now we try to combine all the album data and add it as a document
      await addDoc(colRef, {
        ...albumData,
        images: [...images],
        coverUrl: downURL,
        coverPath: `covers/${coverId}`,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        coverId,
      });
      setFinished(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setFinished(false);
      setError(err);
    }
  };

  return { createAlbum, finished, setFinished, loading, error };
};
export default useCreateAlbum;
