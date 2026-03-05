import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';

export default function MesCommandes({ navigation }) {
  const [commandes, setCommandes] = useState([]);
  const [chargement, setChargement] = useState(true);

  const couleurStatut = (statut) => {
    if (statut === 'en_attente') return '#fdc516';
    if (statut === 'confirmee') return '#00c896';
    if (statut === 'refusee') return '#e74c3c';
    if (statut === 'livree') return '#1d6d80';
    return '#888888';
  };

  const texteStatut = (statut) => {
    if (statut === 'en_attente') return 'En attente';
    if (statut === 'confirmee') return 'Confirmee';
    if (statut === 'refusee') return 'Refusee';
    if (statut === 'livree') return 'Livree';
    return statut;
  };

  useEffect(() => {
    chargerCommandes();
  }, []);

  const chargerCommandes = async () => {
    setChargement(true);
    try {
      const response = await fetch('http://10.115.104.247:3000/commandes/passees', {
        headers: { Authorization: 'Bearer ' + global.token }
      });
      const data = await response.json();
      setCommandes(data);
    } catch (e) {
      console.log('Erreur chargement commandes', e);
    }
    setChargement(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.retour}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.titre}>Mes Commandes</Text>
      </View>
      {chargement ? (
        <ActivityIndicator size='large' color='#1d6d80' style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={commandes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.carte}>
              <View style={styles.carteHeader}>
                <Text style={styles.commandeId}>Commande #{item.id}</Text>
                <View style={[styles.badge, { backgroundColor: couleurStatut(item.statut) }]}>
                  <Text style={styles.badgeTexte}>{texteStatut(item.statut)}</Text>
                </View>
              </View>
              <Text style={styles.detail}>Produit ID : {item.produit_id}</Text>
              <Text style={styles.detail}>Ordonnance ID : {item.ordonnance_id}</Text>
              <Text style={styles.date}>{item.created_at}</Text>
              {item.statut === 'confirmee' && (
                <TouchableOpacity
                  style={styles.boutonSuivi}
                  onPress={() => navigation.navigate('SuiviLivraison', { commande_id: item.id })}>
                  <Text style={styles.boutonSuiviTexte}>Suivre la livraison</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.vide}>Aucune commande pour le moment</Text>
          }
        />
      )}
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
  header: {
    marginBottom: 24,
  },
  retour: {
    color: '#1d6d80',
    fontSize: 15,
    marginBottom: 8,
  },
  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d6d80',
  },
  carte: {
    backgroundColor: '#f5f8fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1d6d80',
  },
  carteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  commandeId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeTexte: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#aaaaaa',
    marginTop: 6,
  },
  boutonSuivi: {
    backgroundColor: '#1d6d80',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  boutonSuiviTexte: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  vide: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 40,
    fontSize: 15,
  },
});