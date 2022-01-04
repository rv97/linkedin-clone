import React, { useState } from "react";
import { fireBaseAuth } from "./firebaseConfig";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const dispatch = useDispatch();

  const register = () => {
    if (!name) {
      return alert("Please enter full name");
    }

    createUserWithEmailAndPassword(fireBaseAuth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profile,
        }).then(() => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: name,
              photoUrl: profile,
            })
          );
        });
      })
      .catch((error) => alert(error));
  };
  async function loginToApp(e) {
    if (!email || !password) {
      return alert("Please enter the email and password to sign in");
    }
    e.preventDefault();
    await signInWithEmailAndPassword(fireBaseAuth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoUrl,
          })
        );
      })

      .catch((error) => alert(error));

    // onAuthStateChanged(fireBaseAuth, (user) => {
    //   console.log("User", user);
    //   if (user) {
    //     dispatch(
    //       login({
    //         email: user.email,
    //         uid: user.uid,
    //         displayName: user.displayName,
    //         photoUrl: user.photoUrl,
    //       })
    //     );
    //   } else {
    //     return alert("No user found!");
    //   }
    // });
  }
  return (
    <div className="login">
      <img
        src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks"
        alt=""
      />

      <form className="login_form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Full Name (Reqiured if registering)"
        />
        <input
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          type="text"
          placeholder="Profile Pic URL"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>
      <p>
        Not a member?
        <span className="login_register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
