
import { initializeDatabase, resetDatabase } from "@/database/db";
import { seedDatabase } from "@/database/seed";
import { hydrateAuth } from "@/features/auth/use-auth-store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Splash_Screen from "./splash";

import '../global.css';

export const unstable_settings = {
    initialRouteName: "(app)",
}


SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
    duration: 500,
    fade: true,
});

export default function RootLayout (){

    const [appReady, setAppReady] = React.useState(false);
    const [splashFinished, setSplashFinished] = React.useState(false);


    React.useEffect(()=>{

        async function prepareApp() {
            try{
                resetDatabase();
                initializeDatabase();
                seedDatabase();

                await hydrateAuth();
            } finally {
                setAppReady(true);
            }
        }

        prepareApp();
    },[]);

    const handleSplashComplete = React.useCallback(()=>{
        setSplashFinished(true);
    }, []);

    const isAppReady = appReady && splashFinished;

    React.useEffect(()=>{
        if (!isAppReady){
            return
        }

        SplashScreen.hideAsync();
    }, [isAppReady]);

    if (!isAppReady){
        return(
            <Splash_Screen
                onComplete={handleSplashComplete}
            />
        )
    }
        return(
            <Providers>
                <Stack>
                    <Stack.Screen name="(app)" options={{headerShown: false}} />
                    <Stack.Screen name="login" options={{headerShown: false}} />
                    <Stack.Screen name="onboarding" options={{headerShown: false}} />
                </Stack>
            </Providers>
        );
}

function Providers({
    children,
}:{
    children: React.ReactNode;
}){
    return (
        <GestureHandlerRootView 
        style={styles.container} 
        >
            <SafeAreaProvider>
                <StatusBar style="dark"/>
                <KeyboardProvider>
                    <BottomSheetModalProvider>
                        {children}
                        <FlashMessage position="top" />
                    </BottomSheetModalProvider>
                </KeyboardProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },  
 })