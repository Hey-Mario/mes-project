export interface IMediator {
  notify(sender: object, event: string): void;
}
