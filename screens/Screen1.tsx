import { StyleSheet, Text, View, ImageBackground, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../services/supabase'

export default function Screen1({navigation}:any) {
  const [id, setid] = useState(0)
  const [nombre, setnombre] = useState("")
  const [contrasenia, setcontrasenia] = useState("") 
  const [CI, setCI] = useState("")
  const [genero, setgenero] = useState("")
  const [edad, setedad] = useState("")

  function esContraseniaSegura(pass: string) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(pass);
  }

  async function guardarUsuario() {
    if (!id || !nombre || !contrasenia || !CI || !genero || !edad) {
      Alert.alert("Debe llenar todos los campos para registrarse.");
      return;
    }

    if (!esContraseniaSegura(contrasenia)) {
      Alert.alert(
        "Contraseña insegura",
        "Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
      );
      return;
    }

    const { error } = await supabase
      .from('usuarios')
      .insert({
        id: id,
        nombre: nombre,
        contrasenia: contrasenia,
        CI: CI,
        genero: genero,
        edad: edad,
      });

    if (error) {
      console.log(error);
      Alert.alert("Error en el registro", error.message);
    } else {
      Alert.alert("Registro exitoso", "Ahora puedes iniciar sesión", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    }
  }

  return (
    <ImageBackground source={{uri: "https://i.postimg.cc/SQZPvFjn/fondo1.jpg"}} style={styles.container}>
      <Button 
        title="Volver al inicio" 
        onPress={() => navigation.navigate('Welcome')} 
      />
      <View>
        <Text>REGISTRAR MASCOTA</Text>

        <TextInput 
          placeholder='idUsuario'
          onChangeText={(text) => setid(+text)}
          style={styles.txtInput}
        />

        <TextInput 
          placeholder='nombre'
          onChangeText={(text) => setnombre(text)} 
          style={styles.txtInput}
        />

        <TextInput 
          placeholder='Contraseña'
          secureTextEntry
          onChangeText={(text) => setcontrasenia(text)}
          style={styles.txtInput}
        />

        <TextInput 
          placeholder='CI'
          onChangeText={(text) => setCI(text)}
          style={styles.txtInput}
        />

        <TextInput 
          placeholder='genero'
          onChangeText={(text) => setgenero(text)}
          style={styles.txtInput}
        />

        <TextInput 
          placeholder='edad'
          onChangeText={(text) => setedad(text)}
          style={styles.txtInput}
        />

        <Button title='Guardar' color={'green'} onPress={guardarUsuario} />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgb(4, 4, 4)",
    borderRadius: 10,
    padding: 8,
  },
  txtInput: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 10
  }
})
