import { DashboardClient } from "../components/dashboard-client";
import { getEnrichedFixtureBundles } from "../lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const { store, matches } = await getEnrichedFixtureBundles();
  const predictions = matches.flatMap((match) => match.prediction ? [match.prediction] : []);
  const reviewPredictions = matches.flatMap((match) => match.reviewPrediction ? [match.reviewPrediction] : []);

  return <DashboardClient store={store} matches={matches} predictions={predictions} reviewPredictions={reviewPredictions} />;
}
