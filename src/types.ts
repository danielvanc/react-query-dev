export interface TermData {
  id: number;
  title: string;
  description: string;
  caseSensitive: boolean;
  translatable: boolean;
  forbidden: boolean;
  createdAt: Date;
  createdBy: { fullName: string };
}

export interface ReturnedData {
  terms: any;
  error: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
