import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { useMindFlightStore, type MoodLevel, type StressLevel, getReflectionPrompt } from '@/lib/mindflightStore';
import { Card, Label, Muted, PrimaryButton, Screen, SecondaryButton, Title } from '@/components/MindFlightUI';

function clampToLevel(n: number): MoodLevel {
  const v = Math.round(n) as MoodLevel;
  return (Math.min(5, Math.max(1, v)) as MoodLevel);
}

const MOOD_EMOJI: Record<number, string> = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };
const STRESS_EMOJI: Record<number, string> = { 1: '🟢', 2: '🟢', 3: '🟡', 4: '🟠', 5: '🔴' };

export default function Home() {
  const addEntry = useMindFlightStore(s => s.addEntry);
  const entries = useMindFlightStore(s => s.entries);

  const [mood, setMood] = useState<MoodLevel>(3);
  const [stress, setStress] = useState<StressLevel>(3);
  const [energy, setEnergy] = useState<MoodLevel>(3);
  const [sleep, setSleep] = useState<MoodLevel>(3);
  const [note, setNote] = useState('');

  const prompt = useMemo(() => getReflectionPrompt(mood, stress), [mood, stress]);

  const lastCheckIn = entries[0]?.createdAt;

  function submit() {
    addEntry({ mood, stress, energy, sleep, note: note.trim() || undefined });
    setNote('');
    Alert.alert('Check-in saved', 'Nice work. Consider a quick tool in the Tools tab if you want.');
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <Title>Daily Check‑In</Title>
        <Text className="text-white/70 mt-1">
          30–60 seconds. Private to you. Non‑clinical.
        </Text>

        {lastCheckIn ? (
          <Text className="text-white/40 text-xs mt-2">
            Last check‑in: {new Date(lastCheckIn).toLocaleString()}
          </Text>
        ) : (
          <Text className="text-white/40 text-xs mt-2">No check‑ins yet.</Text>
        )}

        <Card className="mt-6">
          <Label>How are you feeling today? {MOOD_EMOJI[mood]}</Label>
          <View className="mt-3">
            <Slider
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={mood}
              onValueChange={(v) => setMood(clampToLevel(v))}
              minimumTrackTintColor="#4A90D9"
              maximumTrackTintColor="rgba(255,255,255,0.2)"
              thumbTintColor="#C0C0C0"
            />
            <View className="flex-row justify-between mt-1">
              <Muted>Low</Muted>
              <Muted>High</Muted>
            </View>
          </View>
        </Card>

        <Card className="mt-4">
          <Label>Stress level {STRESS_EMOJI[stress]}</Label>
          <View className="mt-3">
            <Slider
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={stress}
              onValueChange={(v) => setStress(clampToLevel(v))}
              minimumTrackTintColor="#F59E0B"
              maximumTrackTintColor="rgba(255,255,255,0.2)"
              thumbTintColor="#C0C0C0"
            />
            <View className="flex-row justify-between mt-1">
              <Muted>Calm</Muted>
              <Muted>Overloaded</Muted>
            </View>
          </View>
        </Card>

        <View className="flex-row space-x-3 mt-4">
          <Card className="flex-1">
            <Label>Energy</Label>
            <Text className="text-white/70 mt-1">{MOOD_EMOJI[energy]} {energy}/5</Text>
            <Slider
              className="mt-2"
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={energy}
              onValueChange={(v) => setEnergy(clampToLevel(v))}
              minimumTrackTintColor="#22C55E"
              maximumTrackTintColor="rgba(255,255,255,0.2)"
              thumbTintColor="#C0C0C0"
            />
          </Card>

          <Card className="flex-1">
            <Label>Sleep</Label>
            <Text className="text-white/70 mt-1">🛌 {sleep}/5</Text>
            <Slider
              className="mt-2"
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={sleep}
              onValueChange={(v) => setSleep(clampToLevel(v))}
              minimumTrackTintColor="#60A5FA"
              maximumTrackTintColor="rgba(255,255,255,0.2)"
              thumbTintColor="#C0C0C0"
            />
          </Card>
        </View>

        <Card className="mt-4">
          <Label>Optional reflection</Label>
          <Text className="text-white/70 mt-2">{prompt}</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Type a few sentences… (optional)"
            placeholderTextColor="rgba(255,255,255,0.35)"
            multiline
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white mt-3"
            style={{ minHeight: 96, textAlignVertical: 'top' }}
          />
          <PrimaryButton title="Save Check‑In" className="mt-4" onPress={submit} />
          <Text className="text-white/40 text-xs mt-2">
            If you are in immediate danger or thinking of self-harm, use Resources now or call emergency services.
          </Text>
        </Card>

        <View className="mt-4">
          <SecondaryButton title="Open a quick tool" onPress={() => Alert.alert('Tip', 'Go to the Tools tab for breathing, grounding, and sleep tips.')} />
        </View>
      </ScrollView>
    </Screen>
  );
}
