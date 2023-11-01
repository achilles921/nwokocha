import { makeAutoObservable, reaction } from "mobx";

import { NotificationType } from "../utils/enums";

export default class CommonStore {
    loading: boolean = false;
    currentEpoch: number = 0;
    notificationType: number = NotificationType.None;
    notificationTitle: string = "";
    notificationContent: string = "";

    constructor() {
      makeAutoObservable(this);
    }

    setLoading = (loading: boolean) => {
      this.loading = loading;
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