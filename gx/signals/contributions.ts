import { createSignal } from "@dilane3/gx";
import Contribution from "entities/contributions/Contribution";

export type ContributionState = {
  contributions: Contribution[];
  loading: boolean;
  hasMore: boolean;
  total: number;
};

export const contributionsSignals = createSignal<ContributionState>({
  name: "contributions",
  state: {
    contributions: [],
    loading: false,
    hasMore: true,
    total: 0,
  },
  actions: {
    addContributions: (
      state,
      payload: { contributions: Contribution[]; hasMore: boolean; total: number }
    ) => {
      state.contributions = [...state.contributions, ...payload.contributions];
      state.hasMore = payload.hasMore;
      state.total = payload.total;

      return state;
    },

    addContribution: (state, payload: Contribution) => {
      state.contributions.push(payload);

      return state;
    },
  },
});
