"use client";
import { actToAlmostLocationSteps } from "@/lib/actData";
import { HighlightedText } from "@/lib/outlinks";

export const ActProgressView = (props: {
  checkedItems: Record<string, boolean>;
  handleCheckboxChange: (checkedItemKey: string) => void;
}) => (
  <div className="space-y-12">
    {Object.entries(actToAlmostLocationSteps).map(([act, almost], i) => (
      <section key={act} id={`act${act}`} className="scroll-m-20">
        <h2 className="text-2xl font-bold tracking-tight text-primary pb-4">
          --== ACT {act} ==--
        </h2>
        <div className="text-muted-foreground pb-12" key={act + i}>
          {almost.map((locationSteps, locationI) => (
            <div  key={locationSteps.title + locationI}>
              <div className="text-xl p-2 pt-4">{locationSteps.title}</div>
              <div>
                {locationSteps.steps.map((step, stepI) => (
                  <div className="flex flex-row gap-2" key={step}>
                    <input
                      type="checkbox"
                      checked={
                        props.checkedItems[locationSteps.title + locationI + stepI] || false
                      }
                      onChange={() =>
                        props.handleCheckboxChange(locationSteps.title + locationI + stepI)
                      }
                    />
                    <HighlightedText key={step} text={step} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);
