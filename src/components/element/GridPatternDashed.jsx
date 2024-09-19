"use client";

import { cn } from "../../lib/utils";
import GridPattern from "../magicui/grid-pattern";

const GridPatternDashed = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-lg p-20 ">
      <div>

      </div>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
};

export default GridPatternDashed;
