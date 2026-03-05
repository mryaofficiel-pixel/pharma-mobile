import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';

export default function Inscription({ navigation }) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [role, setRole] = useState('pharmacie');
  const [chargement, setChargement] = useState(false);

  const sInscrire = async () => {
    if (!nom.trim() || !email.trim() || !motDePasse.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    setChargement(true);
    try {
      const response = await fetch('http://10.115.104.247:3000/auth/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, mot_de_passe: motDePasse, role })
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Succes', 'Compte cree ! Attendez la validation de l administrateur.', [{ text: 'OK', onPress: () => navigation.navigate('Connexion') }]);
      } else {
        Alert.alert('Erreur', data.message || 'Erreur lors de l inscription');
      }
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
    }
    setChargement(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titre}>Creer un compte</Text>
      <Text style={styles.sousTitre}>Rejoignez PharmaLink</Text>
      <TextInput style={styles.input} placeholder='Nom' placeholderTextColor='#aaaaaa' value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder='Email' placeholderTextColor='#aaaaaa' value={email} onChangeText={setEmail} keyboardType='email-address' autoCapitalize='none' />
      <TextInput style={styles.input} placeholder='Mot de passe' placeholderTextColor='#aaaaaa' value={motDePasse} onChangeText={setMotDePasse} secureTextEntry />
      <Text style={styles.label}>Je suis :</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity style={[styles.roleBtn, role === 'pharmacie' && styles.roleBtnActif]} onPress={() => setRole('pharmacie')}>
          <Text style={[styles.roleTxt, role === 'pharmacie' && styles.roleTxtActif]}>Pharmacie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleBtn, role === 'livreur' && styles.roleBtnActif]} onPress={() => setRole('livreur')}>
          <Text style={[styles.roleTxt, role === 'livreur' && styles.roleTxtActif]}>Livreur</Text>
        </TouchableOpacity>
      </View>
      {chargement ? (
        <ActivityIndicator size='large' color='#1d6d80' />
      ) : (
        <TouchableOpacity style={styles.bouton} onPress={sInscrire}>
          <Text style={styles.boutonTexte}>Creer mon compte</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.lien} onPress={() => navigation.navigate('Connexion')}>
        <Text style={styles.lienTexte}>Deja un compte ? Se connecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 24 },
  titre: { fontSize: 28, fontWeight: 'bold', color: '#1d6d80', marginTop: 60, marginBottom: 8 },
  sousTitre: { fontSize: 14, color: '#888888', marginBottom: 32 },
  input: { backgroundColor: '#f5f8fa', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 12, padding: 14, color: '#333333', marginBottom: 16, fontSize: 15 },
  label: { fontSize: 15, color: '#333333', marginBottom: 12, fontWeight: 'bold' },
  roleContainer: { flexDirection: 'row', marginBottom: 24, gap: 12 },
  roleBtn: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 2, borderColor: '#e0e0e0', alignItems: 'center' },
  roleBtnActif: { borderColor: '#1d6d80', backgroundColor: '#e8f4f8' },
  roleTxt: { color: '#888888', fontWeight: 'bold' },
  roleTxtActif: { color: '#1d6d80' },
  bouton: { backgroundColor: '#fdc516', padding: 16, borderRadius: 12, alignItems: 'center', elevation: 4 },
  boutonTexte: { color: '#333333', fontSize: 16, fontWeight: 'bold' },
  lien: { marginTop: 20, alignItems: 'center', marginBottom: 40 },
  lienTexte: { color: '#1d6d80', fontSize: 14 },
});
