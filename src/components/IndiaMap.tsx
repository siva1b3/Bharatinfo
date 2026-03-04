import { useState, memo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import DistrictPanel from "./DistrictPanel";
import { getDistrictInfo, DistrictInfo } from "@/data/districtData";

const INDIA_TOPO_URL = "/india-topo.json";

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
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo | null>(null);

  const handleClick = useCallback((label: string) => {
    setSelectedLabel(label);
    setSelectedDistrict(getDistrictInfo(label));
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden p-0 m-0">
      {/* Map */}
      <div
        className="flex-1 h-full flex items-center justify-center"
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
          style={{ width: "auto", height: "100%" }}
        >
          <ZoomableGroup>
            <Geographies geography={INDIA_TOPO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.st_nm || "Unknown";
                  const districtName =
                    geo.properties.district ||
                    geo.properties.dt_nm ||
                    geo.properties.DISTRICT ||
                    "";
                  const label = districtName
                    ? `${districtName}, ${stateName}`
                    : stateName;
                  const hue = getStateColor(stateName);
                  const isSelected = label === selectedLabel;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setTooltipContent(label)}
                      onMouseLeave={() => setTooltipContent("")}
                      onClick={() => handleClick(label)}
                      style={{
                        default: {
                          fill: isSelected
                            ? `hsl(${hue}, 70%, 50%)`
                            : `hsl(${hue}, 45%, 72%)`,
                          stroke: isSelected
                            ? "hsl(0, 0%, 100%)"
                            : "hsl(var(--foreground) / 0.25)",
                          strokeWidth: isSelected ? 1 : 0.3,
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

      {/* Right Panel */}
      <div className="w-80 h-full border-l border-border bg-background/95 backdrop-blur-sm flex-shrink-0">
        <DistrictPanel districtInfo={selectedDistrict} />
      </div>

      <Tooltip
        id="india-tooltip"
        className="!bg-popover !text-popover-foreground !border !border-border !rounded-lg !px-3 !py-1.5 !text-sm !font-medium !shadow-md !z-50"
      />
    </div>
  );
};

export default memo(IndiaMap);
