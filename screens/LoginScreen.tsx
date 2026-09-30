import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    async function handleLogin() {
        const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('nombre', nombre)
        .eq('contrasenia', contrasenia)
        .single();

        if (error) {
        console.log(error);
        Alert.alert("Error", "No existe el usuario");
        return;
        }

        if (data) {
        // ✅ Guardar sesión en AsyncStorage
        await AsyncStorage.setItem("userId", data.id.toString());

        Alert.alert("Bienvenido", `Hola ${data.nombre}`);
        navigation.navigate('Bottom', { screen: 'Perfil', params: { userId: data.id } });
        } else {
        Alert.alert("Credenciales inválidas", "Usuario o contraseña incorrectos");
        }
    }

    return (
        <ImageBackground 
        source={{ uri: "https://i.postimg.cc/SQZPvFjn/fondo1.jpg" }} 
        style={styles.container}
        >
        <Button title="Volver al inicio" onPress={() => navigation.navigate('Welcome')} />

        <View style={styles.innerContainer}>
            <Text style={styles.title}>LoginScreen</Text>

            <TextInput
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
            style={styles.txtInput}
            autoCapitalize="none"
            />

            <TextInput
            placeholder="Contraseña"
            secureTextEntry
            value={contrasenia}
            onChangeText={setContrasenia}
            style={styles.txtInput}
            />

            <Button 
            title="Iniciar Sesión" 
            onPress={handleLogin} 
            />
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        margin: 20,
        alignItems: 'center',
        backgroundColor: "rgba(4, 4, 4, 0.7)",
        borderRadius: 10,
        padding: 16,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    txtInput: {
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10,
        padding: 10,
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
});
