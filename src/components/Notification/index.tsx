import { useMemo } from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React from "react";

type NotificationPlacement = NotificationArgsProps["placement"];
type NotificationType = "success" | "error" | "info" | "warning";

interface CustomNotificationOptions {
  type: NotificationType;
  message: string;
  description: React.ReactNode;
  placement: NotificationPlacement;
}

const Context = React.createContext({ name: "Default" });

export const useCustomNotification = () => {
  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({
    type,
    message,
    description,
    placement,
  }: CustomNotificationOptions) => {
    api[type]({
      message: message,
      description: (
        <Context.Provider value={contextValue}>
          <Context.Consumer>{({ name }) => `${description}`}</Context.Consumer>
        </Context.Provider>
      ),
      placement,
      icon:
        type === "info" ? (
          <InfoCircleOutlined className="color-red2" />
        ) : type === "success" ? (
          <CheckCircleOutlined className="color-red2" />
        ) : (
          <ExclamationCircleOutlined className="color-red2" />
        ),
    });
  };

  return { openNotification, contextHolder };
};
