import Generator from "@/chess/generator";
import Game from "@/entities/game";
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

  const generator = new Generator();
  const resGame = generator.createGame();
  
  return resGame;
};