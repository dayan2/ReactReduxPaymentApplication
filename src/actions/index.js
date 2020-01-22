import { SAVE_CARD } from "../constants/index";

export function saveCard(payload) {
      return { type: SAVE_CARD, payload }
  };