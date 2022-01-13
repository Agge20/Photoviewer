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
      // try to upload image from imagePath
      for (let i = 0; i < images.length; i++) {
        let FILE;
        fetch(
          "https://firebasestorage.googleapis.com/v0/b/photoviewer-7f53f.appspot.com/o/albums%2F7XtzFURQjYNyqVew7Nzw%2F6c635408-4053-4ecb-91b0-b6b47ea23879.jpg?alt=media&token=9a89033a-53fa-414a-9b0f-cae2a07e4435.jpg"
        ).then(async (response) => {
          const contentType = response.headers.get("content-type");
          const blob = await response.blob();
          const file = new File([blob], "test", { contentType });
          // access file here
          FILE = file;
        });

        await uploadBytes(ref(storage, `albums/test/}`, FILE));
      }

      // wait for getting the downloadURL from the newly created cover image
      const downURL = await getDownloadURL(coverRef);
      // now we try to combine all the album data and add it as a document
      await addDoc(colRef, {
        ...albumData,
        images: [...images],
        coverUrl: downURL,
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
