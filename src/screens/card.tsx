import { View } from 'react-native';
import Header from '@/components/Header';

import React from 'react';
import CounterCard from '@/components/CounterCard';

export default function MasonryScreen() {
    return (
        <>
            <Header showBackButton />
            <View className='flex-1 p-6 bg-background'>
                <CounterCard />
            </View>
        </>
    );
}





