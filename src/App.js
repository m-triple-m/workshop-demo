import { IconCirclePlus } from "@tabler/icons-react";
import { useRef, useState } from "react";
import AddPost from "./AddPost";
import Feed from "./Feed";
import "./styles.css";

export default function App() {
  return (
    <div>
      <div className="flex justify-center items-center absolute"></div>
      <Feed />
    </div>
  );
}
