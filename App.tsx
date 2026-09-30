import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Navegador } from './navigation/MainNavigator';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkSession() {
      const storedId = await AsyncStorage.getItem("userId");
      setUserId(storedId);
      setLoading(false);
    }
    checkSession();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FACC15" />
      </View>
    );
  }

  // ✅ Aquí ya NO envolvemos con NavigationContainer
  // porque MainNavigator.tsx ya lo tiene
  return (
    <>
      <Navegador userId={userId} />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
