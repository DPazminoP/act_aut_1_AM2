import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen({ navigation, route }: any) {
    const [nombre, setNombre] = useState<string>("Usuario sin registrar");
    const [edad, setEdad] = useState<number | null>(null);
    const [genero, setGenero] = useState<string>("");

    const userId = route?.params?.userId;

    useEffect(() => {
        async function fetchUsuario() {
        try {
            let id = userId;
            if (!id) {
            id = await AsyncStorage.getItem("userId");
            }
            if (!id) {
            Alert.alert("Error", "No se encontró sesión activa");
            navigation.navigate("Login");
            return;
            }

            const { data, error } = await supabase
            .from('usuarios')
            .select('nombre, edad, genero')
            .eq('id', id)
            .single();

            if (error) {
            console.log(error);
            Alert.alert("Error", "No se pudo cargar el perfil");
            } else if (data) {
            setNombre(data.nombre);
            setEdad(Number(data.edad));
            setGenero(data.genero);
            }
        } catch (err) {
            console.log(err);
        }
        }

        fetchUsuario();
    }, [userId]);

    async function logout() {
        await AsyncStorage.removeItem("userId"); 
        navigation.navigate("Welcome"); 
    }

    function confirmLogout() {
        Alert.alert(
        "Cerrar sesión",
        "¿Estás seguro de que quieres salir?",
        [
            { text: "Cancelar", style: "cancel" },
            { text: "Sí", style: "destructive", onPress: logout }
        ]
        );
    }

    return (
        <ImageBackground 
        source={{ uri: "https://i.postimg.cc/SQZPvFjn/fondo1.jpg" }} 
        style={styles.container}
        >
        <Image 
            source={{ uri: "https://i.postimg.cc/fRN1GkSp/perfilgenerico.jpg" }} 
            style={styles.avatar} 
        />

        <View style={styles.infoBox}>
            <Text style={styles.name}>{nombre}</Text>
            <Text style={styles.email}>
            {edad !== null ? `${edad} años` : "Edad no disponible"}
            </Text>
            <Text style={styles.email}>
            {genero ? `Género: ${genero}` : "Género no disponible"}
            </Text>
        </View>

        <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate("ListaProductos")}
        >
            <Text style={styles.buttonText}>Ver Productos</Text>
        </TouchableOpacity>

        {/* Botón para salir con confirmación */}
        <TouchableOpacity 
            style={styles.button2} 
            onPress={confirmLogout}
        >
            <Text style={styles.buttonText}>Salir</Text>
        </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        paddingLeft: 30,
        paddingTop: 50,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: "#FACC15",
    },
    infoBox: {
        marginBottom: 30,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        color: "#E5E7EB",
        marginBottom: 8,
    },
    button: {
        backgroundColor: "#FACC15",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: "flex-start",
    },
    button2: {
        backgroundColor: "#FACC15",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: "flex-start",
    },
    buttonText: {
        color: "#1E3A8A",
        fontSize: 16,
        fontWeight: "bold",
    },
});
