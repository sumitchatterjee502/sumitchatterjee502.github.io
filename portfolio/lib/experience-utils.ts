const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export interface CareerSpan {
  start: Date;
  end: Date;
  startLabel: string;
  endLabel: string;
}

export interface ParsedExperience {
  id: string;
  initials: string;
  span: CareerSpan;
  durationMonths: number;
}

function parseMonthYear(value: string): Date {
  const trimmed = value.trim().toLowerCase();
  if (trimmed === "present") {
    return new Date();
  }

  const [monthRaw, yearRaw] = trimmed.split(/\s+/);
  const month = MONTHS[monthRaw.slice(0, 3)] ?? 0;
  const year = Number.parseInt(yearRaw, 10);
  return new Date(year, month, 1);
}

export function parsePeriod(period: string): CareerSpan {
  const [startRaw, endRaw] = period.split("—").map((part) => part.trim());
  const start = parseMonthYear(startRaw);
  const end = parseMonthYear(endRaw);

  return {
    start,
    end,
    startLabel: startRaw,
    endLabel: endRaw,
  };
}

export function slugifyCompany(company: string): string {
  return company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCompanyInitials(company: string): string {
  const words = company
    .replace(/\b(pvt|ltd|llc|inc|co)\b\.?/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function getDurationLabel(months: number): string {
  const years = Math.floor(months / 12);
  const remainder = months % 12;

  if (years === 0) {
    return `${remainder} mo`;
  }

  if (remainder === 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  }

  return `${years} yr${years > 1 ? "s" : ""} ${remainder} mo`;
}

export function monthsBetween(start: Date, end: Date): number {
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1
  );
}

export function parseExperienceEntry(
  company: string,
  period: string,
): ParsedExperience {
  const span = parsePeriod(period);

  return {
    id: slugifyCompany(company),
    initials: getCompanyInitials(company),
    span,
    durationMonths: monthsBetween(span.start, span.end),
  };
}
