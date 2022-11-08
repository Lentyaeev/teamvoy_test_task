import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@react-native-material/core";
import ImageFrame from "../ImageFrame";
import moment from "moment";

export const ArticleView = ({ article }) => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={{ paddingBottom: 70 }}
  >
    <ImageFrame style={styles.image} url={article.urlToImage} />
    <Text style={styles.text} variant="h5">
      {article.title}
    </Text>
    <Text style={styles.text} variant="h6">
      {article.description}
    </Text>
    <Text style={styles.text} variant="h6">
      {article.author ? "© " + article.author : "No author set"}
    </Text>
    <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
      <Text style={styles.link}>{article.url}</Text>
    </TouchableOpacity>
    <Text style={styles.text} variant="h6">
      {"Published At: " +
        moment(article.publishedAt).format("YYYY-MM-DD HH:MM")}
    </Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  image: {
    height: 300,
    width: "100%",
    borderRadius: 20,
  },
  text: {
    paddingTop: 20,
  },
  link: {
    paddingTop: 20,
    color: "#00aeff",
  },
});
