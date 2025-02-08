"use client";

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const setting = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function ImpageUploadPage() {
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [myFunction] = useMutation(setting);

  const onChangeFile = (index) => async (event) => {
    const file = event.target.files[0]; // 배열로 들어오는 이유: <input type="file" multiple /> 일때, 여러개 드래그 가능
    console.log(file, "업로드파일");

    // const result = await uploadFile({ variables: { file } });
    // console.log(result.data.uploadFile.url, "url확인");
    // setImageUrl(result.data.uploadFile.url);

    // 1. 임시 URL 생성 => (가짜 URL - 내브라우저에서만 접근 가능)
    const result = URL.createObjectURL(file);
    console.log(result, "임시URL확인");

    // 2. 임시URL 생성 => (진짜URL - 다른 브라우저에서도 접근 가능. 하지만 용량 큼)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // console.log(abc, "파일리더기가 url읽기");
    // event.target.result => fileReader.readAsDataURL에 대한 결과
    fileReader.onload = (event) => {
      console.log(event.target?.result, "input이벤트 결과");
      if (typeof event.target?.result === "string") {
        const tempUrls = [...imageUrls];
        tempUrls[index] = event.target.result;
        setImageUrls(tempUrls);

        const tempFiles = [...files];
        tempFiles[index] = file;
        setFiles(tempFiles);
      }
    };
  };

  const onClickSubmit = async () => {
    // 1. 이미지 등록(uploadFile)
    // 1-1) 안좋은 예제 - await를 매번 기다리기 => for문 내에서 await 쓰지말기
    // const resultFile0 = await uploadFile({ variables: { file: files[0] } });
    // const resultFile1 = await uploadFile({ variables: { file: files[1] } });
    // const resultFile2 = await uploadFile({ variables: { file: files[2] } });
    // const resultUrls = [resultFile0.data.uploadFile.url, resultFile1.data.uploadFile.url, resultFile2.data.uploadFile.url];

    // 1-2) 좋은예제 promise.all 사용
    // const results = await Promise.all([
    //   await uploadFile({ variables: { file: files[0] } }),
    //   await uploadFile({ variables: { file: files[1] } }),
    //   await uploadFile({ variables: { file: files[2] } }),
    // ]);

    // console.log(results);
    // const resultUrls = results.map((el) => el.data.uploadFile.url); // [url0, url1, url2]

    // 1-3) 좋은예제 - Promise.all 사용 => 리팩토링
    const results = await Promise.all(
      files.map((el) => uploadFile({ variables: { file: el } }))
    );

    const resultsUrls = results.map((el) => el.data.uploadFile.furl); //[url0, url1, url2]
    console.log(results);

    // 2. 게시글 등록(createBoard)
    const result = await myFunction({
      variables: {
        createBoardInput: {
          writer: "철수",
          password: "1234",
          title: "제목입니다~~",
          contents: "내용입니다@@@",
          images: resultsUrls,
        },
      },
    });
    console.log(result);
  };

  return (
    <>
      <input type="file" onChange={onChangeFile(0)} />
      <input type="file" onChange={onChangeFile(1)} />
      <input type="file" onChange={onChangeFile(2)} />
      {/* <img src={`https://storage.googleapis.com/${imageUrl}`} alt="" /> */}
      <img src={imageUrls[0]} alt="" />
      <img src={imageUrls[1]} alt="" />
      <img src={imageUrls[2]} alt="" />
      <button onClick={onClickSubmit}> 버튼</button>
    </>
  );
}
