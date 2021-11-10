import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Icon from "@ant-design/icons";
import axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    console.log(files.length);
    const image = new Image();
    let fr = new FileReader();

    fr.onload = function () {
      if (fr !== null && typeof fr.result == "string") {
        image.src = fr.result;
      }
    };
    fr.readAsDataURL(files[0]);

    image.onload = async function () {
      console.log("찾았다!");
      console.log(image.width);
      console.log(image.height);
      console.log(props.name);
    };

    if (files.length > 1) {
      alert("하나씩 업로드해 주세요");
      return;
    }

    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/createFile", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.filePath]);
        props.refreshFunction([...Images, response.data.filePath]);
      } else {
        alert("파일 저장 실패");
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    console.log("currentIndex" + currentIndex);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "350",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ maxWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:8080/upload/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
