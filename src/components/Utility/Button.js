import { Button } from "semantic-ui-react";
import React, { useState } from "react";

function CustomButton({ content, color, loading }) {
  const [isPressed, setIsPressed] = useState(false);

  function handleClick() {
    setIsPressed(!isPressed);
  }
  return (
    <Button
      inverted
      color={color}
      fluid
      size="large"
      className={loading ? "loading" : ""}
      disabled={loading ? true : ""}
      onClick={handleClick}
    >
      {content}
    </Button>
  );
}
export default CustomButton;
