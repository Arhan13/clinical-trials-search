export const formatStatus = (status: string) => {
  // Convert status to title case and replace underscores with spaces
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export const formatPhase = (phase: string) => {
  // Handle special phase formats
  if (phase.includes("EARLY_PHASE")) {
    const phaseNumber = phase.replace("EARLY_PHASE", "");
    return `Early Phase ${phaseNumber}`;
  }

  // Convert phase like "PHASE1" to "Phase 1" or "PHASE2" to "Phase 2"
  if (phase.startsWith("PHASE")) {
    const phaseNumber = phase.replace("PHASE", "");
    return `Phase ${phaseNumber}`;
  }

  // Handle other formats - convert to title case and replace underscores
  return phase
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export const formatPhases = (phases: string[] | undefined) => {
  if (!phases || phases.length === 0) return "N/A";
  return phases.map(formatPhase).join(", ");
};
