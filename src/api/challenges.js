import { API } from "./auth";

export function fetchLastChallenges() {
  return API.get("/challenges/last");
}

export function completeChallenge(id) {
  return API.post(`/challenges/${id}/complete`);
}

export function fetchAllChallenges() {
  return API.get("/challenges");
}