import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { firestore, addDoc, collection, MESSAGES, serverTimestamp,query,onSnapshot,doc,deleteDoc } from './firebase/Config'
import { useEffect, useState } from 'react'

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES))
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []
      querySnapshot.forEach((doc) => {
        //console.log(doc.id)
        tempMessages.push({...doc.data(),id: doc.id})
      })
      setMessages(tempMessages)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  
  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))

    setNewMessage('')
    //console.log('Message saved')
  }

  const deleteMessage = async (id) => {
    await deleteDoc(doc(firestore,MESSAGES, id))
    //console.log('delete '+id)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <View style={styles.form}>
        <TextInput
          placeholder='Add new item...'
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <Button title='Save' onPress={() => save()}/>
      </View>
      <View>
        <ScrollView>
          {
            messages.map((message) => (
              <View key={message.id} style={styles.message}>
                <Text onPress={() => deleteMessage(message.id)}>{message.text}</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    marginTop: 48,
  },
  title: {
    fontSize: 24,
    marginTop: 48
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
  message: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  }
});
