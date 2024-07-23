// components/BusinessOwnerProfile.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const BusinessOwnerProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    businessName: '',
    description: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const userDoc = doc(db, 'businessOwners', auth.currentUser.uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await setDoc(doc(db, 'businessOwners', auth.currentUser.uid), profile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Business Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={profile.businessName}
        onChangeText={(text) => setProfile({ ...profile, businessName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={profile.description}
        onChangeText={(text) => setProfile({ ...profile, description: text })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={profile.address}
        onChangeText={(text) => setProfile({ ...profile, address: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={profile.phone}
        onChangeText={(text) => setProfile({ ...profile, phone: text })}
        keyboardType="phone-pad"
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
      <Button title="Manage Activities" onPress={() => navigation.navigate('ManageActivities')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default BusinessOwnerProfile;