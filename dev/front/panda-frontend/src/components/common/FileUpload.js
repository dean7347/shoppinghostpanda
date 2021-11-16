import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Icon from "@ant-design/icons";
import axios from "axios";
import { file } from "../../../../../../../../AppData/Local/Microsoft/TypeScript/4.4/node_modules/@babel/types/lib/index";

function FileUpload(props) {
  const [Images, setImages] = useState([]);
  const [check, setCheck] = useState(false);

  const dropHandler = (files) => {
    console.log(files.length);
    console.log("파일타입체크");

    if (!(files[0].type === "image/png" || files.type[0] === "image/jpg")) {
      alert("jpg/png만 허용됩니다");
      return;
    }

    const image = new Image();
    let fr = new FileReader();

    fr.onload = function () {
      if (fr !== null && typeof fr.result == "string") {
        image.src = fr.result;
      }
    };
    fr.readAsDataURL(files[0]);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    image.onload = async function () {
      //상세이미지
      if (props.refreshFunction.name === "updateImages") {
        if (image.width > 860) {
          alert("상세 이미지는 가로 860px 이하로 등록해주세요");
          setCheck(false);
          return;
        } else {
          formData.append("file", files[0]);

          axios.post("/createFile", formData, config).then((response) => {
            setCheck(false);
            if (response.data.success) {
              setImages([...Images, response.data.filePath]);
              props.refreshFunction([...Images, response.data.filePath]);
            } else {
              alert("파일 저장 실패");
            }
          });
        }
      }
      //썸네일
      if (props.refreshFunction.name === "updateThumb") {
        if (image.width > 640 || image.height > 640) {
          alert("섬네일은 640px x 640px이하로 등록해주세요");
          setCheck(false);

          return;
        } else {
          formData.append("file", files[0]);

          axios.post("/createFile", formData, config).then((response) => {
            setCheck(false);
            if (response.data.success) {
              setImages([...Images, response.data.filePath]);
              props.refreshFunction([...Images, response.data.filePath]);
            } else {
              alert("파일 저장 실패");
            }
          });
        }

        if (!(image.width === image.height)) {
          alert("섬네일의 가로세로크기가 같도록 등록해주세요");
          setCheck(false);

          return;
        } else {
          formData.append("file", files[0]);

          axios.post("/createFile", formData, config).then((response) => {
            setCheck(false);
            if (response.data.success) {
              setImages([...Images, response.data.filePath]);
              props.refreshFunction([...Images, response.data.filePath]);
            } else {
              alert("파일 저장 실패");
            }
          });
        }
      }
    };

    if (files.length > 1) {
      alert("하나씩 업로드해 주세요");
      return;
    }

    // let formData = new FormData();
    // const config = {
    //   header: { "content-type": "multipart/form-data" },
    // };
    // formData.append("file", files[0]);
    // if (check) {
    //   axios.post("/createFile", formData, config).then((response) => {
    //     setCheck(false);
    //     if (response.data.success) {
    //       setImages([...Images, response.data.filePath]);
    //       props.refreshFunction([...Images, response.data.filePath]);
    //     } else {
    //       alert("파일 저장 실패");
    //     }
    //   });
    // }
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
