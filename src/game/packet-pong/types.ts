/**
 * The contract between the Easter egg UI (src/components/egg/EasterEgg.astro)
 * and the Packet Pong game.
 *
 * The UI owns the screens (Unlocked → Host/Join → Match → Result) and only
 * reacts to the events you emit. Your game owns signaling, WebRTC, physics
 * and rendering.
 */

export type MatchStats = {
  longestRally: number;
  avgRttMs: number;
  packetsLost: number;
};

export type EggEvent =
  /** Host only: the room exists — show this code to share. */
  | { type: "room"; code: string }
  /** A line for the connection log, e.g. "ICE candidates gathered". */
  | { type: "status"; text: string; done?: boolean }
  /** The data channels are open: the UI switches to the Match screen and calls mount(). */
  | { type: "connected" }
  /** Round-trip time to the peer, shown in the match header. */
  | { type: "rtt"; ms: number }
  /** Score changed (from this player's point of view). */
  | { type: "score"; you: number; peer: number }
  /** Match finished: the UI shows the Result screen. */
  | { type: "over"; you: number; peer: number; stats: MatchStats }
  /** Something failed (bad code, no route, peer left): the UI shows it and offers to go back. */
  | { type: "error"; message: string };

export type Emit = (event: EggEvent) => void;

export interface PacketPongGame {
  /** Create a room and wait for a peer. Emit "room", then "status" lines, then "connected". */
  host(emit: Emit): void;
  /** Join an existing room by code. Emit "status" lines, then "connected" (or "error"). */
  join(code: string, emit: Emit): void;
  /** Called after "connected": render the court into this element (canvas, DOM, whatever). */
  mount(container: HTMLElement): void;
  /** Both players agreed to play again. */
  rematch(): void;
  /** The overlay closed (Esc, ✕, "Back to the site"): close channels, stop loops, clean up. */
  destroy(): void;
}
