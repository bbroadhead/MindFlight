import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { useMindFlightStore } from '@/lib/mindflightStore';
import { Card, Label, Muted, Screen, Title } from '@/components/MindFlightUI';

function avg(nums: number[]) {
  if (!nums.length) return 0;
  return nums.reduce((a,b)=>a+b,0)/nums.length;
}

export default function History() {
  const entries = useMindFlightStore(s => s.entries);
  const deleteEntry = useMindFlightStore(s => s.deleteEntry);
  const clearAll = useMindFlightStore(s => s.clearAllData);

  const stats = useMemo(() => {
    const last7 = entries.slice(0, 7);
    return {
      mood7: avg(last7.map(e => e.mood)),
      stress7: avg(last7.map(e => e.stress)),
      energy7: avg(last7.map(e => e.energy)),
      sleep7: avg(last7.map(e => e.sleep)),
    };
  }, [entries]);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="flex-row items-end justify-between">
          <Title>History</Title>
          <Pressable
            className="bg-white/5 border border-white/10 rounded-2xl px-3 py-2"
            onPress={() => {
              Alert.alert('Delete all data?', 'This will erase your saved check-ins on this device.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: clearAll },
              ]);
            }}
          >
            <Text className="text-white/80 text-sm font-semibold">Clear</Text>
          </Pressable>
        </View>

        <Text className="text-white/70 mt-1">Your private trend view (device-only).</Text>

        <View className="flex-row space-x-3 mt-5">
          <Card className="flex-1">
            <Label>7‑day avg mood</Label>
            <Text className="text-white text-2xl font-bold mt-1">{stats.mood7.toFixed(1)}/5</Text>
            <Muted className="mt-1">Higher is better</Muted>
          </Card>
          <Card className="flex-1">
            <Label>7‑day avg stress</Label>
            <Text className="text-white text-2xl font-bold mt-1">{stats.stress7.toFixed(1)}/5</Text>
            <Muted className="mt-1">Lower is better</Muted>
          </Card>
        </View>

        {entries.length === 0 ? (
          <Card className="mt-5">
            <Text className="text-white font-semibold text-lg">No entries yet</Text>
            <Text className="text-white/70 mt-1">Complete a Daily Check‑In to see trends here.</Text>
          </Card>
        ) : (
          <View className="mt-5 space-y-3">
            {entries.map((e) => (
              <Card key={e.id}>
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="text-white font-semibold">
                      {new Date(e.createdAt).toLocaleString()}
                    </Text>
                    <Text className="text-white/70 mt-1">
                      Mood {e.mood}/5 • Stress {e.stress}/5 • Energy {e.energy}/5 • Sleep {e.sleep}/5
                    </Text>
                    {e.note ? (
                      <Text className="text-white/60 mt-2">{e.note}</Text>
                    ) : null}
                  </View>
                  <Pressable
                    onPress={() => deleteEntry(e.id)}
                    className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 items-center justify-center"
                    accessibilityLabel="Delete entry"
                  >
                    <Trash2 size={18} color="rgba(255,255,255,0.75)" />
                  </Pressable>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
