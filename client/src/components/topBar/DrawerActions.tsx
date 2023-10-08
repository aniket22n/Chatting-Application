import { useRecoilState } from "recoil";
import { List } from "phosphor-react";
import { IconButton } from "@mui/material";

import { appState } from "../../store/atoms/appStateAtom";

// ........... Drawer Open/Close ........
const Drawer = () => {
  const [appSetting, setAppSetting] = useRecoilState(appState);

  return (
    <IconButton
      onClick={() =>
        setAppSetting({ ...appSetting, isDrawerOpen: !appSetting.isDrawerOpen })
      }
    >
      <List size={36} />
    </IconButton>
  );
};

export default Drawer;
