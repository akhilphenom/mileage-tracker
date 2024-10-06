import useStore, { OnboardingUser } from "@/store/store";

export const useOnboarding = () => {
    const {
        onboardingUser,
        onboardingStep,
        startOnboarding,
        updateOnboardingUser,
        completeOnboarding,
        cancelOnboarding,
    } = useStore();

    const handleStartOnboarding = () => {
        startOnboarding();
    };

    const handleUpdateOnboardingUser = (props: OnboardingUser) => {
        updateOnboardingUser(props);
    };

    const handleCompleteOnboarding = () => {
        if (!onboardingUser || !onboardingUser.email || !onboardingUser.name) {
            throw new Error('Required information is missing');
        }
        completeOnboarding();
    };

    const handleCancelOnboarding = () => {
        cancelOnboarding();
    };

    return {
        onboardingUser,
        onboardingStep,
        handleStartOnboarding,
        handleUpdateOnboardingUser,
        handleCompleteOnboarding,
        handleCancelOnboarding,
    };
};