import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Scoreboard from './Scoreboard';
import Card from './Card';
import '../styles/Game.css';

const numCards = 6;
const numPokemon = 30;

const pokemonAPIURL = 'https://pokeapi.co/api/v2/pokemon/';

// Generates a random number from min to upper bound exclusive
function generateRandNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/* eslint-disable no-param-reassign */
// Shuffles an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
/* eslint-enable no-param-reassign */

function getCardName(data) {
  return data.name;
}

function getCardImage(data) {
  return data.sprites.front_default;
}

function getCardId(data) {
  return data.id;
}

const Game = () => {
  const [currScore, setCurrScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cardDataList, setCardDataList] = useState([]);

  const [unseenIds, setUnseenIds] = useState(Array.from({ length: numPokemon }, (_, i) => i + 1));
  const [seenIds, setSeenIds] = useState([]);

  async function getPokemonData(id) {
    return fetch(pokemonAPIURL + id).then((response) => response.json());
  }

  async function randomizeCardData() {
    // Always unsure 1 unseen pokemon appears with maximum of 7
    const numNewCards = generateRandNum(
      Math.max(1, numCards - seenIds.length),
      Math.min(unseenIds.length, numCards) + 1,
    );
    const numSeenCards = numCards - numNewCards;

    const updatedCardData = [];

    // Unseen pokemon
    // Initialize duplicate arrays to avoid selecting duplicate cards
    let updatedUnseenIds = unseenIds;
    for (let i = 0; i < numNewCards; i += 1) {
      // Randomly select an id for an unseen pokemon and add it to the card data
      const unseenId = updatedUnseenIds[generateRandNum(0, updatedUnseenIds.length)];

      // Update the unseen and seen ids, change this unseen id to seen
      // Store in separate array to avoid duplicates and regeneration of random numbers
      updatedUnseenIds = updatedUnseenIds.filter((id) => id !== unseenId);
      updatedCardData.push(getPokemonData(unseenId));
    }

    // Seen pokemon
    let updatedSeenIds = seenIds;
    for (let i = 0; i < numSeenCards; i += 1) {
      // Randomly select a seen pokemon
      const seenId = updatedSeenIds[generateRandNum(0, updatedSeenIds.length)];
      updatedSeenIds = updatedSeenIds.filter((id) => id !== seenId);

      updatedCardData.push(getPokemonData(seenId));
    }

    // Update after seen pokemon to avoid a pokemon being chosen as unseen then seen
    setCardDataList(shuffleArray(await Promise.all(updatedCardData)));
  }

  function handleCardClick(cardId) {
    // If the card has been seen, reset the game
    if (seenIds.includes(cardId)) {
      // Reset seen and unseen ids
      setUnseenIds(Array.from({ length: numPokemon }, (_, i) => i + 1));
      setSeenIds([]);

      setHighScore(Math.max(highScore, currScore));
      setCurrScore(0);
    } else {
      setSeenIds(seenIds.concat(cardId));
      setUnseenIds(unseenIds.filter((id) => id !== cardId));
      setCurrScore(currScore + 1);
    }
  }

  useEffect(() => {
    // Change card data on score change
    if (currScore !== numPokemon) {
      randomizeCardData();
    } else {
      setHighScore(currScore);
    }
  }, [currScore]);

  return (
    <section className="game">
      <Scoreboard currScore={currScore} highScore={highScore} />
      {
        currScore === numPokemon ? (
          <div className="game-over">
            <h2>Game Over</h2>
          </div>
        ) : (
          <section className="card-container">
            {
              cardDataList.map((cardData) => (
                <Card
                  key={uniqid()}
                  caption={getCardName(cardData)}
                  imageUrl={getCardImage(cardData)}
                  onClick={() => { handleCardClick(getCardId(cardData)); }}
                />
              ))
            }
          </section>
        )
      }
    </section>
  );
};

export default Game;
