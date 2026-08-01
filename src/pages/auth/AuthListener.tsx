import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../../redux/hooks";
import { auth } from "../../firebase/firebase.init";
import { setLoading, setUser } from "../../redux/features/auth/authSlice";

export default function AuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.email || !user.displayName) {
          dispatch(setUser(null));
          dispatch(setLoading(false));
          return;
        }
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
          }),
        );
      } else {
        dispatch(setUser(null));
      }

      dispatch(setLoading(false));
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
}
