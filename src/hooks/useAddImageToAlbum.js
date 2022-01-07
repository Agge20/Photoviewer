import { useState } from "react";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const useAddImageToAlbum = () => {
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const uuid = uuidv4();

  const addImage = async (id, imageFile) => {
    setError(false);
    setFinished(false);
    // create reference to where to store the image in storage
    const imageRef = ref(storage, `album/${id}`);
    // try to upload the image to the album
    try {
      await uploadBytes(imageRef, imageFile);
      // get the download url for the newly created image
      const downURL = await getDownloadURL(imageRef);

      // create a ref to the album where the image should be stored
      const albumRef = doc(db, "albums", id);
      updateDoc(albumRef, {
        images: arrayUnion({
          downUrl: downURL,
          id: uuid,
        }),
      });
      setFinished(true);
    } catch (err) {
      setError(err);
      setFinished(true);
    }
  };

  return {
    finished,
    error,
    addImage,
  };
};

export default useAddImageToAlbum;
