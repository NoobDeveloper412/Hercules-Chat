import { Button } from "semantic-ui-react";
import React, { useState } from "react";

function CustomButton({ content, color, loading }) {
  const [isPressed, setIsPressed] = useState(false);

  function handleClick() {
    setIsPressed(!isPressed);
  }
  return (
    <Button
      fluid
      size="large"
      className={loading ? "loading" : ""}
      disabled={loading ? true : "" }
      onClick={handleClick}
      style={{
        backgroundColor: "#eee",
        boxShadow: isPressed
          ? ""
          : "0 20px 30px rgba(0,0,0,0.19), 0 10px 10px rgba(0,0,0,0.23)",
        padding: "15px",
        transition: "background-color 0.5s, box-shadow 0.5s",
      }}
    >
      <p style={{ color: color }}>{content}</p>
    </Button>
  );
}
export default CustomButton;
