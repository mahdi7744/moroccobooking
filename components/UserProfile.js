// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserProfile = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace('Auth');
      })
      .catch(error => alert(error.message));
  };

  if (!profile) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.info}>Name: {profile.name}</Text>
      <Text style={styles.info}>Email: {auth.currentUser.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserProfile;