import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const useTogglePassword = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleShowPassword = () => {
    setIsVisible(prev => !prev);
  };

  return {
    type: isVisible ? 'text' : 'password',
    EyeIcon: isVisible ? EyeOff : Eye,
    toggleShowPassword,
    isVisible
  };
};