
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const useUpdateAlbum = (id) => {
  // hook-function to update an album title
  const updateTitle = async (title) => {
    const albumRef = doc(db, "albums", id);
    await updateDoc(albumRef, {
      title,
    });
  };
  return {
    updateTitle,
  };
};

export default useUpdateAlbum;
