import { Text } from '@/components/ui';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import DiscussionIllustration from "@/components/ui/icons/Discussion";
import OnboardingButton from "./components/onBoardingButton";
import { Wave } from "./components/wave";

const { width, height } = Dimensions.get("window");

type OnboardingScreenProps = {
  onNext?: () => void;
  onSkip?: () => void;
};

export function OnboardingScreen({
  onNext,
  onSkip,
}: OnboardingScreenProps) {
  return (
    <View style={styles.container}>
      {/* Background mint */}
      <View style={styles.mintBackground} />

      {/* Decorative green wave */}
      <View style={styles.waveContainer}>
        <Wave width={800} height={580}/>
      </View>
      

      {/* Skip */}
      <Pressable
        onPress={onSkip}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>
          Pular
        </Text>
      </Pressable>

      {/* Main illustration */}
      <View style={styles.illustrationContainer}>
        <DiscussionIllustration
          width={width * 0.90}
          height={height * 0.5}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>

        <Text style={styles.description}>
          Prepare-se para aprender inglês do jeito Mr. Sky.
          {"\n"}
          Vamos decolar juntos rumo à fluência!
        </Text>

        {/* Pagination */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Next */}
        <OnboardingButton onPress={onNext ?? (() => {})} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },

  mintBackground: {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "#ffffff",
},

  /*
   * Green wave
   */
  waveContainer: {
  position: "absolute",
  bottom: -height * 0.08,
  left: -width * 0.25,
  },

  wave: {
    width: "100%",
    height: "100%",
    backgroundColor: "#075B3A",

    borderTopLeftRadius: width * 0.8,
    borderTopRightRadius: width * 0.8,
    borderBottomLeftRadius: width * 0.3,
    borderBottomRightRadius: width * 0.3,
  },

  /*
   * Skip
   */
  skipButton: {
    position: "absolute",
    top: 25,
    right: 24,
    zIndex: 20,

    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  skipText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6B8F80",
  },

  /*
   * Illustration
   */
  illustrationContainer: {
    position: "absolute",

    top: height * 0.13,

    width: width,
    height: height * 0.36,

    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
  },

  /*
   * Text/content
   */
  content: {
    position: "absolute",

    bottom: 32,

    width: width,
    paddingHorizontal: 32,

    alignItems: "center",

    zIndex: 15,
  },

  description: {
    marginTop: 14,

    maxWidth: 340,

    fontSize: 15,
    lineHeight: 23,

    fontWeight: "400",

    color: "#D8EDE3",

    textAlign: "center",
  },

  /*
   * Pagination
   */
  pagination: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 22,
    marginBottom: 22,

    gap: 7,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,

    backgroundColor: "#78A995",
    opacity: 0.55,
  },

  activeDot: {
    width: 24,
    backgroundColor: "#FFFFFF",
    opacity: 1,
  },
});