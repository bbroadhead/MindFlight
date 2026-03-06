import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Wind, Moon, Brain, Sparkles } from 'lucide-react-native';
import { Card, Label, Muted, PrimaryButton, Screen, Title } from '@/components/MindFlightUI';
import { useMindFlightStore, getReflectionPrompt } from '@/lib/mindflightStore';

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

export default function Tools() {
  const last = useMindFlightStore(s => s.entries[0]);
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const coachPrompt = useMemo(() => {
    if (!last) return 'What would make today 1% better?';
    return getReflectionPrompt(last.mood, last.stress);
  }, [last]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) {
      setPhase('idle');
      setSeconds(0);
      return;
    }
    const t = seconds % 16; // 4-4-8 (inhale-hold-exhale)
    if (t < 4) setPhase('inhale');
    else if (t < 8) setPhase('hold');
    else setPhase('exhale');
  }, [running, seconds]);

  const elapsed = `${pad2(Math.floor(seconds / 60))}:${pad2(seconds % 60)}`;

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <Title>Tools</Title>
        <Text className="text-white/70 mt-1">Fast, stigma‑free micro‑tools (2–5 minutes).</Text>

        <Card className="mt-6">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 items-center justify-center mr-3">
              <Wind size={20} color="#4A90D9" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-lg">Breathing (4‑4‑8)</Text>
              <Muted>Inhale 4 • Hold 4 • Exhale 8</Muted>
            </View>
            <Pressable
              className="bg-white/5 border border-white/10 rounded-2xl px-3 py-2"
              onPress={() => setRunning(r => !r)}
            >
              <Text className="text-white/90 font-semibold">{running ? 'Stop' : 'Start'}</Text>
            </Pressable>
          </View>

          <View className="mt-4 items-center">
            <Text className="text-white text-4xl font-bold">{phase === 'idle' ? 'Ready' : phase.toUpperCase()}</Text>
            <Text className="text-white/60 mt-2">Elapsed {elapsed}</Text>
            <Text className="text-white/70 mt-3 text-center">
              Tip: lengthen the exhale. This supports down‑regulation (calming).
            </Text>
          </View>
        </Card>

        <Card className="mt-4">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 items-center justify-center mr-3">
              <Brain size={20} color="#4A90D9" />
            </View>
            <Text className="text-white font-semibold text-lg">Grounding (5‑4‑3‑2‑1)</Text>
          </View>
          <Muted>
            Name 5 things you can see, 4 you can feel, 3 you can hear, 2 you can smell, 1 you can taste.
          </Muted>
          <Text className="text-white/70 mt-3">
            If you can’t do all senses, that’s fine—do what you can in your current environment.
          </Text>
        </Card>

        <Card className="mt-4">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 items-center justify-center mr-3">
              <Moon size={20} color="#4A90D9" />
            </View>
            <Text className="text-white font-semibold text-lg">Sleep reset (2 minutes)</Text>
          </View>
          <View className="space-y-2 mt-2">
            <Text className="text-white/70">• Reduce bright light 60–90 minutes before sleep</Text>
            <Text className="text-white/70">• Keep the room cool and dark</Text>
            <Text className="text-white/70">• If your mind is racing, write 3 bullets then “park” it</Text>
            <Text className="text-white/70">• Avoid caffeine late day (timing varies by person)</Text>
          </View>
        </Card>

        <Card className="mt-4">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 items-center justify-center mr-3">
              <Sparkles size={20} color="#4A90D9" />
            </View>
            <Text className="text-white font-semibold text-lg">AI Coach (prototype)</Text>
          </View>
          <Muted>
            Narrow scope: reflection prompts + tool suggestions. No diagnosis, no treatment, no risk scoring.
          </Muted>
          <Text className="text-white/70 mt-3">{coachPrompt}</Text>
          <PrimaryButton
            title="Get another prompt"
            className="mt-4"
            onPress={() => {
              // Local prompt shuffle — no external API in this prototype.
              const pool = [
                'What’s the most important thing to protect today—sleep, hydration, connection, or focus?',
                'What would you tell a teammate in the same situation?',
                'What’s one boundary you can hold today?',
                'What’s one small win you can complete in 10 minutes?',
              ];
              const pick = pool[Math.floor(Math.random() * pool.length)];
              // eslint-disable-next-line no-alert
              alert(pick);
            }}
          />
        </Card>
      </ScrollView>
    </Screen>
  );
}
