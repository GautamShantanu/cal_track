export interface IConnectionManager {
  getConnection(): Promise<any>;
}
