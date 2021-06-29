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
import FilterComponent from './src/filterComponent';

const App = () => {
  const [input, setInput] = useState<string>('');
  const [todoList, setTodoList] = useState<Array>([]);
  const [filterSelected, setFilterSelector] = useState<number>(0);

  const addInput = () => {
    if (input === '') {
      return;
    }
    setTodoList(currentItem => [
      ...currentItem,
      {id: _.uniqueId(), name: input, status: false},
    ]);
    setInput('');
  };

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
      <View style={styles.filterContainer}>
        <FilterComponent
          onPress={() => {
            setFilterSelector(0);
          }}
          title="All"
          color={filterSelected === 0 ? 'blue' : 'black'}
        />
        <FilterComponent
          onPress={() => {
            setFilterSelector(1);
          }}
          title="CheckList"
          color={filterSelected === 1 ? 'blue' : 'black'}
        />
        <FilterComponent
          onPress={() => {
            setFilterSelector(2);
          }}
          title="UnCheckList"
          color={filterSelected === 2 ? 'blue' : 'black'}
        />
      </View>
      <FlatList
        data={todoList}
        keyExtractor={item => item.id}
        renderItem={item => {
          if (
            filterSelected === 0 ||
            (filterSelected === 1 && item.item.status) ||
            (filterSelected === 2 && !item.item.status)
          ) {
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
          }
        }}
      />
      <Button
        title="Delete All"
        onPress={() => {
          setTodoList([]);
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
});
export default App;
