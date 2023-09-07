import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { DateTime } from "luxon";

const Content = (props) => {
  const w = props.data;
  const limitedData = w.days.slice(0, 6);

  const currentDate = DateTime.now();
  const formattedDate = currentDate.toFormat("EEEE, MMMM d");

  function fahrenheitToCelsius(fahrenheit) {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return Math.floor(celsius);
  }

  function getDayNameFromDateText(dateText) {
    const parsedDate = DateTime.fromISO(dateText, { zone: "utc" });
    return parsedDate.toFormat("EEE");
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.div1}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.address}>{w ? w.address : "API Error"}</Text>
      </View>

      <View style={styles.conditions}>
        <Icon name="cloud" size={200} color="orange" />
        <Text style={styles.condition}>
          {w.currentConditions.icon
            ? w.currentConditions.conditions
            : "Loading ..."}
        </Text>
        <Text style={styles.temp}>
          {w.currentConditions
            ? fahrenheitToCelsius(w.currentConditions.temp)
            : "Loading"}
          &deg;C
        </Text>
      </View>
      <View style={styles.moreTemp}>
        {w.days ? (
          <FlatList
            style={styles.list}
            data={limitedData}
            horizontal={true}
            keyExtractor={(item) => item.datetime}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={{ textTransform: "uppercase" }}>
                  {getDayNameFromDateText(item.datetime)}
                </Text>
                <Text style={{ paddingVertical: 20 }}>
                  {fahrenheitToCelsius(item.tempmax)}&deg;C
                </Text>
                <Text style={{ color: "black" }}>
                  {fahrenheitToCelsius(item.tempmin)}&deg;C
                </Text>
              </View>
            )}
          />
        ) : (
          // <Text>Hey</Text>
          <Text>Loading ...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 15,
  },
  moreTemp: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 70,
  },
  temp: {
    color: "gray",
    fontSize: 50,
  },
  condition: {
    color: "black",
    fontSize: 20,
    paddingVertical: 10,
  },
  conditions: {
    // marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  div1: {
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    color: "white",
    paddingVertical: 50,
  },
  dateText: {
    fontSize: 30,
    color: "gray",
  },
  address: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 15,
    color: "gray",
    textTransform: "capitalize",
    letterSpacing: 1,
  },
});

export default Content;
