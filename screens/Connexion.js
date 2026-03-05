import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Connexion({ navigation }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Connexion</Text>
      <Text style={styles.sousTitre}>Bienvenue sur PharmaLink</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor='#aaaaaa'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='Mot de passe'
        placeholderTextColor='#aaaaaa'
        value={motDePasse}
        onChangeText={setMotDePasse}
        secureTextEntry
      />
        <TouchableOpacity style={styles.bouton} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.boutonTexte}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.lien} onPress={() => navigation.navigate('Inscription')}>
        <Text style={styles.lienTexte}>Pas encore de compte ? S inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    justifyContent: 'center',
  },
  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1d6d80',
    marginBottom: 8,
  },
  sousTitre: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#f5f8fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    color: '#333333',
    marginBottom: 16,
    fontSize: 15,
  },
  bouton: {
    backgroundColor: '#1d6d80',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 4,
  },
  boutonTexte: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lien: {
    marginTop: 20,
    alignItems: 'center',
  },
  lienTexte: {
    color: '#1d6d80',
    fontSize: 14,
  },
});
