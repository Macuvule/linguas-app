import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Home as InicioIcon,
  Settings as SettingsIcon,
  Progress as ProgressIcon,
} from "@/components/ui/icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TAB_BAR_HORIZONTAL_MARGIN = 16;
const TAB_BAR_WIDTH = SCREEN_WIDTH - TAB_BAR_HORIZONTAL_MARGIN * 2;

const tabs = [
  {
    name: "index",
    label: "Home",
    color: "#456800",
    Icon: InicioIcon,
  },
  {
    name: "progress",
    label: "Progress",
    color: "#7C3AED",
    Icon: ProgressIcon,
  },
  {
    name: "settings",
    label: "Settings",
    color: "#2563EB",
    Icon: SettingsIcon,
  },
];

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: any) {
  const insets = useSafeAreaInsets();

  const indicatorPosition = useRef(new Animated.Value(0)).current;

  // Criação persistente dos valores animados da escala
  const scaleAnimations = useRef(
    tabs.map(() => new Animated.Value(1))
  ).current;

  const visibleRoutes = state.routes.filter((route: any) =>
    tabs.some((tab) => tab.name === route.name)
  );

  const activeIndex = Math.max(
    0,
    visibleRoutes.findIndex(
      (route: any) => route.key === state.routes[state.index]?.key
    )
  );

  const activeTab = tabs[activeIndex] ?? tabs[0];

  useEffect(() => {
    const tabWidth = TAB_BAR_WIDTH / tabs.length;

    Animated.parallel([
      Animated.spring(indicatorPosition, {
        toValue: activeIndex * tabWidth,
        useNativeDriver: true,
        tension: 120,
        friction: 14,
      }),
      ...scaleAnimations.map((animation, index) =>
        Animated.spring(animation, {
          toValue: index === activeIndex ? 1.12 : 1,
          useNativeDriver: true,
          tension: 160,
          friction: 10,
        })
      ),
    ]).start();
  }, [activeIndex]);

  const handlePress = (route: any) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const handleLongPress = (route: any) => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: insets.bottom || 12 },
      ]}
    >
      <View style={styles.container}>
        {/* Indicador */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            {
              backgroundColor: activeTab.color,
              width: TAB_BAR_WIDTH / tabs.length,
              transform: [
                {
                  translateX: indicatorPosition,
                },
              ],
            },
          ]}
        />

        {visibleRoutes.map((route: any, index: number) => {
          const tab = tabs[index];
          if (!tab) return null;

          const focused =
            route.key === state.routes[state.index]?.key;
          const { options } = descriptors[route.key];
          const color = focused ? tab.color : "#9CA19A";
          const Icon = tab.Icon;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={() => handlePress(route)}
              onLongPress={() => handleLongPress(route)}
              style={styles.tab}
              android_ripple={{
                color: `${tab.color}18`,
                borderless: true,
              }}
            >
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    transform: [
                      {
                        scale: scaleAnimations[index],
                      },
                    ],
                  },
                ]}
              >
                <Icon color={color} />
              </Animated.View>

              <Text
                style={[
                  styles.label,
                  {
                    color,
                    fontWeight: focused ? "700" : "500",
                  },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: TAB_BAR_HORIZONTAL_MARGIN,
    backgroundColor: "transparent",
  },
  container: {
    width: "100%",
    height: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  tab: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.2,
  },
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 3,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});