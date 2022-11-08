import { StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Text } from "@react-native-material/core";
import { ArticleView } from "./ArticleView";

export const ArticleModal = ({ article, setSelectedId, selectedId }) => (
  <Modal
    onRequestClose={() => setSelectedId(null)}
    animationType="slide"
    visible={selectedId !== null}
  >
    <TouchableOpacity onPress={() => setSelectedId(null)}>
      <Text variant="h3" style={styles.backButton}>
        {"< Back"}
      </Text>
    </TouchableOpacity>
    <ArticleView article={article} />
  </Modal>
);

const styles = StyleSheet.create({
  backButton: {
    color: "#00aeff",
    fontSize: 25,
    paddingLeft: 15,
    paddingTop: 15,
  },
});
