export class CreateEventDto {
  readonly name: string;
  readonly description: string;
  images?: string[];
  readonly startDate: Date;
  readonly endDate: Date;
  readonly totalGuests?: number;
}