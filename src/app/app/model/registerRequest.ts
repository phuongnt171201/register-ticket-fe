export interface RegisterRequest {
  name: string;
  address?: string;
  cardId: string;
  doB: string;
  typeClass: string;
  payment?: number;
}
