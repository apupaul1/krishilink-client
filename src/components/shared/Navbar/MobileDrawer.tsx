import { useState } from "react";
import { Drawer } from "antd";
import { Menu } from "lucide-react";
import NavLinks from "./NavLinks";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden"
      >
        <Menu size={28} />
      </button>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div
          className="flex flex-col gap-5"
          onClick={() => setOpen(false)}
        >
          <NavLinks />
        </div>
      </Drawer>
    </>
  );
};

export default MobileDrawer;