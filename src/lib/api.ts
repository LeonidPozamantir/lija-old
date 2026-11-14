import Game from "@/entities/game";
import Convertor from "@/lib/convertor";
import axios from "axios";


const api = axios.create({
  baseURL: "/",
  withCredentials: true
});

export default api;


export const fetchGame = async (hash: string) => {
  const gameData = (await api.get(`/api/game/${hash}`)).data;
  if (!gameData) {
    console.error(`Can't find game ${hash}`);
    return undefined;
  }

  const convertor = new Convertor();
  const resGame = convertor.convertGame(gameData);
  
  return resGame;
};



export const findPlayer = async (hash: string) => {
  const gameHash = hash.substring(0, 6);
  const playerHash = hash.substring(6, 10);

  const game: Game | undefined = await fetchGame(gameHash);

  const player = game?.getPlayerByHash(playerHash);
  return player;
}