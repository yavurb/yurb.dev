import type { Emit, PacketPongGame } from "./types";

/**
 * A fake game so the Easter egg UI can be clicked through end to end.
 * It pretends to connect, plays a looping CSS rally, ticks the score up
 * and ends 7–5. Replace it with your real implementation (see index.ts).
 */
export function createMockGame(): PacketPongGame {
  let emit: Emit = () => {};
  const timers: number[] = [];
  const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
  const clear = () => {
    timers.forEach((t) => window.clearTimeout(t));
    timers.length = 0;
  };

  const connect = (lines: string[]) => {
    lines.forEach((text, i) => later(500 + i * 700, () => emit({ type: "status", text, done: true })));
    later(500 + lines.length * 700, () => emit({ type: "status", text: "waiting for peer" }));
  };

  const play = () => {
    const points: [number, number][] = [
      [1, 0], [1, 1], [2, 1], [3, 1], [3, 2], [3, 3], [4, 3],
      [4, 4], [5, 4], [5, 5], [6, 5], [7, 5],
    ];
    emit({ type: "score", you: 0, peer: 0 });
    emit({ type: "rtt", ms: 42 });
    points.forEach(([you, peer], i) => {
      later(900 * (i + 1), () => {
        emit({ type: "score", you, peer });
        emit({ type: "rtt", ms: 38 + Math.round(Math.random() * 10) });
      });
    });
    later(900 * (points.length + 1), () =>
      emit({ type: "over", you: 7, peer: 5, stats: { longestRally: 14, avgRttMs: 42, packetsLost: 0 } }),
    );
  };

  return {
    host(e) {
      emit = e;
      later(300, () => emit({ type: "room", code: "OCTO-4F2A" }));
      connect(["signaling channel open", "ICE candidates gathered"]);
    },
    join(code, e) {
      emit = e;
      if (!/^OCTO-[A-Z0-9]{4}$/i.test(code.trim())) {
        later(400, () => emit({ type: "error", message: "That code doesn't look right — it should be like OCTO-4F2A." }));
        return;
      }
      later(400, () => emit({ type: "status", text: "room found", done: true }));
      later(1100, () => emit({ type: "status", text: "data channels open", done: true }));
      later(1600, () => emit({ type: "connected" }));
    },
    mount(container) {
      container.innerHTML = `
        <div class="egg-court" role="img" aria-label="Mock rally: your paddle on the left, the peer's on the right">
          <span class="egg-net"></span>
          <span class="egg-paddle egg-paddle--you"></span>
          <span class="egg-paddle egg-paddle--peer"></span>
          <span class="egg-ball"></span>
          <span class="egg-mock-tag">mock · your game mounts here</span>
        </div>`;
      play();
    },
    rematch() {
      clear();
      play();
    },
    destroy() {
      clear();
    },
  };
}

/** Lets the mock "host" pretend a peer joined (the UI shows a button for this in mock mode). */
export function simulatePeerJoin(emit: Emit) {
  emit({ type: "status", text: "peer joined", done: true });
  window.setTimeout(() => emit({ type: "connected" }), 400);
}
