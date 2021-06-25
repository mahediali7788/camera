import React, { useRef } from "react";
import "./App.css";
import {
  Flex,
  Heading,
  Input,
  Button,
  ChakraProvider,
  Box,
  Image,
} from "@chakra-ui/react";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";

import { Camera } from "@material-ui/icons";
import Webcam from "react-webcam";

function App() {
  const webcamRef = React.useRef<Webcam>(null);
  const [image, setImage] = React.useState<string | null | undefined>(null);
  const [mode, setMode] = React.useState("user");

  const capture = () => {
    const img = webcamRef.current?.getScreenshot({
      width: 1920,
      height: 1080,
    });
    setImage(img);
  };

  const videoConstraints = {
    width: 1080,
    height: 1000,
    facingMode: mode,
  };

  const handleFacingMode = () => {
      setMode((mode === 'user')?"environment":"user")
  };

  return (
    <ChakraProvider>
      <Flex
        height="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: "#123456" }}
      >
        <Box style={{ width: 400, height: 500, borderRadius: 10 }} bg="#f1f1f1">
          <Webcam
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            imageSmoothing
            width={400}
            style={{
              borderRadius: 10,
              height: 500,
            }}
            screenshotFormat="image/jpeg"
          />
        </Box>
        <Flex flexDirection="row" alignItems="center">
          <Button
            onClick={capture}
            style={{ marginTop: 10 }}
            leftIcon={<Camera />}
          >
            Capture
          </Button>
          <FlipCameraAndroidIcon
            onClick={handleFacingMode}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: 10,
              width: 50,
              height: 43,
              borderRadius: 10,
              marginTop: 10,
              marginLeft: 20,
            }}
          />
        </Flex>

        {image && <Image boxSize="500px" objectFit="cover" src={image} />}
      </Flex>
    </ChakraProvider>
  );
}

export default App;
