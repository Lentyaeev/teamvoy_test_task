import { StyleSheet, View } from "react-native";
import { Chip, Switch } from "@react-native-material/core";

export const DateView = ({
  setChecked,
  setIsOpen,
  setParams,
  firstDate,
  secondDate,
  checked,
  params,
}) => {
  return (
    <View style={styles.dateField}>
      <Chip
        variant="outlined"
        label={firstDate}
        onPress={() => setIsOpen(true)}
      />
      <Chip
        variant="outlined"
        label={secondDate}
        onPress={() => setIsOpen(true)}
      />
      <Switch value={checked} onValueChange={() => setChecked(!checked)} />
      <Chip
        variant="outlined"
        label={params ? "relavance" : "popularity"}
        onPress={() => setParams((prev) => !prev)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateField: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
});
