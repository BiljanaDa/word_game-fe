import React from "react";
import { Container, ListGroup } from "react-bootstrap";

const UsedWordsList = ({ usedWords }) => {
  return (
    <Container className="sidebar">
      <h3>Used Words:</h3>
      <ListGroup>
        {usedWords.map((word, index) => (
          <ListGroup.Item key={index}>{word}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UsedWordsList;
