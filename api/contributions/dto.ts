import { ContributionType } from "entities/contributions/Contribution";

export type CreateContributionDto = {
  amount: number;
  type: ContributionType;
  ownerId: string;
};
