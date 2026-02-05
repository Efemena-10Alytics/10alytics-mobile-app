import { View, Text, ImageSourcePropType, ImageBackground, ScrollView, Pressable } from 'react-native';
import Header from '@/components/Header';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeOutUp, LinearTransition, FadeInLeft, FadeOutLeft } from 'react-native-reanimated';

type FilterType = 'rating' | 'price' | 'brand';

interface Product {
    id: string;
    title: string;
    image: any;
    price: number;
    rating: number;
    brand: string;
}

const PRODUCTS: Product[] = [
    { id: '1', title: 'Nike Air Max', image: require('@/assets/img/shoe-1.jpg'), price: 24.99, rating: 4.5, brand: 'Nike' },
    { id: '2', title: 'Adidas Superstar', image: require('@/assets/img/shoe-2.jpg'), price: 29.99, rating: 4.9, brand: 'Adidas' },
    { id: '3', title: 'Vans Old Skool', image: require('@/assets/img/shoe-5.jpg'), price: 34.99, rating: 4.9, brand: 'Vans' },
    { id: '4', title: 'Nike Air Force 1', image: require('@/assets/img/shoe-1.jpg'), price: 49.99, rating: 4.7, brand: 'Nike' },
    { id: '5', title: 'Adidas Stan Smith', image: require('@/assets/img/shoe-2.jpg'), price: 39.99, rating: 4.6, brand: 'Adidas' },
    { id: '6', title: 'Vans Sk8-Hi', image: require('@/assets/img/shoe-3.jpg'), price: 34.99, rating: 4.8, brand: 'Vans' },
];

export default function ProductGridScreen() {
    const [activeFilter, setActiveFilter] = useState<FilterType>('rating');

    const sortedProducts = [...PRODUCTS].sort((a, b) => {
        switch (activeFilter) {
            case 'rating':
                return b.rating - a.rating;
            case 'price':
                return a.price - b.price;
            case 'brand':
                return a.brand.localeCompare(b.brand);
            default:
                return 0;
        }
    });

    return (
        <>
            <Header showBackButton />
            <ScrollView className="flex-1 bg-background">
                <View className='flex flex-row items-center gap-1 px-6 mb-4'>
                    <Chip
                        label='Rating'
                        isActive={activeFilter === 'rating'}
                        onPress={() => setActiveFilter('rating')}
                    />
                    <Chip
                        label='Price'
                        isActive={activeFilter === 'price'}
                        onPress={() => setActiveFilter('price')}
                    />
                    <Chip
                        label='Brand'
                        isActive={activeFilter === 'brand'}
                        onPress={() => setActiveFilter('brand')}
                    />
                </View>
                <View className='flex flex-row flex-wrap flex-1 px-4'>
                    {sortedProducts.map((product, index) => (
                        <ProductItem
                            key={product.id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            rating={product.rating}
                            index={index}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    );
}



const Chip = ({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) => {
    return (
        <Pressable onPress={onPress} className="relative rounded-full px-4 py-2 bg-secondary overflow-hidden">
            {isActive && (
                <Animated.View
                    entering={FadeInLeft.springify().damping(100).stiffness(900)}
                    //exiting={FadeOutLeft.springify().damping(100).stiffness(600)}
                    className="absolute inset-0 bg-primary rounded-full"
                />
            )}
            <Text className={`text-sm font-semibold relative z-10 ${isActive ? 'text-invert' : 'text-text opacity-60'}`}>
                {label}
            </Text>
        </Pressable>
    );
};

const ProductItem = ({
    title,
    image,
    price,
    rating,
    index,
}: {
    title: string;
    image: any;
    price: number;
    rating: number;
    index: number;
}) => {
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 50).springify().damping(100).stiffness(600)}
            exiting={FadeOutUp.springify()}
            layout={LinearTransition.springify(0).damping(80).stiffness(600)}
            className='w-1/2 h-[240px] p-1.5'
        >
            <View className='rounded-2xl overflow-hidden w-full h-full'>
                <ImageBackground source={image as ImageSourcePropType} className='w-full h-full'>
                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.2)']}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <View className='p-4 flex-1 justify-between'>
                            <View className='flex-row items-center ml-auto'>
                                <Feather name='star' size={12} color='white' />
                                <Text className='text-sm font-semibold text-white ml-1'>{rating}</Text>
                            </View>
                            <View>
                                <Text className='font-bold text-white'>{title}</Text>
                                <Text className='text-sm text-white'>${price}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </Animated.View>
    );
};





