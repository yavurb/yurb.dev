import type { PacketPongGame } from "./types";

export type { PacketPongGame, EggEvent, Emit, MatchStats } from "./types";

/**
 * 👉 Plug your game in here.
 *
 * Return a new instance of your implementation, e.g.:
 *
 *   import { createPacketPong } from "./game";
 *   export const createGame = (): PacketPongGame | null => createPacketPong();
 *
 * While this returns null, the Easter egg runs on the mock in ./mock.ts.
 */
export const createGame = (): PacketPongGame | null => null;
