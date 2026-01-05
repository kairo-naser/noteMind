import { useTheme } from "@/theme/themeContext";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OptionsModal: React.FC<{ visible: boolean; onClose: () => void; onDelete: () => void }> = ({ visible, onClose, onDelete }) => {
  const { theme } = useTheme();
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.container, { backgroundColor: theme.card }]}> 
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              // confirm
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const { Alert } = require("react-native");
              Alert.alert("Delete note", "Are you sure you want to delete this note?", [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: onDelete },
              ]);
            }}
          >
            <Text style={[styles.deleteText, { color: "#ef4444" }]}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={onClose}>
            <Text style={[styles.cancelText, { color: theme.text }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  row: {
    paddingVertical: 14,
    alignItems: "center",
  },
  deleteText: { color: "#ef4444", fontWeight: "700" },
  cancelText: { color: "#111827" },
});

export default OptionsModal;
