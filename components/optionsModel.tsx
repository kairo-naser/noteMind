import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OptionsModal: React.FC<{ visible: boolean; onClose: () => void; onDelete: () => void }> = ({ visible, onClose, onDelete }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.row} onPress={onDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
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
