import React from 'react';
import { View, Text, ScrollView, Pressable, Linking, Platform } from 'react-native';
import { PhoneCall, ShieldAlert, LifeBuoy } from 'lucide-react-native';
import { Card, Label, Muted, Screen, Title } from '@/components/MindFlightUI';

function link(url: string) {
  Linking.openURL(url).catch(() => {});
}

export default function Resources() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        <Title>Resources</Title>
        <Text className="text-white/70 mt-1">Crisis navigation (resource-only in this prototype).</Text>

        <Card className="mt-6 border border-af-danger/40">
          <View className="flex-row items-center mb-2">
            <ShieldAlert size={20} color="#EF4444" />
            <Text className="text-white font-semibold text-lg ml-2">If you are in immediate danger</Text>
          </View>
          <Text className="text-white/80">
            Call local emergency services now. If you’re on base, use emergency response procedures.
          </Text>
          <Text className="text-white/60 mt-2 text-xs">
            This app is not a medical device and is not monitored.
          </Text>
        </Card>

        <Card className="mt-4">
          <View className="flex-row items-center mb-2">
            <LifeBuoy size={20} color="#4A90D9" />
            <Text className="text-white font-semibold text-lg ml-2">Quick contacts</Text>
          </View>

          <View className="space-y-3 mt-2">
            <ResourceRow
              title="988 Suicide & Crisis Lifeline"
              subtitle="Call or text 988 (US)"
              onPress={() => link('tel:988')}
            />
            <ResourceRow
              title="Military OneSource"
              subtitle="Confidential support & counseling"
              onPress={() => link('https://www.militaryonesource.mil')}
            />
            <ResourceRow
              title="Chaplain"
              subtitle="24/7 support via your base command post"
              onPress={() => {}}
            />
            <ResourceRow
              title="Mental Health Clinic"
              subtitle="Use local base clinic number / referral process"
              onPress={() => {}}
            />
          </View>

          {Platform.OS === 'web' ? (
            <Text className="text-white/50 text-xs mt-4">
              Web demo note: phone dialing may not work in the browser. Use these as reference links.
            </Text>
          ) : null}
        </Card>

        <Card className="mt-4">
          <Label>Privacy & stigma reduction</Label>
          <Text className="text-white/70 mt-2">
            MindFlight is intended to be strictly personal. For the prototype, Resources are available without login.
          </Text>
          <Text className="text-white/60 mt-2">
            Leadership views (if enabled) should only display anonymous, aggregated trends—no individual data.
          </Text>
        </Card>
      </ScrollView>
    </Screen>
  );
}

function ResourceRow({ title, subtitle, onPress }: { title: string; subtitle: string; onPress: () => void }) {
  return (
    <Pressable
      className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
      onPress={onPress}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-white font-semibold">{title}</Text>
          <Text className="text-white/60 mt-1 text-sm">{subtitle}</Text>
        </View>
        <PhoneCall size={18} color="rgba(255,255,255,0.75)" />
      </View>
    </Pressable>
  );
}
