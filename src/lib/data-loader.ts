import {
  ClinicalTrial,
  SearchParams,
  SearchResult,
  SearchFilters,
} from "@/types/clinical-trials";
import fs from "fs";
import path from "path";

let clinicalTrialsData: ClinicalTrial[] | null = null;

// Load data from JSON file
export function loadClinicalTrialsData(): ClinicalTrial[] {
  if (clinicalTrialsData) {
    return clinicalTrialsData;
  }

  try {
    const dataPath = path.join(
      process.cwd(),
      "clinical-trials",
      "ctg-studies.json"
    );
    const rawData = fs.readFileSync(dataPath, "utf8");
    clinicalTrialsData = JSON.parse(rawData) as ClinicalTrial[];
    return clinicalTrialsData;
  } catch (error) {
    console.error("Error loading clinical trials data:", error);
    return [];
  }
}

// Advanced text normalization for better matching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Replace non-word characters with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();
}

// Create search terms with common variations
function generateSearchVariations(term: string): string[] {
  const normalized = normalizeText(term);
  const variations = new Set([normalized]);

  // Add common abbreviation patterns
  const words = normalized.split(" ");
  if (words.length > 1) {
    // Add acronym
    const acronym = words.map((word) => word.charAt(0)).join("");
    variations.add(acronym);

    // Add hyphenated version
    variations.add(words.join("-"));

    // Add compact version (no spaces)
    variations.add(words.join(""));
  }

  return Array.from(variations);
}

// Check if search term matches text with fuzzy matching
function fuzzyMatch(
  searchTerm: string,
  text: string,
  threshold: number = 0.8
): boolean {
  const searchVariations = generateSearchVariations(searchTerm);
  const normalizedText = normalizeText(text);

  // Exact match check
  for (const variation of searchVariations) {
    if (normalizedText.includes(variation)) {
      return true;
    }
  }

  // Fuzzy matching for partial matches
  const searchWords = normalizeText(searchTerm).split(" ");
  const textWords = normalizedText.split(" ");

  let matchCount = 0;
  for (const searchWord of searchWords) {
    for (const textWord of textWords) {
      if (searchWord.length > 2 && textWord.includes(searchWord)) {
        matchCount++;
        break;
      }
    }
  }

  return matchCount / searchWords.length >= threshold;
}

// Search function with enhanced text matching
function searchInTrial(trial: ClinicalTrial, query: string): boolean {
  const searchableFields = [
    trial.protocolSection.identificationModule.briefTitle,
    trial.protocolSection.identificationModule.officialTitle,
    trial.protocolSection.descriptionModule?.briefSummary,
    trial.protocolSection.descriptionModule?.detailedDescription,
    ...(trial.protocolSection.conditionsModule?.conditions || []),
    ...(trial.protocolSection.conditionsModule?.keywords || []),
    trial.protocolSection.sponsorCollaboratorsModule.leadSponsor.name,
    ...(trial.protocolSection.armsInterventionsModule?.interventions?.map(
      (i) => `${i.name} ${i.description || ""}`
    ) || []),
  ].filter(Boolean);

  // Check if query matches any field
  return searchableFields.some((field) => fuzzyMatch(query, field as string));
}

// Apply filters to trials
function applyFilters(
  trials: ClinicalTrial[],
  filters: SearchFilters
): ClinicalTrial[] {
  return trials.filter((trial) => {
    // Phase filter
    if (filters.phase && filters.phase.length > 0) {
      const phases = trial.protocolSection.designModule?.phases || [];
      const hasMatchingPhase = phases.some((phase) =>
        filters.phase!.includes(phase)
      );
      if (!hasMatchingPhase) return false;
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      const status = trial.protocolSection.statusModule.overallStatus;
      if (!filters.status.includes(status)) return false;
    }

    // Study type filter
    if (filters.studyType && filters.studyType.length > 0) {
      const studyType = trial.protocolSection.designModule?.studyType || "";
      if (!filters.studyType.includes(studyType)) return false;
    }

    // Sponsor filter
    if (filters.sponsor) {
      const sponsorName =
        trial.protocolSection.sponsorCollaboratorsModule.leadSponsor.name;
      if (!fuzzyMatch(filters.sponsor, sponsorName)) {
        return false;
      }
    }

    // Condition filter
    if (filters.condition) {
      const conditions =
        trial.protocolSection.conditionsModule?.conditions || [];
      const hasMatchingCondition = conditions.some((condition) =>
        fuzzyMatch(filters.condition!, condition)
      );
      if (!hasMatchingCondition) return false;
    }

    // Intervention filter
    if (filters.intervention) {
      const interventions =
        trial.protocolSection.armsInterventionsModule?.interventions || [];
      const hasMatchingIntervention = interventions.some((intervention) =>
        fuzzyMatch(filters.intervention!, intervention.name)
      );
      if (!hasMatchingIntervention) return false;
    }

    return true;
  });
}

