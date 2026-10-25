import React from "react";
import { Redirect, Tabs } from "expo-router";

import { useAuthStore as useAuth } from "@/features/auth/use-auth-store";
import { useIsFirstTime } from "@/lib/hooks/use-is-first-time";

import CustomTabBar from "@/components/navigation/customTabBar";

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }

  if (status === "signOut") {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: "#f8fbea" }}}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="progress" options={{ title: "Progress" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}