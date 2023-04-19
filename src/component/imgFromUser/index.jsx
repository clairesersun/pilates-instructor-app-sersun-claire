//maybe use this in settings????
//I DO not think I want to use this

import "style.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfilePhoto() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });
  return (
    <div>
      {data.map((singleData) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(singleData.img.data.data))
        );
        return (
          <Image
            src={`data:image/png;base64,${base64String}`}
            width="300"
            key="profileImg"
            alt="profile image"
          />
        );
      })}
    </div>
  );
}
