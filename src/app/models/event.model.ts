export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  capacity: number;
  reservedCount: number;
  imageBase64?: string;
  status: string;
}
