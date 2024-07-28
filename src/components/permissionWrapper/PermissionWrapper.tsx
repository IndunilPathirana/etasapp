import React from "react";

type WrapperProps = {
  children: React.ReactNode;
};

export default function PermissionWrapper(props: WrapperProps) {
  return <>{props.children}</>;
}
