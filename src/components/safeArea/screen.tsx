// components/screen.tsx
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import { StyleSheet, ViewStyle } from "react-native";

type ScreenProps = {
    children: React.ReactNode;
    edges?: Edge[];
    style?: ViewStyle;
};

export function Screen({ children, edges = ["top", "bottom"], style }: ScreenProps) {
    return (
        <SafeAreaView style={[styles.container, style]} edges={edges}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});