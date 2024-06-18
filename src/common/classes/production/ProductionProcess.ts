import { NotificationTypeEnum } from "@/common/interfaces/notification/NotificationTypeEnum";
import { Observer } from "@/common/interfaces/notification/Observer";
import { Subject } from "@/common/interfaces/notification/Subject";

export class ProductionProcess implements Subject {
  private observers: Observer[] = [];

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(event: string, type: NotificationTypeEnum): void {
    for (const observer of this.observers) {
      observer.update(event, type);
    }
  }

  changeProcess(event: string, type: NotificationTypeEnum): void {
    this.notifyObservers(event, type);
  }
}
