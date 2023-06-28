import { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

export default function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative my-5 animate-fade-up rounded-xl bg-white p-2 shadow-xl dark:bg-stone-800 md:max-w-2xl">
      <p
        className="mt-auto animate-fade-up text-center text-gray-500 opacity-0 dark:text-gray-400 md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>{title}</Balancer>
      </p>
      {children}
    </div>
  );
}
