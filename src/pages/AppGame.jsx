import React, { useState } from "react";
import GameService from "../services/game.service";
import { Alert, Button, Container, Form } from "react-bootstrap";
import UsedWordsList from "../components/UsedWordsList";

export default function AppGame() {
  const [data, setData] = useState({ word: "" });
  const [scores, setScores] = useState([]);
  const [wordScore, setWordScore] = useState(null);
  const [usedWords, setUsedWords] = useState([]);
  const [error, setError] = useState("");
  const [usedWordError, setUsedWordError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usedWords.includes(data.word.toLowerCase())) {
        setError("");
        setUsedWordError(true);
        return;
      }
      const response = await GameService.wordsGame(data);
      if (response) {
        setData({ ...data, word: "" });
        if (response.score) {
          const newScores = [...scores, response.score];
          setScores(newScores);
          setWordScore(response.score);
          setUsedWords([...usedWords, data.word.toLowerCase()]);
          setUsedWordError(false);
        }
        if (response.error) setError(response.error);
      }
    } catch (error) {
      setError("There was an error processing your request.");
    }
  };

  const totalScore = scores.reduce((acc, curr) => acc + curr, 0);

  return (
    <Container>
      <h1 className="mb-3">Word game</h1>
      <p>
        Welcome to the Word game! Here are the rules:
        <br />
        - You can enter a word, but it must be a valid English word.
        <br />
        - You will score points based on the following rules:
        <br />
        &nbsp;&nbsp;&nbsp; a) You will get 1 point for each unique letter in the
        word.
        <br />
        &nbsp;&nbsp;&nbsp; b) If the word is a palindrome, you will get 3 extra
        points.
        <br />
        &nbsp;&nbsp;&nbsp; c) If the word is "almost palindrome" (if by removing
        at most one letter from the word, the word will be a true palindrome),
        you will get 2 extra points.
        <br />- You cannot enter the same word more than once.
      </p>
      <UsedWordsList usedWords={usedWords} />
      <br />
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            required
            value={data.word}
            onChange={(e) => {
              setData({ ...data, word: e.target.value });
              setError("");
              setWordScore(null);
              setUsedWordError(false);
            }}
            type="text"
            placeholder="Enter your word here"
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Check word
        </Button>
      </Form>
      {wordScore !== null && (
        <Alert variant="info">This word scores: {wordScore}</Alert>
      )}
      {totalScore !== 0 && (
        <Alert variant="success">Total score: {totalScore}</Alert>
      )}
      {usedWordError && (
        <Alert variant="danger">This word has already been used.</Alert>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
}