// Sort trials
function sortTrials(
  trials: ClinicalTrial[],
  sortBy: string,
  sortOrder: "asc" | "desc"
): ClinicalTrial[] {
  return [...trials].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case "title":
        aValue = a.protocolSection.identificationModule.briefTitle;
        bValue = b.protocolSection.identificationModule.briefTitle;
        break;
      case "status":
        aValue = a.protocolSection.statusModule.overallStatus;
        bValue = b.protocolSection.statusModule.overallStatus;
        break;
      case "phase":
        aValue = a.protocolSection.designModule?.phases?.[0] || "";
        bValue = b.protocolSection.designModule?.phases?.[0] || "";
        break;
      case "sponsor":
        aValue = a.protocolSection.sponsorCollaboratorsModule.leadSponsor.name;
        bValue = b.protocolSection.sponsorCollaboratorsModule.leadSponsor.name;
        break;
      case "studyType":
        aValue = a.protocolSection.designModule?.studyType || "";
        bValue = b.protocolSection.designModule?.studyType || "";
        break;
      case "enrollment":
        aValue = a.protocolSection.designModule?.enrollmentInfo?.count || 0;
        bValue = b.protocolSection.designModule?.enrollmentInfo?.count || 0;
        break;
      case "start-date":
      case "startDate":
        aValue = a.protocolSection.statusModule.startDateStruct?.date || "";
        bValue = b.protocolSection.statusModule.startDateStruct?.date || "";
        break;
      case "nct-id":
      case "nctId":
        aValue = a.protocolSection.identificationModule.nctId;
        bValue = b.protocolSection.identificationModule.nctId;
        break;
      default:
        aValue = a.protocolSection.identificationModule.nctId;
        bValue = b.protocolSection.identificationModule.nctId;
    }

    // Handle numeric sorting for enrollment
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    // Handle string sorting for other fields
    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === "asc" ? comparison : -comparison;
    }

    return 0;
  });
}

// Main search function
export function searchClinicalTrials(params: SearchParams): SearchResult {
  const allTrials = loadClinicalTrialsData();
  console.log(`🔍 Search "${params.query}" in ${allTrials.length} trials`);

  // Apply search query
  let filteredTrials = params.query
    ? allTrials.filter((trial) => searchInTrial(trial, params.query!))
    : allTrials;

  console.log(`🔍 Found ${filteredTrials.length} trials`);

  // Apply filters
  if (params.filters) {
    filteredTrials = applyFilters(filteredTrials, params.filters);
  }

  // Sort results
  if (params.sortBy) {
    filteredTrials = sortTrials(
      filteredTrials,
      params.sortBy,
      params.sortOrder || "asc"
    );
  }

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 20;
  const totalCount = filteredTrials.length;
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTrials = filteredTrials.slice(startIndex, endIndex);

  const result = {
    trials: paginatedTrials,
    totalCount,
    page,
    limit,
    totalPages,
  };

  return result;
}

// Get unique values for filter options
export function getFilterOptions(): {
  phases: string[];
  statuses: string[];
  studyTypes: string[];
  sponsors: string[];
} {
  const allTrials = loadClinicalTrialsData();

  const phases = new Set<string>();
  const statuses = new Set<string>();
  const studyTypes = new Set<string>();
  const sponsors = new Set<string>();

  allTrials.forEach((trial) => {
    // Collect phases
    trial.protocolSection.designModule?.phases?.forEach((phase) =>
      phases.add(phase)
    );

    // Collect statuses
    const statusValue = trial.protocolSection.statusModule.overallStatus;
    statuses.add(statusValue);

    // Collect study types
    if (trial.protocolSection.designModule?.studyType) {
      studyTypes.add(trial.protocolSection.designModule.studyType);
    }

    // Collect sponsors
    sponsors.add(
      trial.protocolSection.sponsorCollaboratorsModule.leadSponsor.name
    );
  });

  const result = {
    phases: Array.from(phases).sort(),
    statuses: Array.from(statuses).sort(),
    studyTypes: Array.from(studyTypes).sort(),
    sponsors: Array.from(sponsors).sort(),
  };

  return result;
}
