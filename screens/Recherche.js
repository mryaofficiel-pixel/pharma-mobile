import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useState } from 'react';

export default function Recherche({ navigation }) {
  const [recherche, setRecherche] = useState('');
  const [resultats, setResultats] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState('');

  const chercher = async () => {
    if (!recherche.trim()) return;
    setChargement(true);
    setErreur('');
    try {
      const response = await fetch('http://10.115.104.247:3000/recherche/' + recherche);
      const data = await response.json();
      setResultats(data); if(data.length > 0) navigation.navigate('Resultats', { resultats: data, recherche: recherche }); if(data.length > 0) navigation.navigate('Resultats', { resultats: data, recherche: recherche });
    } catch (e) {
      setErreur('Impossible de contacter le serveur');
    }
    setChargement(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Rechercher un medicament</Text>
      <View style={styles.barreRecherche}>
        <TextInput
          style={styles.input}
          placeholder='Nom du medicament...'
          placeholderTextColor='#aaaaaa'
          value={recherche}
          onChangeText={setRecherche}
        />
        <TouchableOpacity style={styles.bouton} onPress={chercher}>
          <Text style={styles.boutonTexte}>Chercher</Text>
        </TouchableOpacity>
      </View>
      {chargement && <ActivityIndicator size='large' color='#1d6d80' style={{ marginTop: 20 }} />}
      {erreur ? <Text style={styles.erreur}>{erreur}</Text> : null}
      <FlatList
        data={resultats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.carte}>
            <Text style={styles.nomMedicament}>{item.nom}</Text>
            <Text style={styles.pharmacie}>{item.pharmacie}</Text>
            <Text style={styles.ville}>{item.ville}</Text>
            {item.distance_km && <Text style={styles.distance}>{item.distance_km} km</Text>}
          </View>
        )}
        ListEmptyComponent={
          !chargement && recherche ? <Text style={styles.vide}>Aucun resultat trouve</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 50,
  },
  titre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1d6d80',
    marginBottom: 20,
  },
  barreRecherche: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f8fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    color: '#333333',
    fontSize: 15,
  },
  bouton: {
    backgroundColor: '#1d6d80',
    padding: 14,
    borderRadius: 12,
    justifyContent: 'center',
    elevation: 4,
  },
  boutonTexte: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  carte: {
    backgroundColor: '#f5f8fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1d6d80',
  },
  nomMedicament: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  pharmacie: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 2,
  },
  ville: {
    fontSize: 13,
    color: '#888888',
  },
  distance: {
    fontSize: 13,
    color: '#1d6d80',
    fontWeight: 'bold',
    marginTop: 6,
  },
  erreur: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  vide: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 30,
    fontSize: 15,
  },
});
