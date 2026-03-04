import { memo } from "react";
import { DistrictInfo } from "@/data/districtData";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin, Users, Ruler, BookOpen, Building2 } from "lucide-react";

interface DistrictPanelProps {
  districtInfo: DistrictInfo | null;
}

const partyColors: Record<string, string> = {
  BJP: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  INC: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  AAP: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  DMK: "bg-red-500/20 text-red-300 border-red-500/30",
  TMC: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "SHS(UBT)": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  SHS: "bg-amber-600/20 text-amber-200 border-amber-600/30",
  NCP: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  AIMIM: "bg-green-500/20 text-green-300 border-green-500/30",
  "CPI(M)": "bg-red-600/20 text-red-300 border-red-600/30",
};

const getPartyClass = (party: string) =>
  partyColors[party] || "bg-muted text-muted-foreground border-border";

const DistrictPanel = ({ districtInfo }: DistrictPanelProps) => {
  if (!districtInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3 px-4">
        <MapPin className="h-10 w-10 opacity-40" />
        <p className="text-sm text-center font-medium">
          Click on a district to view details
        </p>
        <p className="text-xs text-center opacity-60">
          Assembly constituencies &amp; district info will appear here
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            {districtInfo.district}
          </h2>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {districtInfo.state}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md border border-border bg-card p-2.5 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Population</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{districtInfo.population}</p>
          </div>
          <div className="rounded-md border border-border bg-card p-2.5 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Ruler className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Area</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{districtInfo.area}</p>
          </div>
          <div className="rounded-md border border-border bg-card p-2.5 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <BookOpen className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider font-medium">Literacy</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{districtInfo.literacy}</p>
          </div>
          <div className="rounded-md border border-border bg-card p-2.5 space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Building2 className="h-3 w-3" />
              <span className="text-[10px] uppercase tracking-wider font-medium">HQ</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{districtInfo.headquarters}</p>
          </div>
        </div>

        {/* Constituencies Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Assembly Constituencies ({districtInfo.constituencies.length})
          </h3>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] uppercase tracking-wider font-semibold">
                    Constituency
                  </TableHead>
                  <TableHead className="h-8 text-[10px] uppercase tracking-wider font-semibold">
                    MLA
                  </TableHead>
                  <TableHead className="h-8 text-[10px] uppercase tracking-wider font-semibold">
                    Party
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {districtInfo.constituencies.map((c, i) => (
                  <TableRow key={i} className="hover:bg-muted/30">
                    <TableCell className="py-2 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-foreground">{c.name}</span>
                        {c.type !== "General" && (
                          <Badge
                            variant="outline"
                            className="text-[9px] px-1 py-0 h-4 font-medium"
                          >
                            {c.type}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-3 text-xs text-muted-foreground">
                      {c.currentMLA}
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 h-5 font-semibold ${getPartyClass(c.party)}`}
                      >
                        {c.party}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default memo(DistrictPanel);
