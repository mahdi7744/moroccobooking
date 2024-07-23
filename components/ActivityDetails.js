// components/ActivityDetails.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';

const ActivityDetails = ({ route, navigation }) => {
  const { activity } = route.params;

  const handleBook = () => {
    // TODO: Implement booking functionality
    console.log('Booking activity:', activity.name);
    // navigation.navigate('Booking', { activity });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: activity.imageUrl }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{activity.name}</Text>
        <Text style={styles.description}>{activity.description}</Text>
        <Text style={styles.city}>Location: {activity.city}</Text>
        <Text style={styles.price}>
          Price: ${activity.price.toFixed(2)}
          {activity.discount > 0 && (
            <Text style={styles.discount}> ({activity.discount}% off)</Text>
          )}
        </Text>
        <Text style={styles.availability}>Available: {activity.availability}</Text>
        <Button title="Book Now" onPress={handleBook} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  detailsContainer: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  city: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  discount: {
    color: '#28a745',
  },
  availability: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default ActivityDetails;