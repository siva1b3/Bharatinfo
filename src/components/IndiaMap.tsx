import { useState, useCallback, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { RotateCcw } from "lucide-react";
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
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({ coordinates: [82, 22], zoom: 1 });

  const handleReset = useCallback(() => {
    setPosition({ coordinates: [82, 22], zoom: 1 });
  }, []);

  const handleMoveEnd = useCallback((pos: { coordinates: [number, number]; zoom: number }) => {
    setPosition(pos);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen bg-background overflow-hidden p-0 m-0">
      {position.zoom !== 1 && (
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-popover text-popover-foreground border border-border shadow-md hover:bg-accent transition-colors text-sm font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          Fit to screen
        </button>
      )}
      <div
        className="w-auto h-full"
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
          height={850}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            onMoveEnd={handleMoveEnd}
            filterZoomEvent={(evt) => {
              // Only allow wheel/scroll zoom, disable double-click zoom
              return evt.type === "wheel";
            }}
          >
            <Geographies geography={INDIA_TOPO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.st_nm || "Unknown";
                  const districtName = geo.properties.district || geo.properties.dt_nm || geo.properties.DISTRICT || "";
                  const label = districtName ? `${districtName}, ${stateName}` : stateName;
                  const hue = getStateColor(stateName);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setTooltipContent(label)}
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
