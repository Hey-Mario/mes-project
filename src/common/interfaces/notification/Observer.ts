import { NotificationTypeEnum } from "./NotificationTypeEnum";

export interface Observer {
  update(event: string, type: NotificationTypeEnum): void;
}