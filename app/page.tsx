import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import Graph from "@/components/home/graph";

export default async function Home() {
  const platform = process.env.NEXT_PUBLIC_PLATFORM;
  const className = (platform === "ios") ? "mt-14 w-full" : "mt-4 w-full";

  return (
    <>
      <div className={className}>
        <h1
          className="animate-fade-up bg-gradient-to-t from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent dark:from-stone-300 dark:to-white"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Dewpoint Tracker</Balancer>
        </h1>
      </div>
      {
        <Card title="Dewpoint in Phoenix for Last 30 Days">
          <Graph />
        </Card>
      }
    </>
  );
}
