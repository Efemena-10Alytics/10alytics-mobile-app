import { Link, Href } from 'expo-router';
import { ScrollView, View, Text, Pressable } from 'react-native';
import Header from '@/components/Header';
import Feather from '@expo/vector-icons/Feather';
import useThemeColors from '@/contexts/ThemeColors';
import '../../../global.css';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { Feather as FeatherIcons } from '@expo/vector-icons';

type FeatherIconName = keyof typeof FeatherIcons.glyphMap;

export default function Home() {
    const insets = useSafeAreaInsets();

    return (
        <>
            <Header hasAvatar />
            <ScrollView style={{ paddingTop: insets.top + 0 }} className='px-6 pt-0  bg-background'>

            </ScrollView>
        </>
    );
}


interface LinkItemProps {
    href: Href;
    icon: FeatherIconName;
    title: string;
    description: string;
    comingSoon?: boolean;
}

const LinkItem = ({ href, icon, title, description, comingSoon = false }: LinkItemProps) => {
    const colors = useThemeColors();
    return (
        <Link href={href} asChild>
            <Pressable
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.07,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
                className='flex-row items-center bg-secondary rounded-3xl px-4 py-4 mb-3'>
                <View className='w-12 h-12 bg-background flex items-center justify-center rounded-full'>
                    <Feather name={icon} size={18} color={colors.icon} />
                </View>
                <View className='justify-center ml-4'>
                    <View className='flex-row items-center'>
                        <Text className='text-base font-bold text-text'>{title}</Text>
                        {comingSoon &&
                            <View className='bg-sky-500 rounded-full px-2 py-[3px] ml-2'>
                                <Text className='text-xs text-white'>Soon</Text>
                            </View>
                        }
                    </View>
                    <Text className='text-sm text-text opacity-50'>{description}</Text>
                </View>
                <View className='ml-auto opacity-30'>
                    <Feather name='chevron-right' size={20} color={colors.icon} />
                </View>
            </Pressable>
        </Link>
    )
}
