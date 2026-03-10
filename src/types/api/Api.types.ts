

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data:    T;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  message: string;
  data:    T[];
  total:   number;
  page:    number;
  limit:   number;
}

/** Shape every rejected Axios call produces */
export interface ApiError {
  message:    string;
  statusCode?: number;
}