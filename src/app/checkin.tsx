import { View, Text } from 'react-native';

export default function CheckInModal() {
  return (
    <View className="flex-1 bg-af-navy items-center justify-center px-6">
      <Text className="text-white text-xl font-semibold">Check‑In</Text>
      <Text className="text-white/70 mt-2 text-center">Use the Check‑In tab to complete your daily entry.</Text>
    </View>
  );
}
