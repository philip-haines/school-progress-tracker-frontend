import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	FlatList,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Alert,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
// import TaskListItem from "../components/TaskList/TaskListItem";
import Block from "../components/TaskList/Block";
import { GET_TASK_LIST } from "../Apollo/Queries";
import { UPDATE_TASK_LIST } from "../Apollo/mutations";

export default function TabOneScreen() {
	const navigation = useNavigation();
	const [title, setTitle] = useState("");
	const [blocks, setBlocks] = useState([]);
	const route = useRoute();
	const id: number = route.params.id;

	const { data, loading, error } = useQuery(GET_TASK_LIST, {
		variables: { id },
	});

	const [updateTaskList] = useMutation(UPDATE_TASK_LIST);

	useEffect(() => {
		if (error) {
			Alert.alert("Error fetching. Please try again.", error.message);
		}
	}, [error]);

	useEffect(() => {
		if (data) {
			setTitle(data.getTaskList.title);
			setBlocks(data.getTaskList.blocks);
			console.log(data.getTaskList.blocks);
		}
	}, [data]);

	const handleTitleUpdate = () => {
		updateTaskList({
			variables: {
				id,
				title,
			},
		});
	};

	const handleNavigation = () => {
		navigation.navigate("AddUsersScreen", { id });
	};

	if (loading) {
		return <ActivityIndicator />;
	}

	if (!blocks) {
		return null;
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			style={{ flex: 1 }}
		>
			<View style={styles.container}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginHorizontal: 15,
					}}
				>
					<TextInput
						style={styles.title}
						onEndEditing={() => handleTitleUpdate()}
						onChangeText={setTitle}
						placeholder={"Title"}
						value={title}
					/>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Pressable
							onPress={handleNavigation}
							style={{
								height: 40,
								width: 40,
								borderRadius: 5,
								backgroundColor: "green",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<MaterialIcons
								name="groups"
								size={24}
								color="white"
							/>
						</Pressable>
					</View>
				</View>
				<FlatList
					data={blocks}
					renderItem={({ item, index }) => (
						// <TaskListItem
						// 	task={item}
						// 	newTaskOnSubmit={() => newTaskOnSubmit()}
						// 	deleteTaskOnBackspace={deleteTaskOnBackspace}
						// 	loading={deleteLoading}
						// />
						<Block block={item} />
					)}
					style={{ width: "100%" }}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 24,
		justifyContent: "space-around",
	},
	title: {
		width: "100%",
		fontSize: 20,
		fontWeight: "bold",
	},
});
