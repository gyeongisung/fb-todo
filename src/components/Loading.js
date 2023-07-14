import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  const styleObj = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    background: "rgba(0,0,0,0.8)",
    zIndex: 9999999999,
  };
  return (
    <div style={styleObj}>
      <HashLoader
        color="#36d7b7"
        cssOverride={{}}
        size={200}
        speedMultiplier={2}
      />
    </div>
  );
};

export default Loading;
