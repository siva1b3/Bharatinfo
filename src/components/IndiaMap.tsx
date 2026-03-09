import { useState, useCallback, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { RotateCcw } from "lucide-react";


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

// Static sample data for the right panel table
const sampleConstituencies = Array.from({ length: 50 }, (_, i) => ({
  name: `Constituency ${i + 1}`,
  type: ["General", "SC", "ST", "General", "General"][i % 5],
}));

const sampleTimeline = [
  { date: "15 Mar 2024", title: "District Survey Completed", description: "Census and demographic survey finalized for all blocks.", location: "Block HQ", image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=200&h=120&fit=crop" },
  { date: "02 Feb 2024", title: "New School Inaugurated", description: "Government primary school opened in rural area.", location: "Village Center", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=120&fit=crop" },
  { date: "18 Jan 2024", title: "Road Construction Started", description: "National highway expansion project phase 2 begins.", location: "NH-44 Junction", image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=200&h=120&fit=crop" },
  { date: "05 Dec 2023", title: "Health Camp Organized", description: "Free medical checkup for 500+ villagers conducted.", location: "PHC Compound", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=200&h=120&fit=crop" },
  { date: "20 Nov 2023", title: "Panchayat Election Results", description: "Local body election results declared for all wards.", location: "Collectorate", image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=200&h=120&fit=crop" },
  { date: "10 Oct 2023", title: "Water Project Approved", description: "Jal Jeevan Mission pipeline project sanctioned.", location: "Taluk Office", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=200&h=120&fit=crop" },
  { date: "01 Sep 2023", title: "Crop Damage Assessment", description: "Flood damage assessment completed for kharif season.", location: "Agricultural Office", image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=200&h=120&fit=crop" },
  { date: "15 Aug 2023", title: "Independence Day Celebration", description: "Flag hoisting and cultural programs across the district.", location: "District Stadium", image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=200&h=120&fit=crop" },
];

const IndiaMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({ coordinates: [82, 22], zoom: 1 });
  const [selectedDistrict, setSelectedDistrict] = useState<{ district: string; state: string } | null>(null);

  const handleReset = useCallback(() => {
    setPosition({ coordinates: [82, 22], zoom: 1 });
  }, []);

  const handleMoveEnd = useCallback((pos: { coordinates: [number, number]; zoom: number }) => {
    setPosition(pos);
  }, []);

  const handleDoubleClick = useCallback((geo: any) => {
    const stateName = geo.properties.st_nm || "Unknown";
    const districtName = geo.properties.district || geo.properties.dt_nm || geo.properties.DISTRICT || stateName;
    setSelectedDistrict({ district: districtName, state: stateName });
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left panel: Timeline */}
      <div className="w-[640px] flex-shrink-0 h-full flex flex-col border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">
            {selectedDistrict ? `Timeline: ${selectedDistrict.district}` : "Double-click a district"}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {selectedDistrict ? (
            <div className="relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
              {sampleTimeline.map((item, i) => (
                <div key={i} className="relative mb-6 last:mb-0">
                  <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  <p className="text-xs text-muted-foreground mb-1">{item.date} · {item.location}</p>
                  <h3 className="text-sm font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-24 object-cover rounded-md border border-border"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              No district selected
            </div>
          )}
        </div>
      </div>

      {/* Center: Map - takes all remaining space */}
      <div className="relative h-full flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Floating tooltip at center top */}
        {tooltipContent && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-lg bg-popover text-popover-foreground border border-border shadow-md text-sm font-medium pointer-events-none">
            {tooltipContent}
          </div>
        )}
        {/* Floating reset button at center bottom */}
        {position.zoom !== 1 && (
          <button
            onClick={handleReset}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-popover text-popover-foreground border border-border shadow-md hover:bg-accent transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Fit to screen
          </button>
        )}
        <div className="flex-1 w-full h-full">
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
              filterZoomEvent={(evt) => evt.type === "wheel"}
            >
              <Geographies geography={INDIA_TOPO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.st_nm || "Unknown";
                    const districtName = geo.properties.district || geo.properties.dt_nm || geo.properties.DISTRICT || "";
                    const label = districtName ? `${districtName}, ${stateName}` : stateName;
                    const hue = getStateColor(stateName);
                    const isSelected = selectedDistrict &&
                      selectedDistrict.district === (districtName || stateName) &&
                      selectedDistrict.state === stateName;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setTooltipContent(label)}
                        onMouseLeave={() => setTooltipContent("")}
                        onDoubleClick={() => handleDoubleClick(geo)}
                        style={{
                          default: {
                            fill: isSelected ? `hsl(${hue}, 70%, 45%)` : `hsl(${hue}, 45%, 72%)`,
                            stroke: isSelected ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.25)",
                            strokeWidth: isSelected ? 0.8 : 0.3,
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
      </div>

      {/* Right panel: Table */}
      <div className="w-80 flex-shrink-0 h-full flex flex-col border-l border-border bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">
            {selectedDistrict
              ? `${selectedDistrict.district}, ${selectedDistrict.state}`
              : "Double-click a district"}
          </h2>
          {selectedDistrict && (
            <p className="text-xs text-muted-foreground mt-1">State Assembly Constituencies</p>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {selectedDistrict ? (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-2 font-medium text-muted-foreground">Type</th>
                </tr>
              </thead>
              <tbody>
                {sampleConstituencies.map((c, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-2 text-foreground">{c.name}</td>
                    <td className="px-4 py-2 text-foreground">{c.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              No district selected
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default memo(IndiaMap);
