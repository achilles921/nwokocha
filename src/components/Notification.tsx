import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "../stores/store";
import success from "../assets/success.svg";
import { NotificationType } from "../utils/enums";

const Notification = () => {
  const  { commonStore } = useStore();

  const getBgColorByType = () => {
    if (commonStore.notificationType === NotificationType.Success) {
      return "bg-green-200";
    } else if (commonStore.notificationType === NotificationType.Error) {
      return "bg-red-200";
    }

    return "bg-white";
  }

  const showOrHide = () => {
    if (commonStore.notificationType === undefined || commonStore.notificationType === NotificationType.None)
      return "hidden";
    else
      return "flex";
  }

  return (
    <div className={`${showOrHide()} justify-center px-4 py-6 pointer-events-none sm:p-6`}>
      <div className={`max-w-sm w-full ${getBgColorByType()} shadow-lg rounded-lg pointer-events-auto`}>
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              {/* <div className="flex-shrink-0 h-6 w-6 text-green-400">
                <img className="mb-3" src={success} alt="success" />
              </div> */}
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{commonStore.notificationTitle}</p>
                <p className="mt-1 text-sm text-gray-500">{commonStore.notificationContent}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Notification);