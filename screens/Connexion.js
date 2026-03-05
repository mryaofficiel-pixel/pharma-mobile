import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';

export default function Connexion({ navigation }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [chargement, setChargement] = useState(false);

  const seConnecter = async () => {
    if (!email.trim() || !motDePasse.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    setChargement(true);
    try {
      const response = await fetch('http://10.115.104.247:3000/auth/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_de_passe: motDePasse })
      });
      const data = await response.json();
      if (response.ok) {
        global.token = data.token;
        global.utilisateur = data.utilisateur;
        navigation.navigate('Menu');
      } else {
        Alert.alert('Erreur', data.message || 'Identifiants incorrects');
      }
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
    }
    setChargement(false);
  };

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
      {chargement ? (
        <ActivityIndicator size='large' color='#1d6d80' style={{ marginTop: 16 }} />
      ) : (
        <TouchableOpacity style={styles.bouton} onPress={seConnecter}>
          <Text style={styles.boutonTexte}>Se connecter</Text>
        </TouchableOpacity>
      )}
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
