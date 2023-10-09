import { useRecoilValue } from "recoil";

import OneOneChat from "../../components/sideBar/OneOneChat";
import GroupChat from "../../components/sideBar/GroupChat";
import { appState } from "../../store/atoms/appStateAtom";
import { blur } from "../../store/atoms/otherAtom";

const SideBar = () => {
  const isblur = useRecoilValue(blur);
  const appSettings = useRecoilValue(appState);

  if (appSettings.selectedSideBar === "one-one") {
    return (
      <>
        {isblur && <div className="blur-background"></div>}
        <OneOneChat />
      </>
    );
  } else {
    return (
      <>
        {isblur && <div className="blur-background"></div>}
        <GroupChat />
      </>
    );
  }
};

export default SideBar;
