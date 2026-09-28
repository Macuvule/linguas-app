import { useIsFocused } from "expo-router/react-navigation";
import * as React from "react";
import { Platform } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';

type Props = { hidden?: boolean };

export function FocusAwareStatusBar ({ hidden = false}: Props) {
    const isFocused = useIsFocused();
     
    if (Platform.OS === 'web') 
        return null;
    return isFocused? (
        <SystemBars
            hidden={hidden}
        />
    ) : null;  
}


