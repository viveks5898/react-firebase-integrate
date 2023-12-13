import logo from "./logo.svg";
import "./App.css";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { imgDB } from "./firebase";
import { textDB } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
function App() {
  const [imgUrl, setImageURl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const handleUpload = (e) => {
    console.log("first", e.target.files[0]);
    const imgs = ref(imgDB, `imgs${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      getDownloadURL(data.ref).then((val) => {
        console.log("val", val);
        setImageURl(val);
      });
    });
  };

  const handleClick = async () => {
    const valref = collection(textDB, "txtData");
    await addDoc(valref, {
      title: title,
      content: content,
      imageUrl: imgUrl,
    });
  };

  const [data, setData] = useState([]);
  const getData = async () => {
    const valref = collection(textDB, "txtData");

    const dataDb = await getDocs(valref);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    
  };
  getData();
  return (
    <div className="App">
      <div className="text-center sm:mt-32">
        <h1 className="text-[40px] text-[dark] font-semibold">Add post </h1>
        <div className="flex flex-col gap-7 sm:w-[325px] m-auto sm:mt-11 border p-5 bg-[gray]">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={onTitleChanged}
            value={title}
            placeholder="title......."
          />
          <textarea
            class="shadow resize-y rounded-md appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            col="12"
            value={content}
            onChange={onContentChanged}
            rows={8}
            placeholder="content"
          />

          <input
            class="shadow resize-y rounded-md appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            onChange={(e) => handleUpload(e)}
          />
        </div>
        <div className="mt-8 ">
          <button
            className="bg-slate-200 hover:bg-black hover:text-white font-semibold"
            onClick={handleClick}
          >
            Add{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
