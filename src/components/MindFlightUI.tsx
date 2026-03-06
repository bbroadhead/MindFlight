import React from 'react';
import { View, Text, Pressable, PressableProps } from 'react-native';
import { cn } from '@/lib/cn';

export function Screen({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={cn('flex-1 bg-af-navy px-5 pt-6', className)}>
      {children}
    </View>
  );
}

export function Title({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Text className={cn('text-white text-3xl font-bold', className)}>{children}</Text>;
}

export function SubTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Text className={cn('text-white/70 text-base', className)}>{children}</Text>;
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={cn('bg-af-navy-light/60 border border-white/10 rounded-3xl p-4', className)}>
      {children}
    </View>
  );
}

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Text className={cn('text-white/80 text-sm font-semibold', className)}>{children}</Text>;
}

export function Muted({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Text className={cn('text-white/60 text-sm', className)}>{children}</Text>;
}

export function PrimaryButton({ title, className, ...props }: { title: string; className?: string } & PressableProps) {
  return (
    <Pressable
      {...props}
      className={cn('bg-af-accent rounded-2xl px-4 py-3 items-center justify-center', className)}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ title, className, ...props }: { title: string; className?: string } & PressableProps) {
  return (
    <Pressable
      {...props}
      className={cn('bg-white/5 border border-white/10 rounded-2xl px-4 py-3 items-center justify-center', className)}
    >
      <Text className="text-white/90 font-semibold">{title}</Text>
    </Pressable>
  );
}
