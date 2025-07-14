"use client";

import { ClinicalTrial } from "@/types/clinical-trials";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, MapPin, Target, FileText, Shield, User } from "lucide-react";
import { formatPhases } from "@/lib/format-utils";
import { formatDate } from "@/lib/date-utils";
import { TrialHeader } from "./trial-details/trial-header";
import { TrialConditions } from "./trial-details/trial-conditions";
import { TrialInterventions } from "./trial-details/trial-interventions";
import { TrialSponsor } from "./trial-details/trial-sponsor";
import { TrialDates } from "./trial-details/trial-dates";

interface TrialDetailsSheetProps {
  trial: ClinicalTrial;
  trigger: React.ReactNode;
}

export function TrialDetailsSheet({ trial, trigger }: TrialDetailsSheetProps) {
  const protocol = trial.protocolSection;
  const identification = protocol.identificationModule;
  const status = protocol.statusModule;
  const sponsor = protocol.sponsorCollaboratorsModule;
  const description = protocol.descriptionModule;
  const conditions = protocol.conditionsModule;
  const design = protocol.designModule;
  const interventions = protocol.armsInterventionsModule;
  const outcomes = protocol.outcomesModule;
  const eligibility = protocol.eligibilityModule;
  const contacts = protocol.contactsLocationsModule;

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-4xl p-0 flex flex-col max-h-[100vh]">
        <div className="p-6 pb-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
          <SheetHeader className="space-y-4">
            <SheetTitle className="text-2xl font-bold leading-tight">
              {trial.protocolSection.identificationModule.briefTitle}
            </SheetTitle>
            <TrialHeader trial={trial} />
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline">{formatPhases(design?.phases)}</Badge>
              <Badge variant="outline">{design?.studyType}</Badge>
            </div>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 pt-4">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-0">
                  {/* Summary Card */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Study Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5 pt-0">
                      {identification.officialTitle && (
                        <div>
                          <h4 className="font-semibold mb-2">Official Title</h4>
                          <p className="text-sm text-muted-foreground">
                            {identification.officialTitle}
                          </p>
                        </div>
                      )}
                      {description?.briefSummary ? (
                        <div>
                          <h4 className="font-semibold mb-2">Brief Summary</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {description.briefSummary}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-semibold mb-2">Brief Summary</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>No summary available</span>
                          </div>
                        </div>
                      )}
                      {identification.acronym && (
                        <div>
                          <h4 className="font-semibold mb-2">Acronym</h4>
                          <p className="text-sm text-muted-foreground">
                            {identification.acronym}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Conditions and Interventions */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <TrialConditions conditions={conditions} />
                    <TrialInterventions interventions={interventions} />
                  </div>

                  {/* Sponsor Information */}
                  <TrialSponsor sponsor={sponsor} />
                </TabsContent>

                <TabsContent value="design" className="space-y-6 mt-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Study Design
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Study Type</h4>
                            <Badge variant="outline">{design?.studyType}</Badge>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Phases</h4>
                            <Badge variant="outline">
                              {formatPhases(design?.phases)}
                            </Badge>
                          </div>
                        </div>
                        {design?.designInfo && (
                          <div className="space-y-3">
                            {design.designInfo.allocation && (
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Allocation
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {design.designInfo.allocation}
                                </p>
                              </div>
                            )}
                            {design.designInfo.interventionModel && (
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Intervention Model
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {design.designInfo.interventionModel}
                                </p>
                              </div>
                            )}
                            {design.designInfo.primaryPurpose && (
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Primary Purpose
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {design.designInfo.primaryPurpose}
                                </p>
                              </div>
                            )}
                            {design.designInfo.maskingInfo && (
                              <div>
                                <h4 className="font-semibold mb-2">Masking</h4>
                                <p className="text-sm text-muted-foreground">
                                  {design.designInfo.maskingInfo.masking}
                                </p>
                                {design.designInfo.maskingInfo.whoMasked && (
                                  <div className="mt-2">
                                    {design.designInfo.maskingInfo.whoMasked.map(
                                      (masked, index) => (
                                        <Badge
                                          key={index}
                                          variant="outline"
                                          className="mr-2 mb-2"
                                        >
                                          {masked}
                                        </Badge>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Enrollment & Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {design?.enrollmentInfo && (
                          <div>
                            <h4 className="font-semibold mb-2">
                              Target Enrollment
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="default">
                                {design.enrollmentInfo.count?.toLocaleString() ||
                                  "Not specified"}
                              </Badge>
                              {design.enrollmentInfo.type && (
                                <Badge variant="outline">
                                  {design.enrollmentInfo.type}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold mb-2">
                              Study Start Date
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(status.startDateStruct)}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">
                              Primary Completion Date
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(status.primaryCompletionDateStruct)}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">
                              Study Completion Date
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(status.completionDateStruct)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Outcomes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Study Outcomes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(outcomes?.primaryOutcomes &&
                        outcomes.primaryOutcomes.length > 0) ||
                      (outcomes?.secondaryOutcomes &&
                        outcomes.secondaryOutcomes.length > 0) ? (
                        <Accordion type="single" collapsible className="w-full">
                          {outcomes?.primaryOutcomes && (
                            <AccordionItem value="primary">
                              <AccordionTrigger>
                                Primary Outcomes
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3">
                                  {outcomes.primaryOutcomes.map(
                                    (outcome, index) => (
                                      <div
                                        key={index}
                                        className="border-l-4 border-primary pl-4"
                                      >
                                        <h4 className="font-semibold mb-1">
                                          {outcome.measure}
                                        </h4>
                                        {outcome.timeFrame && (
                                          <p className="text-sm text-muted-foreground mb-1">
                                            Time Frame: {outcome.timeFrame}
                                          </p>
                                        )}
                                        {outcome.description && (
                                          <p className="text-sm text-muted-foreground">
                                            {outcome.description}
                                          </p>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )}
                          {outcomes?.secondaryOutcomes && (
                            <AccordionItem value="secondary">
                              <AccordionTrigger>
                                Secondary Outcomes
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-3">
                                  {outcomes.secondaryOutcomes.map(
                                    (outcome, index) => (
                                      <div
                                        key={index}
                                        className="border-l-4 border-secondary pl-4"
                                      >
                                        <h4 className="font-semibold mb-1">
                                          {outcome.measure}
                                        </h4>
                                        {outcome.timeFrame && (
                                          <p className="text-sm text-muted-foreground mb-1">
                                            Time Frame: {outcome.timeFrame}
                                          </p>
                                        )}
                                        {outcome.description && (
                                          <p className="text-sm text-muted-foreground">
                                            {outcome.description}
                                          </p>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          )}
                        </Accordion>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Target className="h-4 w-4" />
                          <span>No study outcomes specified</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="eligibility" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Eligibility Criteria
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {eligibility ? (
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Sex</h4>
                              <Badge variant="outline">
                                {eligibility.sex || "All"}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Minimum Age
                              </h4>
                              <Badge variant="outline">
                                {eligibility.minimumAge || "N/A"}
                              </Badge>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Maximum Age
                              </h4>
                              <Badge variant="outline">
                                {eligibility.maximumAge || "N/A"}
                              </Badge>
                            </div>
                          </div>
                          {eligibility.healthyVolunteers !== undefined && (
                            <div>
                              <h4 className="font-semibold mb-2">
                                Healthy Volunteers
                              </h4>
                              <Badge
                                variant={
                                  eligibility.healthyVolunteers
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {eligibility.healthyVolunteers
                                  ? "Accepted"
                                  : "Not Accepted"}
                              </Badge>
                            </div>
                          )}
                          {eligibility.stdAges &&
                            eligibility.stdAges.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-2">
                                  Standard Ages
                                </h4>
                                <div className="space-y-1">
                                  {eligibility.stdAges.map((age, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="mr-2 mb-2"
                                    >
                                      {age}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          {eligibility.eligibilityCriteria && (
                            <div>
                              <h4 className="font-semibold mb-2">
                                Detailed Criteria
                              </h4>
                              <div className="p-4 bg-muted rounded-lg">
                                <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {eligibility.eligibilityCriteria}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Shield className="h-4 w-4" />
                          <span>No eligibility criteria specified</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contacts" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Study Locations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {contacts?.locations && contacts.locations.length > 0 ? (
                        <div className="space-y-3">
                          {contacts.locations.map((location, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <h4 className="font-semibold mb-2">
                                {location.facility}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {[
                                  location.city,
                                  location.state,
                                  location.country,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                                {location.zip && ` ${location.zip}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>No study locations specified</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Study Officials
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {contacts?.overallOfficials &&
                      contacts.overallOfficials.length > 0 ? (
                        <div className="space-y-3">
                          {contacts.overallOfficials.map((official, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <h4 className="font-semibold mb-1">
                                {official.name}
                              </h4>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{official.role}</Badge>
                              </div>
                              {official.affiliation && (
                                <p className="text-sm text-muted-foreground">
                                  {official.affiliation}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>No study officials specified</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Detailed Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {description?.detailedDescription ? (
                        <div className="prose prose-sm max-w-none">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {description.detailedDescription}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="h-4 w-4" />
                          <span>No detailed description available</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Study Arms/Groups
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {interventions?.armGroups &&
                      interventions.armGroups.length > 0 ? (
                        <div className="space-y-3">
                          {interventions.armGroups.map((arm, index) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{arm.type}</Badge>
                                <span className="font-semibold">
                                  {arm.label}
                                </span>
                              </div>
                              {arm.description && (
                                <p className="text-sm text-muted-foreground mb-2">
                                  {arm.description}
                                </p>
                              )}
                              {arm.interventionNames &&
                                arm.interventionNames.length > 0 && (
                                  <div>
                                    <h5 className="font-semibold mb-1">
                                      Interventions:
                                    </h5>
                                    <div className="flex flex-wrap gap-1">
                                      {arm.interventionNames.map(
                                        (intervention, idx) => (
                                          <Badge
                                            key={idx}
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            {intervention}
                                          </Badge>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>No study arms or groups specified</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <TrialDates status={status} />

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Organization Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {identification.organization.fullName}
                        </Badge>
                        <Badge variant="secondary">
                          {identification.organization.class}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
