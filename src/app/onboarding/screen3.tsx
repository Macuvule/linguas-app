import { router } from "expo-router";
import { OnboardingScreen } from "@/features/onboarding/onBoarding-screen";
import { useIsFirstTime } from "@/lib/hooks/use-is-first-time";
import { Screen } from "@/components/safeArea/screen";

export default function OnBoardingRoute() {
  const [, setIsFirstTime] = useIsFirstTime();

  const finishOnboarding = () => {
    setIsFirstTime(false);
    router.replace("/login");
  };

  return (
    <Screen edges={["top"]}>
      <OnboardingScreen
        onNext={finishOnboarding}
        onSkip={finishOnboarding}
      />
    </Screen>
  );
}