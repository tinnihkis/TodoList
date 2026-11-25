import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Task } from '../types/Task'

interface TodoRowProps {
    item: Task
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

export default function Row({ item, onToggle, onDelete }: TodoRowProps) {
    return (
        <View style={styles.todoRow}>
            <Pressable
                style={styles.task}
                onPress={() => onToggle(item.id)}
            >
                <Text style={[
                    styles.todoText,
                    item.completed === 1 && styles.completedText
                ]}>
                    {item.text}
                </Text>
            </Pressable>

            <Pressable onPress={() => onDelete(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    todoRow: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        padding: 4,
        margin: 4,
        borderColor: '#c1c0c0',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center'
    },
    todoText: {
        flex: 1,
        color: '#000'
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#999'

    },
    task: {
        flex: 1
    },
    deleteText: {
        color: 'red',
        padding: 8
    }
})