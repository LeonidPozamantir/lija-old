// TODO: a temporary lib
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getGame(hash: string) {
    const filePath = path.join(process.cwd(), "src", "json", "dummy-game.json");
    const gameData = JSON.parse(await readFile(filePath, "utf8"));
    return gameData;
}

export const getUpdatedAt = async (hash: string) => {
  const game = await getGame(hash);
  if (!game) return undefined;
  return game.updatedAt;
}