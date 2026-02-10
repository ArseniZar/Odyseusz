import type { JSX } from "react";
import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { pageConfig } from "./config/page.config";

export const NotFoundPage = (): JSX.Element => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-15 px-20 overflow-hidden bg-(--main-bg-color) font-geologica font-medium text-lg text-(--main-text-color)">
        <div className="h-full flex flex-row justify-center">
          <div className="flex flex-col">
            <Title className="text-5xl font-normal" title={pageConfig.title} />
            <p className="mt-4 text-(--main-text-color)/80">
              {pageConfig.description}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
