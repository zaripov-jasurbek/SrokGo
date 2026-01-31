export class CreateOrderDto {
  count: number;
  package: string;
  company: string;
  description: string;
  coordination: [number, number];
}
