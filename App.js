import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Content from "./components/Content";

const App = () => {
  const [city, setCity] = useState("Shamli");
  const [w, setW] = useState([]);

  const fetchData = async () => {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},India?key=Q6L67RM6BAZ79E33GRG793Q35`;

    // "https://weatherapi-o61e.onrender.com/api/data"
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setW(data);
      })
      .catch((error) => {
        console.log("Error hello:", error);
      });
  };

  const handleSubmit = () => {
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
    // console.log(w, "STATE WEATHER");
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter City ..."
            value={city}
            onChangeText={(city) => setCity(city)}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>{w.address ? <Content data={w} /> : <Text>Loading ...</Text>}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 70,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    width: 200,
    height: 40,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#ccc",
  },
  submitButton: {
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default App;
