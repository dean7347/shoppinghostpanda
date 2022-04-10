import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import Icon from "@ant-design/icons";
import axios from "../../api/axiosDefaults";
function FileEdit(props) {
  const [Images, setImages] = useState([]);
  const [check, setCheck] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(`/api/product/products_by_id?id=${props.proId}`)
  //     .then((response) => {
  //       if (response.data.success) {
  //         // setProduct(response.data);
  //         //console.log("가져온기라");

  //         //console.log(response.data);
  //         if (props.type === "thumb") {
  //           response.data.thumbs.map((i, idx) => {
  //             Images.push(i.filepath);
  //           });
  //         }
  //         if (props.type === "detail") {
  //           response.data.detailImages.map((i, idx) => {
  //             Images.push(i.filepath);
  //           });
  //         }

  //         //console.log("셋팅완료");
  //         //console.log(Images);
  //       } else {
  //         alert("상세정보 가져오기를 실패했습니다");
  //       }
  //     });
  // }, []);

  useEffect(() => {
    // if (props.type === "thumb") {
    // //console.log("썸");
    // //console.log(props.imgarray);
    props.imgarray.map((i, idx) => {
      Images.push(i.filepath);
      props.refreshFunction([...Images, i.filePath]);
    });
    // }

    // if (props.type === "detail") {
    //   props.imgarrayThum.map((i, idx) => {
    //     Images.push(i.filepath);
    //   });
    // }
  }, [props.imgarray]);

  const dropHandler = (files) => {
    // //console.log(files);
    // //console.log(files.length);
    const filetype = files[0].type;

    if (
      !(
        filetype === "image/png" ||
        filetype === "image/jpg" ||
        filetype === "image/jpeg"
      )
    ) {
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
      // //console.log("어싱크펑션");

      // //console.log(fr);
      //상세이미지
      if (props.type === "detail") {
        if (image.width > 860) {
          alert("상세 이미지는 가로 860px 이하로 등록해주세요");
          setCheck(false);
          return;
        } else {
          formData.append("file", files[0]);
          formData.append("proId", props.proId);
          formData.append("type", "detail");
          axios.post("/api/fileedit", formData, config).then((response) => {
            setCheck(false);
            if (response.data.success) {
              setImages([...Images, response.data.filePath]);
              props.refreshFunction([...Images, response.data.filePath]);
            } else {
              //console.log("파일저장실패");
              //console.log(response.data);
              alert("파일 저장 실패");
            }
          });
        }
      }
      //썸네일
      if (props.type === "thumb") {
        if (image.width > 640 || image.height > 640) {
          alert("섬네일은 640px x 640px이하로 등록해주세요");
          setCheck(false);

          return;
        } else if (!(image.width === image.height)) {
          alert("섬네일의 가로세로크기가 같도록 등록해주세요");
        } else {
          const body = {
            proId: props.proId,
            type: "thumb",
          };
          formData.append("file", files[0]);
          formData.append("proId", props.proId);
          formData.append("type", "thumb");

          axios.post("/api/fileedit", formData, config).then((response) => {
            setCheck(false);

            if (response.data.success) {
              setImages([...Images, response.data.filePath]);
              props.refreshFunction([...Images, response.data.filePath]);
            } else {
              alert("파일 저장 실패");
            }
          });
          // axios.post("/api/amzonfile")
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
    //console.log(image);
    const body = {
      filepath: image,
    };
    axios.post("/api/deletefile ", body).then((response) => {
      if (response.data.success) {
        alert("파일이 삭제되었습니다");
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images];
        newImages.splice(currentIndex, 1);

        setImages(newImages);
        props.refreshFunction(newImages);
      } else {
        alert("파일 저장 실패");
      }
    });
    // // //console.log("currentIndex" + currentIndex);
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
              src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileEdit;
