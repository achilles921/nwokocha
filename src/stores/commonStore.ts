import { makeAutoObservable, reaction } from "mobx";

import { NotificationType } from "../utils/enums";

export default class CommonStore {
    currentEpoch: number = 0;
    notificationType: number = NotificationType.None;
    notificationTitle: string = "";
    notificationContent: string = "";

    constructor() {
      makeAutoObservable(this);
    }

    setCurrentEpoch = (currentEpoch: number) => {
        this.currentEpoch = currentEpoch;
    }

    setNotificationTitle = (title: string) => {
      this.notificationTitle = title;
    }

    setNotificationContent = (content: string) => {
      this.notificationContent = content;
    }

    setNotificationType = (type: NotificationType) => {
      this.notificationType = type;
    }
}