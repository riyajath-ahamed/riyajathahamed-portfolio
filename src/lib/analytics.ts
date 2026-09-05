import posthog from "posthog-js";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsProperties = Record<string, AnalyticsValue>;

export const ANALYTICS_EVENTS = {
  COLORMEMO_VIEWED: "colormemo_viewed",
  COLORMEMO_DIFFICULTY_SELECTED: "colormemo_difficulty_selected",
  COLORMEMO_GAME_STARTED: "colormemo_game_started",
  COLORMEMO_GUESS_SUBMITTED: "colormemo_guess_submitted",
  COLORMEMO_SCORE_SAVED: "colormemo_score_saved",
  COLORMEMO_SCORE_SAVE_FAILED: "colormemo_score_save_failed",
  COLORMEMO_LEADERBOARD_OPENED: "colormemo_leaderboard_opened",
  COLORMEMO_PLAY_AGAIN: "colormemo_play_again",
  GAME_VIEWED: "game_viewed",
  GAME_DRAW_STARTED: "game_draw_started",
  GAME_CIRCLE_SCORED: "game_circle_scored",
  GAME_SCORE_SAVED: "game_score_saved",
  GAME_SCORE_SAVE_FAILED: "game_score_save_failed",
  GAME_LEADERBOARD_OPENED: "game_leaderboard_opened",
  GAME_PLAY_AGAIN: "game_play_again",
  GAME_GRID_TOGGLED: "game_grid_toggled",
} as const;

export function captureEvent(
  event: string,
  properties?: AnalyticsProperties,
): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return;

  try {
    posthog.capture(event, properties);
  } catch {
    // Analytics must never interrupt gameplay.
  }
}