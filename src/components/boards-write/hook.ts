"use client";

import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FETCH_BOARDS } from "./queries";
import { Address } from "react-daum-postcode";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  FetchBoardsDocument,
  UpdateBoardDocument,
  UploadFileDocument,
} from "@/common/gql/graphql";
import { IBoardWriteSchema } from "./schema";

export default function useBoardNew(props) {
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  const fileRef = useRef();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [youtubeUrl, setYoutubUrl] = useState("");
  const [juso, setJuso] = useState({
    zipcode: "",
    address: "",
    addressDetail: "",
  });

  const [input, setInput] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [errorMessage, setErrorMessage] = useState<{
    writer: "visible" | "hidden";
    password: "visible" | "hidden";
    title: "visible" | "hidden";
    contents: "visible" | "hidden";
  }>({
    writer: "visible",
    password: "visible",
    title: "visible",
    contents: "visible",
  });

  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [temporaryUrl, setTemporaryUrl] = useState<string[]>([]);
  const [registerCheck, setRegisterCheck] = useState(true);
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [uploadFile] = useMutation(UploadFileDocument);

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubUrl(event.target.value);
  };

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrorMessage({
      ...errorMessage,
      [event.target.name]: event.target.value === "" ? "visible" : "hidden",
    });

    if (!Object.values(input).every((el) => el === "")) setRegisterCheck(false);
  };

  const onClickSubmit = async (data: IBoardWriteSchema) => {
    console.log(data, "data확인");
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: data.writer,
            password: data.password,
            contents: data.contents,
            youtubeUrl: data.youtubeUrl,
            title: data.title,
            boardAddress: {
              ...juso,
            },
            images: imgUrl,
          },
        },
        refetchQueries: [{ query: FetchBoardsDocument }],
      });
      console.log("게시글 작성 결가", result);
      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (e) {
      console.log("에러메시지", e);
    }
  };
  // const onClickRegister = async () => {
  //   try {
  //     const result = await createBoard({
  //       variables: {
  //         createBoardInput: {
  //           ...input,
  //           youtubeUrl,
  //           boardAddress: {
  //             ...juso,
  //           },
  //           images: imgUrl,
  //         },
  //       },
  //       refetchQueries: [{ query: FetchBoardsDocument }],
  //     });
  //     console.log(result, "게시글 등록 결과");
  //     router.push(`/boards/${result.data?.createBoard._id}`);
  //   } catch (error) {
  //     let errorMessage;

  //     if (error instanceof ApolloError) {
  //       if (error.graphQLErrors && error.graphQLErrors.length > 0) {
  //         errorMessage = error.graphQLErrors[0].message;
  //       } else if (error.message) {
  //         errorMessage = error.message;
  //       }
  //     } else if (error instanceof Error) {
  //       errorMessage = error.message;
  //     }
  //     console.log("에러메시지", errorMessage);
  //   }
  // };

  const onClickEdit = async () => {
    try {
      await updateBoard({
        variables: {
          boardId: params.boardId,
          password: input.password,
          updateBoardInput: {
            title: input.title,
            contents: input.contents,
            youtubeUrl,
            boardAddress: {
              ...juso,
            },
            images: imageUrl,
          },
          refetchQueries: [{ query: FETCH_BOARDS }],
        },
      });

      router.push(`/boards/${params.boardId}`);
    } catch (error) {
      let errorMessage;

      if (error instanceof ApolloError) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          errorMessage = error.graphQLErrors[0].message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log("에러메시지", errorMessage);
    }
  };

  const onClickEditCancel = () => {
    router.push(`/boards/${params.boardId}`);
  };

  useEffect(() => {
    if (props.isEdit && data) {
      setInput({
        writer: data.fetchBoard.writer || "",
        password: "",
        title: data.fetchBoard.title || "",
        contents: data.fetchBoard.contents || "",
      });

      setErrorMessage({
        writer: "hidden",
        password: "visible",
        title: "hidden",
        contents: "hidden",
      });
    }
  }, [props.isEdit, data]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleComplete = (data: Address) => {
    setJuso({
      zipcode: data.zonecode,
      address: data.address,
      addressDetail: "",
    });

    setIsModalOpen((prev) => !prev);
  };

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setJuso({
      ...juso,
      addressDetail: event.target.value,
    });
  };

  const onChangeFile = async (event) => {
    const file = event?.target.files[0];
    const fakeUrl = URL.createObjectURL(file);
    setTemporaryUrl([fakeUrl]);

    const result = await uploadFile({
      variables: {
        file,
      },
    });

    console.log(result.data?.uploadFile.url, "결과");
    setImgUrl([result.data?.uploadFile.url ?? ""]);
  };

  const onClickImage = () => {
    fileRef.current.click();
  };

  // const onClickDeleteImage = (index) => {
  //   const deleteUrl = [...imageUrl];
  //   deleteUrl[index] = "";
  //   setImageUrl(deleteUrl);
  // };

  // useEffect(() => {
  //   console.log("juso state updated:", juso);
  // }, [juso]);

  return {
    data,
    registerCheck,
    errorMessage,
    isModalOpen,
    juso,
    youtubeUrl,
    fileRef,
    // imageUrl,
    onChangeInput,
    onClickSubmit,
    onClickEdit,
    onClickEditCancel,
    showModal,
    handleOk,
    handleCancel,
    handleComplete,
    onChangeAddress,
    onChangeYoutubeUrl,
    onChangeFile,
    onClickImage,
    imgUrl,
    temporaryUrl,
    // onClickDeleteImage,
  };
}
