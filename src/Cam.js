import React, { useRef, useState } from "react";
import "./App.css";
import {jsPDF} from 'jspdf'
import {
  Flex,
  Heading,
  Input,
  Button,
  ChakraProvider,
  Box,
  Image
} from "@chakra-ui/react";

import { Camera } from "@material-ui/icons";
import Webcam from "react-webcam";

function Cam() {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null)

  const pdf = new jsPDF();

  if(image !== null){
      pdf.addImage(image, "jpg", 20, 40, 300, 300);
      pdf.save("avatar")
  }

  const capture = () => {
    const img = webcamRef.current.getScreenshot();
    setImage(img)
  };

  return (
    <ChakraProvider>
      <Flex
        height="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box style={{ width: 400, height: 500, borderRadius: 10 }} bg="#f1f1f1">
          <Webcam
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            imageSmoothing
            screenshotFormat="image/jpeg"
          />
        </Box>
        <Button
          onClick={capture}
          style={{ marginTop: 10 }}
          leftIcon={<Camera />}
        >
          Capture
        </Button>

        

      </Flex>
    </ChakraProvider>
  );
}

const videoConstraints = {
  width: 1080,
  height: 1000,
  facingMode: "user",
};

export default Cam;
