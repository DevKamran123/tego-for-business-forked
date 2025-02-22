import { Drawer } from "antd";
import { useState } from "react";
import "../styles/components/HomeSidebar.scss";
import useMenuStore from "../store/MenuStore";

export default function HomeSidebar() {
  const isOpen = useMenuStore((state)=>state.isOpen);

  return (
    <div className="sidebar">
      <Drawer
        placement="left"
        closable={false}
        open={isOpen}
        mask={false}
        rootClassName="custom-sidebar"
        getContainer={false}
      >
        <div className="home-sidebar__content">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      </Drawer>
    </div>
  );
}