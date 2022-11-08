import { View, StyleSheet, Modal } from "react-native";
import DateRangePicker from "rn-select-date-range";
import moment from "moment";

export const DatePickerModal = ({
  isOpen,
  setIsOpen,
  setHasDateChanged,
  setSelectedRange,
}) => {
  return (
    <Modal
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      animationType="fade"
      transparent
    >
      <View style={styles.datePickerWrapper}>
        <View style={styles.datePicker}>
          <DateRangePicker
            onSelectDateRange={(range) => {
              setHasDateChanged(true);
              setSelectedRange(range);
            }}
            blockSingleDateSelection={true}
            responseFormat="YYYY-MM-DD"
            maxDate={moment()}
            minDate={moment().subtract(20, "days")}
            onConfirm={() => setIsOpen(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    borderRadius: 15,
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
  },
  datePickerWrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(26, 26, 26, 0.6)",
  },
});
