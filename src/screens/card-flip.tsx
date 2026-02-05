import { CardFlip, CardFlipFire } from "@/components/card-flip";
import Header from "@/components/Header";
import { ScrollView, View } from "react-native";


export default function CardFlipScreen() {
    return (
        <>
            <Header showBackButton />
            <View className="flex-1  bg-background">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1 p-[24px]"
                >
                    <CardFlip
                        title="Nike Air Max"
                        price="$100"
                        images={[
                            require('@/assets/img/shoe-2.jpg'),
                            require('@/assets/img/shoe-1.jpg'),
                            require('@/assets/img/shoe-5.jpg'),
                        ]}
                    />
                    <CardFlip
                        title="Adidas Ultraboost"
                        price="$150"
                        images={[
                            require('@/assets/img/shoe-3.jpg'),
                            require('@/assets/img/shoe-1.jpg'),
                            require('@/assets/img/shoe-2.jpg'),
                        ]}
                    />
                    <CardFlipFire
                        title="Streak Boost"
                        price="Keep the fire alive"
                        days={14}
                    />
                </ScrollView>
            </View>
        </>
    );
}


