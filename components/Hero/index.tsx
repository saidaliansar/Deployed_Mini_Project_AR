"use client"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faLink } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NextUIProvider, Spinner } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import html2canvas from "html2canvas";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home(): JSX.Element {
  const [previewUrl, setPreviewUrl] = useState<string>('../../../../images/homescreen.mp4');
  const [image, setImage] = useState<File | null>(null);
  const [returnUrl, setReturnUrl] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { theme } = useTheme();

  const handleDownloadImage = () => {
    const modalContent = document.getElementById("modalContent");
    html2canvas(modalContent!, { backgroundColor: "#121417" }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = imgData;
      downloadLink.download = 'emotion_result.png';
      downloadLink.click();
    });
  };

  const onMediaChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImage(file);
    onMediaChange(file);
  };

  const onUploadClick = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    setIsLoading(true);
    setReturnUrl('');

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
  "https://ajaaz-deep-learning-cbt-sentioai.hf.space/predict",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

console.log(response.data); // 👈 ADD THIS

      setIsLoading(false);
      onOpen();

      // 🔥 Expecting emotion from backend
      setReturnUrl(response.data.emotion);

    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false);
    }
  };

  return (
    <NextUIProvider>
      <main className={`flex min-h-screen flex-col items-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>

        <br /><br /><br /><br />

        <div className="flex flex-col gap-10 m-5 my-11 max-w-3xl">
          <h1 className="text-5xl text-wrap font-extrabold">
            Improving Lives with Sentio<span className="text-green-500">AI</span>
          </h1>

          <h3 className="text-xl">
            Upload a facial image and our deep learning model will analyze and predict the emotional expression. Built using ResNet50 and deployed as a full-stack AI system.
          </h3>

          <h2 className="text-xl font-semibold">
            Upload an <span className="text-green-500">Face</span> Image
          </h2>

          {/* KEEP VIDEO INTACT */}
          <div className="rounded-xl">
            {image ? (
              <img className="w-full rounded-xl" src={previewUrl} alt="Image Preview" />
            ) : (
              <video autoPlay muted playsInline controls={false} className="w-full rounded-xl">
                <source src={previewUrl} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Upload */}
          <div className="flex justify-end px-5">
            <input
              type="file"
              id="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
            <label
              htmlFor="file"
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-xl cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
              <span>Upload Image</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end px-5">
            <button
              onClick={onUploadClick}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
              {isLoading ? (
                <Spinner color="default" />
              ) : (
                <>
                  <FontAwesomeIcon icon={faLink} />
                  <span>Analyze Emotion</span>
                </>
              )}
            </button>
          </div>

          {/* 🔥 UPDATED MODAL */}
          <Modal
            size="3xl"
            backdrop="blur"
            isOpen={isOpen}
            onClose={onClose}
            className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="text-center text-2xl font-bold">
                    Emotion Prediction Result
                  </ModalHeader>

                  <ModalBody className="flex flex-col items-center gap-6" id="modalContent">

                    {/* Uploaded Image */}
                    <div className="w-1/2">
                      <img
                        src={previewUrl}
                        alt="Uploaded"
                        className="rounded-xl shadow-lg"
                      />
                    </div>

                    {/* Emotion Label */}
                    <div className="text-center">
                      <p className="text-lg opacity-70">Detected Emotion</p>
                      <h2 className="text-4xl font-extrabold text-blue-500">
                        {returnUrl}
                      </h2>
                    </div>

                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={handleDownloadImage}>
                      Download
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

        </div>
      </main>
    </NextUIProvider>
  );
}

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-gray-2 dark:bg-dark-bg absolute right-17 mr-1.5 flex cursor-pointer items-center justify-center rounded-full text-black dark:text-white lg:static"
    >
      <Image
        src={theme === "light" ? "/images/icon/icon-sun.svg" : "/images/icon/icon-moon.svg"}
        alt="theme-toggle-icon"
        width={21}
        height={21}
      />
    </button>
  );
};
