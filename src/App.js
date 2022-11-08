import { Button, TextInput } from "@react-native-material/core";
import { useState, useEffect } from "react";
import moment from "moment";
import { StyleSheet, View, StatusBar, Linking } from "react-native";
import { getArticles } from "./helpers/getArticles";
import { DatePickerModal } from "./components/DatePickerModal";
import { DateView } from "./components/DateView";
import { ArticleList } from "./components/ArticleList";
import { ArticleModal } from "./components/ArticleView/ArticleModal";
export default function App() {
  const firstDate = moment().subtract(20, "days").format("YYYY-MM-DD");
  const secondDate = moment().format("YYYY-MM-DD");
  const [selectedRange, setSelectedRange] = useState({
    firstDate: firstDate,
    secondDate: secondDate,
  });
  const [hasDateChanged, setHasDateChanged] = useState(false);
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [params, setParams] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    searchHandler();
    setHasDateChanged(false);
  }, [checked, params, updateDate]);
  
  const handleTextChange = (e) => {
    setHasChanged(true);
    setQuery(e);
  }

  const searchPressHandler = () => {
    if (hasChanged) {
      setHasChanged(false);
      searchHandler();
    } else {
      return;
    }
  };

  const searchHandler = () => {
    setIsLoading(true);
    const request = {
      query: query,
      from: checked ? selectedRange.firstDate : "",
      to: checked ? selectedRange.secondDate : "",
      params: params,
    };
    getArticles(request)
      .then((res) => {
        if (res.status !== 200) {
          setError("Error loading data, api is broken");
        }
        return res.json();
      })
      .then((res) => {
        if (Array.isArray(res.articles)) {
          setArticles(res.articles);
        }
      })
      .catch(() => setError("No internet connection"))
      .finally(() => setIsLoading(false));
  };

  const updateDate = hasDateChanged && checked;

  const selectedArticle = articles.find(
    (article) => article.url === selectedId
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.searchField}>
        <TextInput
          label="Search"
          variant="standard"
          style={styles.input}
          onChangeText={handleTextChange}
          value={query}
          placeholder="cats"
        />
        <Button
          title="search"
          style={{ width: "30%" }}
          onPress={() => searchPressHandler()}
          disabled={!query}
        />
      </View>
      <DateView
        setChecked={setChecked}
        setIsOpen={setIsOpen}
        setParams={setParams}
        firstDate={selectedRange.firstDate}
        secondDate={selectedRange.secondDate}
        checked={checked}
        params={params}
      />
      <DatePickerModal
        isOpen={isOpen}
        setHasDateChanged={setHasDateChanged}
        setIsOpen={setIsOpen}
        setSelectedRange={setSelectedRange}
      />
      <ArticleList
        isLoading={isLoading}
        setSelectedId={setSelectedId}
        articles={articles}
        error={error}
      />
      <ArticleModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        article={selectedArticle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  input: {
    width: "70%",
    paddingHorizontal: 15,
  },
  searchField: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15,
  },
  dateField: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
  datePicker: {
    borderRadius: 15,
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
  },
  datePickerWrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(26, 26, 26, 0.6)",
  },
});
