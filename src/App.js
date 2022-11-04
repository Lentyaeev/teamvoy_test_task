import { Button, ListItem, TextInput, Chip, Switch, Text} from '@react-native-material/core';
import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, StatusBar, ScrollView, ActivityIndicator, Modal} from 'react-native';
import { getArticles } from './helpers/getArticles';
import DateRangePicker from "rn-select-date-range";
import moment from 'moment';
import ArticleView from './components/ArticleView';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const firstDate = moment().subtract(20, 'days').format("YYYY-MM-DD");
  const secondDate = moment().format("YYYY-MM-DD");
  const [selectedRange, setRange] = useState({firstDate: firstDate, secondDate: secondDate});
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [params, setParams] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [hasDateChanged, setHasDateChanged] = useState(false);

  const searchHandler = () => {
    setIsLoading(true);
    const request = {
      query: query,
      from: checked ? selectedRange.firstDate : '',
      to: checked ? selectedRange.secondDate: '',
      params: params,
    }
    getArticles(request)
    .then(res => {
      if (res.status !== 200) {
        setError('Error loading data, api is broken')
      }
      return res.json()
    })
    .then(res => {
      if (Array.isArray(res.articles)) {
        setArticles(res.articles);
      }
    })
    .finally(() => setIsLoading(false));
  }

  const updateDate = hasDateChanged && checked;

  useEffect(() => {
    searchHandler();
    setHasDateChanged(false);
  }, [checked, params, updateDate]);

  const selectedArticle = articles.find(article => article.url === selectedId);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.searchField}>
        <TextInput 
          label="Search" 
          variant="standard" 
          style={styles.input}
          onChangeText={e => {
            setHasChanged(true);
            setQuery(e);
          }}
          value={query}
          placeholder='cats'
        />
        <Button 
          title='search'
          style={{width: '30%'}}
          onPress={() => {
            if (hasChanged) {
              setHasChanged(false);
              searchHandler();
            } else {
              return;
            }
          }}
          disabled={!query}
        />
      </View>
      <View style={styles.dateField}>
        <Chip variant="outlined" label={selectedRange.firstDate} onPress={() => setIsOpen(true)}/>
        <Chip variant="outlined" label={selectedRange.secondDate} onPress={() => setIsOpen(true)} />
        <Switch value={checked} onValueChange={() => setChecked(!checked)} />
        <Chip variant="outlined" label={params ? 'relavance' : 'popularity'} onPress={() => setParams((prev) => !prev)}/>
      </View>
      <Modal 
        visible={isOpen} 
        onRequestClose={() => setIsOpen(false)}
        animationType='fade'
        transparent
      >
        <View style={styles.datePickerWrapper}>
          <View style={styles.datePicker}>
            <DateRangePicker
                onSelectDateRange={(range) => {
                  setHasDateChanged(true);
                  setRange(range);
                }}
                blockSingleDateSelection={true}
                responseFormat="YYYY-MM-DD"
                maxDate={moment()}
                minDate={moment().subtract(20, "days")}
                onConfirm={() => setIsOpen(false)}
            />
          </View>
        </View>
      </Modal>
      {!isLoading ?
        (!error ? <ScrollView style={styles.list}>
          {articles.length !== 0 ? articles.map((article, index) => (
            <ListItem 
              title={article.title}
              key={index}
              secondaryText={article.description}
              onPress={() => setSelectedId(article.url)}
            />
          ))
          : (<View style={{flex: 1, alignItems: 'center'}}>
              <Text variant='h4'>Nothing to show</Text>
            </View>
          )}
        </ScrollView> : <Text style={{flex: 1}} variant='h5'>{error}</Text>)
      : <ActivityIndicator size={100} style={{flex: 1}} />}
      <Modal
        onRequestClose={() => setSelectedId(null)}
        animationType="slide"
        visible={selectedId !== null}>
        {selectedArticle 
        ? <ArticleView 
          article={selectedArticle}
          setSelectedId={setSelectedId}
        /> : ''}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%'
  },
  input: {
    width: '70%',
    paddingHorizontal: 15,
  },
  searchField: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  dateField: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
  },
  datePicker: {
    borderRadius: 15,
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
  },
  datePickerWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.6)'
  }
});
