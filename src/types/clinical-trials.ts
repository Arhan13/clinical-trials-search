export interface ClinicalTrial {
  protocolSection: ProtocolSection;
  derivedSection?: DerivedSection;
}

export interface ProtocolSection {
  identificationModule: IdentificationModule;
  statusModule: StatusModule;
  sponsorCollaboratorsModule: SponsorCollaboratorsModule;
  oversightModule?: OversightModule;
  descriptionModule?: DescriptionModule;
  conditionsModule?: ConditionsModule;
  designModule?: DesignModule;
  armsInterventionsModule?: ArmsInterventionsModule;
  outcomesModule?: OutcomesModule;
  eligibilityModule?: EligibilityModule;
  contactsLocationsModule?: ContactsLocationsModule;
  referencesModule?: ReferencesModule;
}

export interface IdentificationModule {
  nctId: string;
  orgStudyIdInfo?: { id: string };
  organization: Organization;
  briefTitle: string;
  officialTitle?: string;
  acronym?: string;
}

export interface Organization {
  fullName: string;
  class: string;
}

export interface StatusModule {
  statusVerifiedDate?: string;
  overallStatus: string;
  expandedAccessInfo?: { hasExpandedAccess: boolean };
  startDateStruct?: DateStruct;
  primaryCompletionDateStruct?: DateStruct;
  completionDateStruct?: DateStruct;
  studyFirstSubmitDate?: string;
  studyFirstSubmitQcDate?: string;
  studyFirstPostDateStruct?: DateStruct;
  lastUpdateSubmitDate?: string;
  lastUpdatePostDateStruct?: DateStruct;
}

export interface DateStruct {
  date: string;
  type: string;
}

export interface SponsorCollaboratorsModule {
  responsibleParty?: ResponsibleParty;
  leadSponsor: Sponsor;
  collaborators?: Sponsor[];
}

export interface ResponsibleParty {
  type: string;
  investigatorFullName?: string;
  investigatorTitle?: string;
  investigatorAffiliation?: string;
}

export interface Sponsor {
  name: string;
  class: string;
}

export interface OversightModule {
  oversightHasDmc?: boolean;
  isFdaRegulatedDrug?: boolean;
  isFdaRegulatedDevice?: boolean;
}

export interface DescriptionModule {
  briefSummary: string;
  detailedDescription?: string;
}

export interface ConditionsModule {
  conditions: string[];
  keywords?: string[];
}

export interface DesignModule {
  studyType: string;
  phases?: string[];
  designInfo?: DesignInfo;
  enrollmentInfo?: EnrollmentInfo;
}

export interface DesignInfo {
  allocation?: string;
  interventionModel?: string;
  primaryPurpose?: string;
  maskingInfo?: MaskingInfo;
}

export interface MaskingInfo {
  masking?: string;
  whoMasked?: string[];
}

export interface EnrollmentInfo {
  count?: number;
  type?: string;
}

export interface ArmsInterventionsModule {
  armGroups?: ArmGroup[];
  interventions?: Intervention[];
}

export interface ArmGroup {
  label: string;
  type: string;
  description?: string;
  interventionNames?: string[];
}

export interface Intervention {
  type: string;
  name: string;
  description?: string;
  armGroupLabels?: string[];
}

export interface OutcomesModule {
  primaryOutcomes?: Outcome[];
  secondaryOutcomes?: Outcome[];
}

export interface Outcome {
  measure: string;
  timeFrame?: string;
  description?: string;
}

export interface EligibilityModule {
  eligibilityCriteria?: string;
  healthyVolunteers?: boolean;
  sex?: string;
  minimumAge?: string;
  maximumAge?: string;
  stdAges?: string[];
}

export interface ContactsLocationsModule {
  locations?: Location[];
  overallOfficials?: Official[];
}

export interface Location {
  facility: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
}

export interface Official {
  name: string;
  affiliation?: string;
  role: string;
}

export interface ReferencesModule {
  references?: Reference[];
}

export interface Reference {
  pmid?: string;
  type?: string;
  citation?: string;
}

export interface DerivedSection {
  miscInfoModule?: MiscInfoModule;
  conditionBrowseModule?: ConditionBrowseModule;
  interventionBrowseModule?: InterventionBrowseModule;
}

export interface MiscInfoModule {
  versionHolder?: string;
}

export interface ConditionBrowseModule {
  meshes?: MeshTerm[];
  ancestors?: MeshTerm[];
  browseLeaves?: BrowseLeaf[];
  browseBranches?: BrowseBranch[];
}

export interface InterventionBrowseModule {
  meshes?: MeshTerm[];
  ancestors?: MeshTerm[];
  browseLeaves?: BrowseLeaf[];
  browseBranches?: BrowseBranch[];
}

export interface MeshTerm {
  id: string;
  term: string;
}

export interface BrowseLeaf {
  id: string;
  name: string;
  relevance: string;
}

export interface BrowseBranch {
  abbrev: string;
  name: string;
}

// Search and filter types
export interface SearchFilters {
  phase?: string[];
  status?: string[];
  studyType?: string[];
  sponsor?: string;
  condition?: string;
  intervention?: string;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: SearchFilters;
}

export interface SearchResult {
  trials: ClinicalTrial[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}
