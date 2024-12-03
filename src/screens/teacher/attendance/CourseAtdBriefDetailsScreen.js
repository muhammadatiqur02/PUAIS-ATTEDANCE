import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../../components/Header';
import Message from '../../../components/Message';
import { GLOBAL_BACKEND_URL } from '../../../constants/baseUrl';
import colors from '../../../theme/colors';

function CourseAtdBriefDetailsScreen({ route, navigation }) {
  const { sessionId, date, data } = route.params;
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const getBriefDetails = async () => {
    setLoading(true);
    try {
      const url = `${GLOBAL_BACKEND_URL}/StudentAttendance/brifReport?sessionCourseId=${sessionId}&date=${moment(date).format('YYYY-MM-DD')}&deptId=1`;
      console.log('brifReport', url);

      const response = await axios.get(url);
      if (response.data.Data) {
        setStudents(response.data.Data);
        setMessage(response.data.Message);
      } else {
        setError(response.data.Message);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBriefDetails();
  }, []);

  return (
    <>
      <Header title="History" onPressBack={() => navigation.goBack()} />
      <ScrollView style={styles.Container}>
        {loading && <ActivityIndicator size="large" color={colors.primary} />}
        {error && <Message error message={error} margin />}
        {message && <Message success message={message} margin />}

        <View style={styles.summary}>
          <Text style={styles.text}>Total Student: {data.TotalStudent}</Text>
          <Text style={styles.text}>Present Student: {data.PresentStudent}</Text>
          <Text style={styles.text}>Absent Student: {data.AbsentStudent}</Text>
        </View>

        <View>
          {students
            ?.sort((a, b) => parseInt(a.roll) - parseInt(b.roll)) // Ensure numerical sorting
            .map((student, index) => (
              <View
                key={index}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      student.status === 'Present'
                        ? colors.success_light
                        : colors.danger_light,
                  },
                ]}
              >
                <View style={{ flex: 2 }}>
                  <Text style={styles.rollText}>{student.roll}</Text>
                  <Text style={styles.nameText}>{student.name}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.statusText}>{student.status}</Text>
                </View>
              </View>
            ))}
        </View>

        <View style={{ height: 10 }} />
      </ScrollView>
    </>
  );
}

export default CourseAtdBriefDetailsScreen;

const styles = StyleSheet.create({
  Container: {
    padding: 10,
  },
  summary: {
    backgroundColor: colors.primary_light,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    color: colors.black,
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 5,
  },
  rollText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray_dim,
  },
  nameText: {
    fontWeight: 'bold',
    color: colors.gray_dim,
  },
  statusText: {
    color: colors.gray,
  },
});
