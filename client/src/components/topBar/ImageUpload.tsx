import React, { useRef } from "react";
import { IconButton } from "@mui/material";
import { Camera } from "phosphor-react";
import { useRecoilState } from "recoil";
import axios from "axios";

import useToast from "../../hooks/useToast";
import { userState } from "../../store/atoms/userAtom";
import { UpdateImage } from "../../Types/zod";

const ImageUploadButton = () => {
  const { successToast, errorToast } = useToast();
  const [user, setUser] = useRecoilState(userState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = async (event) => {
        const updatedImage = event.target?.result as string;

        try {
          const requestData: UpdateImage = {
            id: user.info?.id!,
            image: updatedImage,
          };
          const response = await axios.put(
            "http://localhost:3000/updateImage",
            requestData,
            { withCredentials: true }
          );
          if (response.status === 200) {
            successToast(response.data.message);
          }
        } catch (error: any) {
          errorToast("Error");
        }

        if (user.info && updatedImage) {
          setUser({ ...user, info: { ...user.info, image: updatedImage } });
        }
      };

      fileReader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      <IconButton
        sx={{
          position: "relative",
          overflow: "hidden",
          color: "black",
        }}
        onClick={handleImageUpload}
      >
        <Camera size={32} weight="duotone" />
      </IconButton>

      <input
        type="file"
        id="image-upload"
        accept="image/*"
        style={{
          display: "none",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default ImageUploadButton;
