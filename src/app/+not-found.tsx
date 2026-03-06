import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFound() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-af-navy items-center justify-center px-6">
      <Text className="text-white text-2xl font-bold mb-2">Page not found</Text>
      <Text className="text-white/70 text-center mb-6">That route doesn’t exist.</Text>
      <Pressable className="bg-af-accent rounded-2xl px-5 py-3" onPress={() => router.replace('/(tabs)')}>
        <Text className="text-white font-semibold">Go Home</Text>
      </Pressable>
    </View>
  );
}
