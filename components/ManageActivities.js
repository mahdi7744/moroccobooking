// components/ManageActivities.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    city: '',
    price: '',
    discount: '',
    availability: '',
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const q = query(collection(db, 'activities'), where("ownerId", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const activitiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setActivities(activitiesData);
  };

  const handleAddActivity = async () => {
    try {
      await addDoc(collection(db, 'activities'), {
        ...newActivity,
        ownerId: auth.currentUser.uid,
        price: parseFloat(newActivity.price),
        discount: parseFloat(newActivity.discount),
      });
      setNewActivity({ name: '', description: '', city: '', price: '', discount: '', availability: '' });
      fetchActivities();
      alert('Activity added successfully');
    } catch (error) {
      console.error('Error adding activity:', error);
      alert('Failed to add activity');
    }
  };

  const handleUpdateActivity = async (id, updatedActivity) => {
    try {
      await updateDoc(doc(db, 'activities', id), updatedActivity);
      fetchActivities();
      alert('Activity updated successfully');
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('Failed to update activity');
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      await deleteDoc(doc(db, 'activities', id));
      fetchActivities();
      alert('Activity deleted successfully');
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Failed to delete activity');
    }
  };

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <Text style={styles.activityName}>{item.name}</Text>
      <Text>Price: ${item.price}</Text>
      <Text>Discount: {item.discount}%</Text>
      <Text>Availability: {item.availability}</Text>
      <Button title="Update" onPress={() => handleUpdateActivity(item.id, item)} />
      <Button title="Delete" onPress={() => handleDeleteActivity(item.id)} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Manage Activities</Text>
      <TextInput
        style={styles.input}
        placeholder="Activity Name"
        value={newActivity.name}
        onChangeText={(text) => setNewActivity({ ...newActivity, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newActivity.description}
        onChangeText={(text) => setNewActivity({ ...newActivity, description: text })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={newActivity.city}
        onChangeText={(text) => setNewActivity({ ...newActivity, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={newActivity.price}
        onChangeText={(text) => setNewActivity({ ...newActivity, price: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Discount (%)"
        value={newActivity.discount}
        onChangeText={(text) => setNewActivity({ ...newActivity, discount: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Availability (e.g., Mon-Fri, 9AM-5PM)"
        value={newActivity.availability}
        onChangeText={(text) => setNewActivity({ ...newActivity, availability: text })}
      />
      <Button title="Add Activity" onPress={handleAddActivity} />
      <Text style={styles.subtitle}>Your Activities</Text>
      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id}
      />
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  activityItem: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ManageActivities;