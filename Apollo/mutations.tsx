import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
	mutation signIn($email: String!, $password: String!) {
		signIn(input: { email: $email, password: $password }) {
			token
			user {
				id
				name
				email
			}
		}
	}
`;

export const SIGN_UP_MUTATION = gql`
	mutation signUp($email: String!, $password: String!, $name: String!) {
		signUp(input: { email: $email, password: $password, name: $name }) {
			token
			user {
				id
				name
			}
		}
	}
`;

export const CREATE_TASK = gql`
	mutation createTask($content: String!, $blockId: ID!) {
		createTask(content: $content, blockId: $blockId) {
			id
			content
			isComplete
			block {
				id
				title
				tasks {
					id
					content
					isComplete
				}
			}
		}
	}
`;

export const UPDATE_TASK = gql`
	mutation updateTask($id: ID!, $content: String, $isComplete: Boolean) {
		updateTask(id: $id, content: $content, isComplete: $isComplete) {
			content
			isComplete
			block {
				id
				title
				tasks {
					id
					content
					isComplete
				}
			}
		}
	}
`;

export const DELETE_TASK = gql`
	mutation deleteTask($id: ID!) {
		deleteTask(id: $id)
	}
`;

export const UPDATE_TASK_LIST = gql`
	mutation updateTaskList($id: ID!, $title: String!) {
		updateTaskList(id: $id, title: $title) {
			id
			title
			users {
				id
				name
			}
		}
	}
`;

export const CREATE_BLOCK = gql`
	mutation createBlock($title: String!, $taskListId: ID!) {
		createBlock(title: $title, taskListId: $taskListId) {
			id
			title
			taskList {
				id
				title
				blocks {
					id
					title
					tasks {
						id
						content
					}
				}
			}
		}
	}
`;

export const DELETE_BLOCK = gql`
	mutation deleteBlock($id: ID!) {
		deleteBlock(id: $id)
	}
`;

export const CREATE_TASK_LIST = gql`
	mutation createTaskList($title: String!) {
		createTaskList(title: $title) {
			id
			title
			progress
			users {
				id
				name
			}
		}
	}
`;
