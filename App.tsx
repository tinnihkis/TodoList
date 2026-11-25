
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from './types/Task';
import Row from './components/Row';

export default function App() {

  const [input, setInput] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadTodos = async () => {
      const savedTasks = await AsyncStorage.getItem('tasks')

      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks))
      }

      setIsLoaded(true)
    }

    loadTodos()
  }, [])

  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  const addTask = () => {
    if (!input.trim()) return

    const id = Date.now()
    const task: Task = { id, text: input, completed: 0 }

    setTasks([...tasks, task])
    setInput("")
    console.log("Adding new item")
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: task.completed === 0 ? 1 : 0 }
        : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }


  return (
    <SafeAreaView style={styles.container}>
      <View>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder='Add new task...'
        onSubmitEditing={addTask}
        returnKeyType="done"
      />
  
      <FlatList<Task>
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Row
            item={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
      />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
