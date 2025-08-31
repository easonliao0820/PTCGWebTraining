import { Link } from 'react-router-dom'
export default function GameRoom() {
  return (
    <div className="page game-room">
      <h1>🎮 這是遊戲房間</h1>
      <Link to="/">回到首頁</Link>
    </div>
  )
}
