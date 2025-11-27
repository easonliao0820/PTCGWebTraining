import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import GameRoom from '../pages/GameRoom';
import DeckManager from '@/pages/deck/DeckManager';
import DeckBuilder from '@/pages/deck/AddDeck';
import CollectionSearch from '@/pages/cardsearch/collection';
import CardSearch from '@/pages/cardsearch/cards';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameRoom />} />
        <Route path="/deck-manager" element={<DeckManager />} />
        <Route path="/deck-builder" element={<DeckBuilder />} />
        <Route path="/card-search" element={<CollectionSearch />} />
        <Route path="/card-search/:collectionId" element={<CardSearch />} />
      </Routes>
    </BrowserRouter>
  )
}
