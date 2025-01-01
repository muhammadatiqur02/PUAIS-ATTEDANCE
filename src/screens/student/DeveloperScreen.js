import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DeveloperInstructorPage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Developer and Instructor</Text>
      </View>

      {/* Instructor Info */}
      <View style={styles.section}>
        <View style={styles.infoContainer}>
        <Image
                            source={require('../../assets/images/kingshuk.jpg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Kingshuk Dhar</Text>
            <Text style={styles.designation}>Assistant Professor</Text>
            <Text style={styles.dept}>Department of CSE</Text>
            <Text style={styles.role}>Role: Supervisor</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
        <Image
                            source={require('../../assets/images/soumen.jpg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Soumen Chakraborty</Text>
            <Text style={styles.role}>Role: Technical Advisor</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
        <Image
                            source={require('../../assets/images/gazi.jpeg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Gazi Mohammad Tajuddin</Text>
            <Text style={styles.role}>Role: Technical Support</Text>
          </View>
        </View>
      </View>
      {/* Developer Info */}
      <View style={styles.section}>
        <View style={styles.infoContainer}>
        <Image
                            source={require('../../assets/images/atique.jpeg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Muhammad Atiqur Rahman</Text>
            <Text style={styles.role}>Role: Developer</Text>
            <Text style={styles.version}>Version: 2.0</Text>
            <Text style={styles.batch}>Batch: 37th</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
        <Image
                            source={require('../../assets/images/liton.jpeg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Liton Das</Text>
            <Text style={styles.role}>Role: Developer</Text>
            <Text style={styles.version}>Version: 2.0</Text>
            <Text style={styles.batch}>Batch: 37th</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
        <Image
                            source={require('../../assets/images/mitu.jpeg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Imam Ali Mito</Text>
            <Text style={styles.role}>Role: Developer</Text>
            <Text style={styles.version}>Version: 2.0</Text>
            <Text style={styles.batch}>Batch: 37th</Text>
          </View>
        </View>
      </View>


      <View style={styles.section}>
        <View style={styles.infoContainer}>
        <Image
                            source={require('../../assets/images/angana.jpeg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Angana Barua</Text>
            <Text style={styles.role}>Role: Developer</Text>
            <Text style={styles.version}>Version: 1.0</Text>
            <Text style={styles.batch}>Batch: 33rd</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
        <Image
                            source={require('../../assets/images/fariha.jpeg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Fariha Chowdhury Bristy</Text>
            <Text style={styles.role}>Role: Developer</Text>
            <Text style={styles.version}>Version: 1.0</Text>
            <Text style={styles.batch}>Batch: 33rd</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
        <Image
                            source={require('../../assets/images/tasmin.jpeg')}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 5,
                                margin: 20
                            }}
                        
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Tasnim Sultana Chowdhury</Text>
            <Text style={styles.role}>Role: Developer</Text>
            <Text style={styles.version}>Version: 1.0</Text>
            <Text style={styles.batch}>Batch: 33rd</Text>
          </View>
        </View>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#FB6E50', // Changed from #4CAF50 to red
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    margin: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  designation: {
    fontSize: 14,
    color: '#777',
  },
  dept: {
    fontSize: 14,
    color: '#555',
  },
  role: {
    fontSize: 14,
    color: '#555',
  },
  version: {
    fontSize: 14,
    color: '#555',
  },
  batch: {
    fontSize: 14,
    color: '#555',
  },
});

export default DeveloperInstructorPage;
