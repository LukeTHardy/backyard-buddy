import { useNavigate } from "react-router-dom";
import "./TabLink.css";

export const TabLink = ({ path, text }) => {
  const navigate = useNavigate();

  return (
    <span
      onClick={() => {
        navigate(path);
      }}
      className="text-3xl mx-2 foldertab folderbehind"
    >
      <p className="text-center transform-none pt-1">{text}</p>
    </span>
  );
};
