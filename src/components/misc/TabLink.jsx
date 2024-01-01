import { useNavigate } from "react-router-dom";
import "./TabLink.css";

export const TabLink = ({ path, text }) => {
  const navigate = useNavigate();

  return (
    <span
      onClick={() => {
        navigate(path);
      }}
      className="text-3xl foldertab folderbehind"
    >
      <p className="folder-text text-center pt-1">{text}</p>
    </span>
  );
};
