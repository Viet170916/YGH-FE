import { useNavigate } from "react-router-dom";

export function useRedirectToErrorPage(){
  const navigate = useNavigate();
  navigate( '/error' );
  return null;
}

