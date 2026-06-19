import { DashboardClient } from "../components/dashboard-client";
import { predictMany } from "../lib/prediction";
import { loadStore } from "../lib/store";

export default async function HomePage() {
  const store = await loadStore();
  const predictions = predictMany(store.fixtures, store.teams, store.players, store.odds, store.sentiment);

  return <DashboardClient store={store} predictions={predictions} />;
}
