/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import _ from 'lodash';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

// const todosData = [
//   {
//     id: 1,
//     name: 'Walk the dog',
//     status: false,
//   },
//   {
//     id: 2,
//     name: 'Mow the lawn',
//     status: false,
//   },
//   {
//     id: 3,
//     name: 'Make your bed',
//     status: false,
//   },
//   {
//     id: 4,
//     name: 'Cook dinner',
//     status: false,
//   },
// ];

const App = () => {
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [checkedList, setCheckedList] = useState(['green']);
  const [isSelected, setSelection] = useState(false);

  React.useEffect(() => {
    // _.forEach(checkedList, i => {
    //   //   if (i.name === 'Aaa') {
    //   //     i.stats = true;
    //   //   }
    // });
  }, [todoList]);

  const addInput = () => {
    setTodoList(currentItem => [
      ...currentItem,
      {id: _.uniqueId(), name: input, status: false},
    ]);
    setInput('');
  };
  console.log(todoList);

  const checkHandle = itemID => {
    setTodoList(
      todoList.map(i => {
        if (itemID === i.id) {
          i.status = !i.status;
        }
        return i;
      }),
    );
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={str => setInput(str)}
          placeholder="input todo"
          value={input}
        />
        <Button title="create" onPress={addInput} />
      </View>
      <FlatList
        data={todoList}
        keyExtractor={item => item.id}
        renderItem={item => {
          return (
            <View style={styles.list}>
              <TouchableOpacity onPress={() => checkHandle(item.item.id)}>
                <View style={styles.list}>
                  <CheckBox
                    value={item.item.status}
                    onValueChange={() => checkHandle(item.item.id)}
                  />
                  <Text>{item.item.name}</Text>
                </View>
              </TouchableOpacity>
              <Button
                title="delete"
                onPress={() => {
                  const newMapList = todoList.filter(
                    i => i.id !== item.item.id,
                  );
                  setTodoList(newMapList);
                }}
              />
            </View>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
