import React from "react";
import ToggleButton from "./toggleButton";
import { faVolumeUp, faVolumeMute, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

const VideoChat = () => {
  const [mute, setMute] = React.useState(false);
  const [video, setVideo] = React.useState(false);

  const HandleVoiceToggle = () => {
    setMute((prevMute) => !prevMute);
  };

  const HandleVideoToggle = () => {
    setVideo((prevVideo) => !prevVideo);
  };

  return (
    <>
      <div className="text-white text-2xl">
        {/* <h1 className="text-white">This is videochat page</h1> */}
        <video
          className="w-full h-full bg-black"
          src=""
          id="user-1"
          autoPlay
          playsInline
        ></video>

        <div>
          <ToggleButton
            initialState={mute}
            onToggle={HandleVoiceToggle}
            labels={["Mute", "Unmute"]}
            label="Voice"
            icons={[faVolumeMute, faVolumeUp]}
          />
          <ToggleButton
            initialState={video}
            onToggle={HandleVideoToggle}
            labels={["Video Off", "Video On"]}
            label="Video"
            icons = {[faVideo,faVideoSlash]}
          />
        </div>
        {/* <video
          className="w-full h-80 bg-black"
          src=""
          id="user-2"
          autoPlay
          playsInline
        ></video>
        <video
          className="w-full h-80 bg-black"
          src=""
          id="user-3"
          autoPlay
          playsInline
        ></video>
        <video
          className="w-full h-80 bg-black"
          src=""
          id="user-4"
          autoPlay
          playsInline
        ></video> */}
      </div>
    </>
  );
};

export default VideoChat;
