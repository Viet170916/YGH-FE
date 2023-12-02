import { useEffect } from "react";

function useScriptInject(path:string, deps:[]= []){
  useEffect(() => {
    const script = document.createElement('script');
    script.type = "module"
    script.src = path; // Đường dẫn đến tệp JavaScript
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Xóa script nếu component bị hủy
      document.body.removeChild(script);
    };
  }, deps);
}
export default useScriptInject;
