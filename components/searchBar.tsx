// import { useTheme } from "@/theme/themeContext";
// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { Platform, StyleSheet, TextInput, View } from "react-native";

// /**
//  * Simple, documented SearchBar component.
//  * Props:
//  * - searchItem: current search string
//  * - setSearchItem: updater for controlled input
//  * - debouncedSearch: function that performs debounced filtering
//  * - placeholder: optional placeholder text
//  */
// interface SearchBarProps {
// 	searchItem: string;
// 	setSearchItem: (item: string) => void;
// 	debouncedSearch: (item: string) => void;
// 	placeholder?: string;
// }

// const SearchBar: React.FC<SearchBarProps> = ({
// 	searchItem,
// 	setSearchItem,
// 	debouncedSearch,
// 	placeholder = "Search notes...",
// }) => {
// 	const { theme } = useTheme();

// 	// Handler for text changes: update controlled state and trigger debounced search
// 	const handleChange = (text: string) => {
// 		setSearchItem(text);
// 		debouncedSearch(text);
// 	};

// 	return (
// 		<View style={styles.wrapper}>
// 			<View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.accent + "22" }]}> 
// 				<Ionicons name="search" size={20} color={theme.accent} />
// 				<TextInput
// 					placeholder={placeholder}
// 					placeholderTextColor={theme.text + "88"}
// 					style={[styles.searchInput, { color: theme.text }]}
// 					clearButtonMode="while-editing"
// 					onChangeText={handleChange}
// 					value={searchItem}
// 					autoCapitalize="none"
// 					autoCorrect={false}
// 					underlineColorAndroid="transparent"
// 				/>
// 			</View>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	wrapper: {
// 		paddingHorizontal: 16,
// 		width: "100%",
// 		marginTop: 8,
// 		marginBottom: 8,
// 	},
// 	searchBar: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		paddingVertical: 8,
// 		paddingHorizontal: 12,
// 		borderRadius: 999,
// 		borderWidth: 1,
// 		shadowColor: "#000",
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowOpacity: 0.08,
// 		shadowRadius: 6,
// 		elevation: 4,
// 	},
// 	searchInput: {
// 		flex: 1,
// 		marginLeft: 10,
// 		fontSize: 16,
// 		padding: Platform.OS === "android" ? 0 : 4,
// 	},
// });

// export default SearchBar;
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

const SearchBar: React.FC<SearchBarProps> = ({ searchItem, setSearchItem, debouncedSearch, placeholder = "Search notes..." }) => {
    const { theme } = useTheme();

    const handleChange = (text: string) => {
        setSearchItem(text);
        debouncedSearch(text);
    };

    return (
        <View style={styles.wrapper}>
            {/* Search Container: Pill-shaped with a light border and subtle shadow */}
            <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.accent + "33" }]}> 
                <Ionicons name="search-outline" size={20} color={theme.accent} />
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={theme.text + "66"}
                    style={[styles.searchInput, { color: theme.text }]}
                    clearButtonMode="while-editing"
                    onChangeText={handleChange}
                    value={searchItem}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
        marginVertical: 12,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: Platform.OS === "ios" ? 12 : 4,
        paddingHorizontal: 16,
        borderRadius: 16, // More modern rounded corners
        borderWidth: 1,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontWeight: "500",
    },
});

export default SearchBar;