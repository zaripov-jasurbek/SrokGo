export class FindCompanyDto {
  byRange?: {
    current: [number, number];
    maxDistance: number;
  };
  byCategory?: string;
  region?: string;

  skip: number;
  limit: number;
}
