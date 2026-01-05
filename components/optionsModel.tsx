import { useTheme } from "@/theme/themeContext";
import React from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * Bottom options modal shown for a selected note.
 * - `visible`: whether modal is visible
 * - `onClose`: called to dismiss the modal
 * - `onDelete`: called when deletion is confirmed
 */
type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const OptionsModal: React.FC<Props> = ({ visible, onClose, onDelete }) => {
  const { theme } = useTheme();

  const confirmDelete = () => {
    Alert.alert("Delete note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.container, { backgroundColor: theme.card }]}> 
          <TouchableOpacity style={styles.row} onPress={confirmDelete}>
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
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  row: {
    paddingVertical: 14,
    alignItems: "center",
  },
  deleteText: { fontWeight: "700" },
  cancelText: {},
});

export default OptionsModal;
