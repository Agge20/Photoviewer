import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../context/AuthContext";

const useAddImageToAlbum = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const uuid = uuidv4();
  const { user } = useAuthContext();

  const addImage = async (id, imageFile) => {
    setError(false);
    setLoading(true);
    // create reference to where to store the image in storage
    const imageRef = ref(storage, `albums/${user.uid}/${id}/${uuid}`);
    // try to upload the image to the album
    try {
      await uploadBytes(imageRef, imageFile);
      // get the download url for the newly created image
      const downURL = await getDownloadURL(imageRef);

      // create a ref to the album where the image should be stored
      const albumRef = doc(db, "albums", id);
      // add the new image object to the image array
      updateDoc(albumRef, {
        images: arrayUnion({
          downUrl: downURL,
          id: uuid,
          test: downURL,
        }),
      });
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addImage,
  };
};

export default useAddImageToAlbum;
