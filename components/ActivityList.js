// components/ActivityList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

const ActivityList = ({ navigation }) => {
  const [activities, setActivities] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const q = query(collection(db, 'activities'));
    const querySnapshot = await getDocs(q);
    const activitiesData = [];
    const citiesSet = new Set();

    querySnapshot.forEach((doc) => {
      const activity = { id: doc.id, ...doc.data() };
      activitiesData.push(activity);
      citiesSet.add(activity.city);
    });

    setActivities(activitiesData);
    setCities(['All Cities', ...Array.from(citiesSet)]);
  };

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity
      style={styles.activityItem}
      onPress={() => navigation.navigate('ActivityDetails', { activity: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.activityImage} />
      <View style={styles.activityInfo}>
        <Text style={styles.activityName}>{item.name}</Text>
        <Text style={styles.activityCity}>{item.city}</Text>
        <Text style={styles.activityPrice}>
          ${item.price.toFixed(2)}
          {item.discount > 0 && (
            <Text style={styles.discountText}> ({item.discount}% off)</Text>
          )}
        </Text>
        <Text style={styles.activityAvailability}>Available: {item.availability}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCityItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cityItem,
        selectedCity === item && styles.selectedCity,
      ]}
      onPress={() => setSelectedCity(item)}
    >
      <Text style={styles.cityText}>{item}</Text>
    </TouchableOpacity>
  );

  const filteredActivities = selectedCity && selectedCity !== 'All Cities'
    ? activities.filter(activity => activity.city === selectedCity)
    : activities;

  return (
    <View style={styles.container}>
      <FlatList
        data={cities}
        renderItem={renderCityItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cityList}
      />
      <FlatList
        data={filteredActivities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cityList: {
    marginBottom: 10,
  },
  cityItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCity: {
    backgroundColor: '#007AFF',
  },
  cityText: {
    color: '#333',
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityImage: {
    width: 100,
    height: 100,
  },
  activityInfo: {
    flex: 1,
    padding: 10,
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activityCity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityPrice: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  discountText: {
    color: '#28a745',
  },
  activityAvailability: {
    fontSize: 12,
    color: '#666',
  },
});

export default ActivityList;