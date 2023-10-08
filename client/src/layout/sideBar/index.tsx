import { useRecoilValue } from "recoil";

import OneOneChat from "../../components/sideBar/OneOneChat";
import GroupChat from "../../components/sideBar/GroupChat";
import { appState } from "../../store/atoms/appStateAtom";

const SideBar = () => {
  const appSettings = useRecoilValue(appState);

  if (appSettings.selectedSideBar === "one-one") {
    return <OneOneChat />;
  } else {
    return <GroupChat />;
  }
};

export default SideBar;
