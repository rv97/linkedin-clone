import React, { useState, useEffect } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOptions from "./InputOptions";
import ImageIcon from "@material-ui/icons/Image";
import ArticleIcon from "@mui/icons-material/Article";
import EventIcon from "@mui/icons-material/Event";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import Post from "./Post";
import { db } from "./firebaseConfig";
import { addDoc, collection, getDocs, limit } from "firebase/firestore/lite";
import { Timestamp, query, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [isUseEffect, setIsUseEffect] = useState(false);

  useEffect(() => {
    async function getDbData() {
      const postsCollec = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"),
        limit()
      );
      const postSnapShot = await getDocs(postsCollec);
      setPosts(
        postSnapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    }

    getDbData();
    setIsUseEffect(false);
    console.log(posts);
  }, [isUseEffect, posts]);

  async function sendPost(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        username: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || "",
        timestamp: Timestamp.now().toDate(),
      });

      console.log("Document Added! ", docRef.id);
      setInput("");
      setIsUseEffect(true);
    } catch (e) {
      console.log("Error adding doc: ", e);
    }
  }
  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <CreateIcon />
          <form>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Start a post"
            />
            <button type="submit" onClick={sendPost}>
              Send
            </button>
          </form>
        </div>
        <div className="feed_inputOptions">
          <InputOptions Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOptions
            Icon={SubscriptionsIcon}
            title="Event"
            color="#E7A33E"
          />
          <InputOptions Icon={EventIcon} title="Event" color="#C0CBCD" />
          <InputOptions
            Icon={ArticleIcon}
            title="Write Article"
            color="#7FC15E"
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(
          ({ id, data: { username, description, message, photoUrl } }) => {
            return (
              <Post
                key={id}
                name={username}
                description={description}
                message={message}
                photoUrl={photoUrl}
              />
            );
          }
        )}
      </FlipMove>
    </div>
  );
}

export default Feed;
