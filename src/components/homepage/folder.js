import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";
const Folder = ({ folder }) => {
  const { jiggle, selectedFolderId, setSelectedFolderId } = useContext(
    UserContext
  );
  const handleClick = (id) => {
    setSelectedFolderId(id);
  };
  return (
    <div
      className={
        jiggle
          ? "folder-wrapper not-hoverable"
          : folder.id === selectedFolderId
          ? "folder-wrapper hoverable clicked"
          : "folder-wrapper hoverable"
      }
    >
      <div
        className="folder-title"
        id={folder.id}
        onClick={() => handleClick(folder.id)}
      >
        {folder.title}
      </div>
    </div>
  );
};
export default React.memo(Folder);
