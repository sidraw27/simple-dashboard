interface Client {
  setPrefix(prefix: string): Client
  get<T>(target: string, params?: unknown): Promise<T>
  post<T>(target: string, payload?: unknown): Promise<T>
  patch<T>(target: string, payload: unknown): Promise<T>
}
