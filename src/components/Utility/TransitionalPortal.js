import React, { Component } from "react";
import {
  Segment,
  TransitionablePortal,
} from "semantic-ui-react";

const transitions = ["fly up"];

export default class Portal extends Component {
  state = { animation: transitions[0], duration: 500 };

  render() {
    const { animation, duration } = this.state;
    const { title, portal } = this.props.content;

    return (
      <TransitionablePortal open={portal} transition={{ animation, duration }}>
        <Segment
          className="ui inverted segment"
          style={{
            left: "40%",
            position: "fixed",
            top: "50%",
            zIndex: 1000,
            backgroundColor: "black",
            width: "300px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            <p>{title}</p>
          </div>
        </Segment>
      </TransitionablePortal>
    );
  }
}
