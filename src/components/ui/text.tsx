import {TextProps} from 'react-native';
import * as React from 'react';
import {Text as NText, StyleSheet} from 'react-native';

import {twMerge} from 'tailwind-merge';

type Props = {
    className?: string;
} & TextProps;

export function Text({
    className = '',
    style,
    children,
    ... Props
}: Props) {
    const textStyle = React.useMemo(
        ()=> twMerge(
            'font-inter text-base font-normal text-black',
            className,
        ),
        [className],
    );
    return (
        <NText className ={textStyle} style={style} {...Props}>
            {children}
        </NText>
    )
}