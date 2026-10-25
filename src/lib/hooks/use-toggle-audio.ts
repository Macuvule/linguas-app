// hooks/use-toggle-audio.ts
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import type { AudioSource } from "expo-audio";

export function useToggleAudio(source: AudioSource | null | undefined) {
  const player = useAudioPlayer(source ?? null);
  const status = useAudioPlayerStatus(player);

  function toggle() {
    if (!source) return;

    if (status.playing) {
      player.pause();
      player.seekTo(0);
    } else {
      player.seekTo(0);
      player.play();
    }
  }

  function stop() {
    if (status.playing) {
      player.pause();
      player.seekTo(0);
    }
  }

  return { toggle, stop, isPlaying: status.playing, hasAudio: !!source };
}