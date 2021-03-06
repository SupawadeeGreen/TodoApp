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
  ListRenderItem,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FilterComponent from './src/filterComponent';

type Todo = {
  id: string;
  name: string;
  status: boolean;
};

const App = () => {
  const [input, setInput] = useState<string>('');
  const [todoList, setTodoList] = useState<Array<Todo>>([]);
  const [filterSelected, setFilterSelector] = useState<number>(0);

  const addInput = () => {
    if (input === '') {
      return;
    }
    setTodoList(currentItem => [
      ...currentItem,
      {
        id: _.uniqueId(),
        name: input,
        status: false,
      },
    ]);
    setInput('');
  };

  const checkHandle = (itemID: string) => {
    setTodoList(
      todoList.map(i => {
        if (itemID === i.id) {
          i.status = !i.status;
        }
        return i;
      }),
    );
  };

  const renderTodoItem: ListRenderItem<Todo> = info => {
    if (
      filterSelected === 0 ||
      (filterSelected === 1 && info.item.status) ||
      (filterSelected === 2 && !info.item.status)
    ) {
      return (
        <View style={styles.list}>
          <TouchableOpacity onPress={() => checkHandle(info.item.id)}>
            <View style={styles.list}>
              <CheckBox
                value={info.item.status}
                onValueChange={() => checkHandle(info.item.id)}
              />
              <Text style={styles.itemText}>{info.item.name}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const newMapList = todoList.filter(i => i.id !== info.item.id);
              setTodoList(newMapList);
            }}
            style={styles.deleteButton}>
            <Text style={styles.createText}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={str => setInput(str)}
          placeholder="Add todo on your list ..."
          value={input}
        />
        <TouchableOpacity onPress={addInput} style={styles.createButton}>
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <FilterComponent
          onPress={() => setFilterSelector(0)}
          title="All"
          color={filterSelected === 0 ? '#2196F3' : '#888'}
        />
        <FilterComponent
          onPress={() => {
            setFilterSelector(1);
          }}
          title="CheckList"
          color={filterSelected === 1 ? '#2196F3' : '#888'}
        />
        <FilterComponent
          onPress={() => {
            setFilterSelector(2);
          }}
          title="UnCheckList"
          color={filterSelected === 2 ? '#2196F3' : '#888'}
        />
      </View>
      <FlatList
        data={todoList}
        keyExtractor={(item: Todo) => item.id.toString()}
        renderItem={renderTodoItem}
      />
      {todoList.length > 0 && (
        <Button
          color="#b82222"
          title="Delete All"
          onPress={() => {
            setTodoList([]);
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    padding: 15,
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 15,
    borderColor: '#888',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
  },
  createButton: {
    height: 30,
    width: 60,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  createText: {
    color: 'white',
  },
  itemText: {
    color: '#5a5a5a',
  },
  deleteButton: {
    height: 30,
    width: 60,
    backgroundColor: '#b82222',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
export default App;
