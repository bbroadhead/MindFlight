import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useMindFlightStore } from '@/lib/mindflightStore';
import { Card, PrimaryButton, SecondaryButton, SubTitle, Title } from '@/components/MindFlightUI';

function isMilEmail(email: string) {
  const e = email.trim().toLowerCase();
  return e.endsWith('.mil') && e.includes('@');
}

/**
 * Prototype login:
 * - Guest mode: no saved history across devices, but works instantly.
 * - Email mode: simple .mil email verification (simulated here).
 *
 * For production, this is where CAC-enabled SSO (or DS Logon) would live.
 */
export default function Login() {
  const router = useRouter();
  const loginAsGuest = useMindFlightStore(s => s.loginAsGuest);
  const loginWithEmail = useMindFlightStore(s => s.loginWithEmail);
  const isAuthenticated = useMindFlightStore(s => s.isAuthenticated);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');

  const simulatedCode = useMemo(() => '246810', []);

  if (isAuthenticated) {
    router.replace('/(tabs)/home');
    return null;
  }

  function requestCode() {
    if (!isMilEmail(email)) {
      Alert.alert('Use a .mil email', 'For the prototype, please use a .mil email address.');
      return;
    }
    setStep('code');
    if (Platform.OS === 'web') {
      // Helpful for demos: show the simulated code in-browser only.
      Alert.alert('Demo code sent', `Simulated one-time code: ${simulatedCode}`);
    }
  }

  function verify() {
    if (code.trim() !== simulatedCode) {
      Alert.alert('Invalid code', 'That code does not match. Try 246810 for this prototype.');
      return;
    }
    loginWithEmail(email.trim());
    router.replace('/(tabs)/home');
  }

  return (
    <SafeAreaView className="flex-1 bg-af-navy">
      <LinearGradient
        colors={['#0A1628', '#001F5C', '#0A1628']}
        style={{ flex: 1 }}
      >
        <View className="flex-1 px-6 pt-10">
          <View className="flex-row items-center mb-8">
            <View className="w-12 h-12 rounded-2xl bg-white/10 items-center justify-center mr-4 border border-white/10">
              <Shield color="#4A90D9" size={24} />
            </View>
            <View>
              <Title>MindFlight</Title>
              <SubTitle>360 Wellness & Resilience</SubTitle>
            </View>
          </View>

          <Card className="mb-4">
            <Text className="text-white font-semibold text-lg mb-1">Quick, stigma-free support</Text>
            <Text className="text-white/70">
              This prototype is non-clinical. It does not diagnose, treat, or create official records.
              If you need urgent help, use the Resources tab.
            </Text>
          </Card>

          <Card className="mb-4">
            <Text className="text-white font-semibold text-lg mb-3">Sign in (prototype)</Text>

            {step === 'email' ? (
              <>
                <Text className="text-white/80 text-sm mb-2">.mil email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="firstname.lastname@us.af.mil"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white"
                />
                <PrimaryButton title="Send one-time code" className="mt-4" onPress={requestCode} />
                <Text className="text-white/50 text-xs mt-2">
                  Production: CAC SSO / DS Logon. Prototype: email + code.
                </Text>
              </>
            ) : (
              <>
                <Text className="text-white/80 text-sm mb-2">One-time code</Text>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="Enter code"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  keyboardType="number-pad"
                  className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white"
                />
                <PrimaryButton title="Verify" className="mt-4" onPress={verify} />
                <Pressable onPress={() => setStep('email')} className="mt-3">
                  <Text className="text-af-accent font-semibold">Use a different email</Text>
                </Pressable>
              </>
            )}
          </Card>

          <SecondaryButton
            title="Continue as Guest"
            onPress={() => {
              loginAsGuest();
              router.replace('/(tabs)/home');
            }}
          />

          <Text className="text-white/40 text-xs mt-6">
            Data in this prototype is stored only on your device (encrypted at rest via platform storage).
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
