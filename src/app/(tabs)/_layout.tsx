import { Tabs } from 'expo-router';
import { Home, Sparkles, HeartPulse, BookOpen, BarChart3 } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A1628',
          borderTopColor: 'rgba(255,255,255,0.1)',
        },
        tabBarActiveTintColor: '#4A90D9',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Check-In',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: 'Tools',
          tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Resources',
          tabBarIcon: ({ color, size }) => <HeartPulse color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="leader"
        options={{
          title: 'Leader',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
