import { useState } from "react";

import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const useCreateAlbum = () => {
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  // create a new album document
  const createAlbum = async (collectionName, albumData, coverFile) => {
    setFinished(false);
    setLoading(true);
    console.log("coverFile", coverFile);
    console.log("albumData: ", albumData);
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
        url: downURL,
        coverId,
      });
      setFinished(true);
      setLoading(false);
    } catch (err) {
      console.log("error uploading cover... ", err);
      setLoading(false);
      setFinished(false);
    }
  };

  return { createAlbum, finished, setFinished, loading };
};
export default useCreateAlbum;
