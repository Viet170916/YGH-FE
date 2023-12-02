import React from "react";
import { IoCreateOutline } from "react-icons/io5";
import { LiaUserCogSolid } from "react-icons/lia";
import { MdAccountTree } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { VscFolderActive } from "react-icons/vsc";
import { createAPost_ClickAction } from "../../../../Layouts/Dashboard/ContentDisplayer/CreatePost/CreatePost";

export interface DashNavConfig{
  labelName: string;
  configure: {
    redirectTo: string;
    icon: React.JSX.Element,
    name: string,
    onClick: ()=>void,
  } [];
}
const post = [
  {
    redirectTo: "",
    onClick: createAPost_ClickAction,
    icon: <IoCreateOutline className = { "link-icon" } />,
    name: "Create a new post",
  },
  {
    redirectTo: "./post-management/activated",
    icon: <VscFolderActive className = { "link-icon" } />,
    name: "Manage posts",
  },
  {
    redirectTo: "./draft",
    icon: <RiDraftLine className = { "link-icon" } />,
    name: "Draft",
  },
];
const booking = [
  // {
  //   redirectTo: "./booking",
  //   icon: <IoCreateOutline className = { "link-icon" } />,
  //   name: "Your booking",
  // },
  {
    redirectTo: "./order",
    icon: <VscFolderActive className = { "link-icon" } />,
    name: "Orders",
  },
];
const account = [
  {
    redirectTo: "./my-profile",
    icon: <LiaUserCogSolid className = { "link-icon" } />,
    name: "My Profile",
  },
  {
    redirectTo: "./account",
    icon: <MdAccountTree className = { "link-icon" } />,
    name: "Manage account",
  },
];
export const navConfig: DashNavConfig[] = [
  { labelName: "Booking", configure: booking },
  { labelName: "Posts", configure: post },
  { labelName: "Account", configure: account },
];

