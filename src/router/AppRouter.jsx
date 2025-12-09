import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home";
import GameRoom from '../pages/GameRoom';
import DeckManager from '@/pages/deck/DeckManager';
import DeckBuilder from '@/pages/deck/AddDeck';
import List from '@/pages/deck/List';
import CollectionSearch from '@/pages/cardsearch/collection';
import CardSearchMain from '@/pages/cardsearch/index';
import CardInfo from '@/pages/cardsearch/cardInfo';
import Login from "@/pages/user/login";
import Register from "@/pages/user/register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/game" element={<GameRoom />} />
        <Route path="/deck-manager" element={<DeckManager />} />
        <Route path="/deck-builder" element={<DeckBuilder />} />
        <Route path="/deck-builder/:deckId" element={<DeckBuilder />} />
        <Route path="/deck-list/:deckId" element={<List />} />
        <Route path="/card-search/collection" element={<CollectionSearch />} />
        <Route path="/card-search/" element={<CardSearchMain />} />
        <Route path="/card-search/collection/:collectionId" element={<CardSearchMain />} />
        <Route path="/card-search/collection/:collectionId/:cardId" element={<CardInfo />} />
      </Routes>
    </BrowserRouter>
  )
}
