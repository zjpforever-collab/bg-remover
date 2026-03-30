export interface ImageFile {
  file: File;
  name: string;
  size: number;
  preview: string;
}

export interface ProcessResult {
  success: boolean;
  data?: string;
  error?: string;
}

export interface UsageInfo {
  remaining: number;
  limit: number;
  resetDate?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
