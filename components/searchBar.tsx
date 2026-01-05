import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

interface SearchBarProps {
	searchItem: string;
	setSearchItem: (item: string) => void;
	debouncedSearch: (item: string) => void;
	placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	searchItem,
	setSearchItem,
	debouncedSearch,
	placeholder = "Search tasks...",
}) => {
	const { theme } = useTheme();
	return (
		<View style={styles.wrapper}>
			<View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.accent + "22" }]}> 
				<Ionicons name="search" size={20} color={theme.accent} />
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={theme.text + "88"}
					style={[styles.searchInput, { color: theme.text }]}
					clearButtonMode="while-editing"
					onChangeText={(item) => {
						setSearchItem(item);
						debouncedSearch(item);
					}}
					value={searchItem}
					autoCapitalize="none"
					autoCorrect={false}
					underlineColorAndroid="transparent"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 16,
		width: "100%",
		marginTop: 8,
		marginBottom: 8,
	},
	searchBar: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#ffffff",
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: "rgba(70,130,191,0.12)",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 4,
	},
	searchInput: {
		flex: 1,
		marginLeft: 10,
		fontSize: 16,
		color: "#1f2937",
		padding: Platform.OS === "android" ? 0 : 4,
	},
});

export default SearchBar;
