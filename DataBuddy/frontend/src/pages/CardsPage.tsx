import { cn } from "../utils/twMerge";
import { DemoGithub } from "../components/cards/github-card";
import { DemoPaymentMethod } from "../components/cards/payment-method";
import React from 'react';

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

export default function CardsPage() {
  return (
    <>
      <div className=" items-start justify-center gap-6 rounded-lg p-8 grid lg:grid-cols-2 xl:grid-cols-3">

        <DemoContainer>
          <DemoPaymentMethod />
        </DemoContainer>

      </div>
    </>
  );
}
