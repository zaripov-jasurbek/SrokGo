export class FindCompanyDto {
  byRange?: {
    current: [number, number];
    maxDistance: number;
  };
  byCategory?: string;
}
