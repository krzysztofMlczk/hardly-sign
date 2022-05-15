import { EmailStep } from "./EmailStep";
import { PinStep } from "./PinStep";
import { useAppSelector } from "../../../../state/hooks";
import { select } from "../LoginPage.slice";

export const MultiStepLoginForm = () => {
  const step = useAppSelector(select.step);

  const getCurrentStepComponent = () => {
    switch (step) {
      case "email":
        return <EmailStep />;
      case "pin":
        return <PinStep />;
      default:
        return <EmailStep />;
    }
  };

  return getCurrentStepComponent();
};
