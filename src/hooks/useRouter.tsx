import { useNavigate } from "react-router-dom";

export const useRouter = () => {
  const navigate = useNavigate();

  return {
    // currentPath: window.location.pathname,
    routerTo: (path: string) => navigate(path),
  };
};
