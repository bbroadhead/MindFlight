import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { Lock, Unlock, Users, TrendingUp, AlertTriangle } from 'lucide-react-native';
import { Card, Label, Muted, PrimaryButton, Screen, Title } from '@/components/MindFlightUI';
import { useMindFlightStore } from '@/lib/mindflightStore';

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export default function Leader() {
  const user = useMindFlightStore(s => s.user);
  const isAuthenticated = useMindFlightStore(s => s.isAuthenticated);
  const setLeaderMode = useMindFlightStore(s => s.setLeaderMode);
  const logout = useMindFlightStore(s => s.logout);
  const entries = useMindFlightStore(s => s.entries);

  const demo = useMemo(() => {
    // Build an anonymized, aggregated snapshot.
    // For the prototype we generate a synthetic unit sample to show what the dashboard could look like,
    // while enforcing “no drill-down” design.
    const sampleSize = 85;
    let highStress = 0;
    let lowMood = 0;

    for (let i = 0; i < sampleSize; i++) {
      const stress = 1 + Math.floor(Math.random() * 5);
      const mood = 1 + Math.floor(Math.random() * 5);
      if (stress >= 4) highStress += 1;
      if (mood <= 2) lowMood += 1;
    }

    // Use local engagement only (device demo)
    const engagement7d = Math.min(1, entries.slice(0, 7).length / 7);

    return {
      sampleSize,
      highStressRate: highStress / sampleSize,
      lowMoodRate: lowMood / sampleSize,
      engagement7d,
    };
  }, [entries]);

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <View className="flex-row items-end justify-between">
          <Title>Leader View</Title>
          {isAuthenticated ? (
            <Pressable
              className="bg-white/5 border border-white/10 rounded-2xl px-3 py-2"
              onPress={() => {
                logout();
                Alert.alert('Signed out', 'You are now signed out.');
              }}
            >
              <Text className="text-white/80 text-sm font-semibold">Sign out</Text>
            </Pressable>
          ) : null}
        </View>

        <Text className="text-white/70 mt-1">
          Anonymous, aggregated trends only. No individual data. No drill‑down.
        </Text>

        {!isAuthenticated ? (
          <Card className="mt-6">
            <View className="flex-row items-center mb-2">
              <Lock size={18} color="rgba(255,255,255,0.8)" />
              <Text className="text-white font-semibold text-lg ml-2">Sign in required</Text>
            </View>
            <Text className="text-white/70">
              Leadership dashboards require login. Resources and general tools are available without login.
            </Text>
          </Card>
        ) : (
          <>
            <Card className="mt-6">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  {user?.isLeader ? <Unlock size={18} color="#22C55E" /> : <Lock size={18} color="#F59E0B" />}
                  <Text className="text-white font-semibold text-lg ml-2">Mode: {user?.isLeader ? 'Leader' : 'Standard'}</Text>
                </View>
                <Pressable
                  className="bg-white/5 border border-white/10 rounded-2xl px-3 py-2"
                  onPress={() => setLeaderMode(!(user?.isLeader ?? false))}
                >
                  <Text className="text-white/90 font-semibold">Toggle</Text>
                </Pressable>
              </View>

              <Text className="text-white/60 text-xs mt-3">
                Prototype note: This is a UI/UX demonstration. Production requires governance + privacy review.
              </Text>
            </Card>

            <View className="flex-row space-x-3 mt-4">
              <Card className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Users size={18} color="#4A90D9" />
                  <Text className="text-white/60 text-xs">Squadron sample</Text>
                </View>
                <Text className="text-white text-2xl font-bold mt-2">{demo.sampleSize}</Text>
                <Muted className="mt-1">Respondents (demo)</Muted>
              </Card>

              <Card className="flex-1">
                <View className="flex-row items-center justify-between">
                  <TrendingUp size={18} color="#4A90D9" />
                  <Text className="text-white/60 text-xs">Engagement</Text>
                </View>
                <Text className="text-white text-2xl font-bold mt-2">{pct(demo.engagement7d)}</Text>
                <Muted className="mt-1">Check‑ins (device)</Muted>
              </Card>
            </View>

            <View className="flex-row space-x-3 mt-4">
              <Card className="flex-1 border border-af-warning/30">
                <View className="flex-row items-center justify-between">
                  <AlertTriangle size={18} color="#F59E0B" />
                  <Text className="text-white/60 text-xs">High stress</Text>
                </View>
                <Text className="text-white text-2xl font-bold mt-2">{pct(demo.highStressRate)}</Text>
                <Muted className="mt-1">Stress 4–5 (demo)</Muted>
              </Card>

              <Card className="flex-1 border border-af-warning/30">
                <View className="flex-row items-center justify-between">
                  <AlertTriangle size={18} color="#F59E0B" />
                  <Text className="text-white/60 text-xs">Low mood</Text>
                </View>
                <Text className="text-white text-2xl font-bold mt-2">{pct(demo.lowMoodRate)}</Text>
                <Muted className="mt-1">Mood 1–2 (demo)</Muted>
              </Card>
            </View>

            <Card className="mt-4">
              <Label>Suggested commander actions (non‑clinical)</Label>
              <View className="space-y-2 mt-3">
                <Text className="text-white/70">• Review workload / schedule pinch points for the next 2 weeks</Text>
                <Text className="text-white/70">• Reinforce “help‑seeking = strength” messaging in roll call</Text>
                <Text className="text-white/70">• Promote chaplain + MFLC availability (no gatekeeping)</Text>
                <Text className="text-white/70">• Add a short “recovery buffer” after high‑tempo events</Text>
              </View>
              <PrimaryButton
                title="Export (demo)"
                className="mt-4"
                onPress={() => Alert.alert('Demo', 'Export would generate an aggregate report (no individual fields).')}
              />
            </Card>
          </>
        )}
      </ScrollView>
    </Screen>
  );
}
