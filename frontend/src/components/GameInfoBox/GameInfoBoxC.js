import React from "react";
import GameInfoBox from "./GameInfoBox";

const GameInfoBoxC = ({ userId, targetColor, closestColor }) => {
  return (
    <GameInfoBox
      userId={userId}
      targetColor={targetColor}
      closestColor={closestColor}
    />
  );
};

export default GameInfoBoxC;
