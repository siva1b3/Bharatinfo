import { useState, useMemo, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";

const INDIA_TOPO_URL = "/india-topo.json";

// Generate a consistent color for each state based on its name
const stateColorMap = new Map<string, string>();
const hueStep = 23;
let hueIndex = 0;

const getStateColor = (stateName: string) => {
  if (!stateColorMap.has(stateName)) {
    const hue = (hueIndex * hueStep) % 360;
    hueIndex++;
    stateColorMap.set(stateName, `${hue}`);
  }
  return stateColorMap.get(stateName)!;
};

const IndiaMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-3xl font-bold text-foreground mb-6 tracking-tight">
        India
      </h1>
      <div
        className="w-full max-w-3xl rounded-xl border border-border bg-card shadow-lg overflow-hidden"
        data-tooltip-id="india-tooltip"
        data-tooltip-content={tooltipContent}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1000,
            center: [82, 22],
          }}
          width={700}
          height={750}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup>
            <Geographies geography={INDIA_TOPO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.st_nm || "Unknown";
                  const hue = getStateColor(stateName);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setTooltipContent(stateName)}
                      onMouseLeave={() => setTooltipContent("")}
                      style={{
                        default: {
                          fill: `hsl(${hue}, 45%, 72%)`,
                          stroke: "hsl(var(--foreground) / 0.25)",
                          strokeWidth: 0.3,
                          outline: "none",
                        },
                        hover: {
                          fill: `hsl(${hue}, 60%, 55%)`,
                          stroke: "hsl(var(--foreground) / 0.5)",
                          strokeWidth: 0.6,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: `hsl(${hue}, 65%, 45%)`,
                          stroke: "hsl(var(--foreground) / 0.5)",
                          strokeWidth: 0.6,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <Tooltip
        id="india-tooltip"
        className="!bg-popover !text-popover-foreground !border !border-border !rounded-lg !px-3 !py-1.5 !text-sm !font-medium !shadow-md !z-50"
      />
    </div>
  );
};

export default memo(IndiaMap);
