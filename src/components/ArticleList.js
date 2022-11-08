import { View, ScrollView, ActivityIndicator } from "react-native";
import { ListItem, Text } from "@react-native-material/core";

export const ArticleList = ({isLoading, error, articles, setSelectedId}) => 
  (
    <>
      {isLoading && <ActivityIndicator size={100} style={{flex: 1}} />}
      {(!error && !isLoading) &&
      <ScrollView style={{ width: "100%" }}>
        {articles.length !== 0 
          ? articles.map((article, index) => (
            <ListItem 
              title={article.title}
              key={index}
              secondaryText={article.description}
              onPress={() => setSelectedId(article.url)}
            />
        ))
        : (<View style={{ flex: 1, alignItems: "center" }}>
            <Text variant="h4">Nothing to show</Text>
          </View>
        )}
      </ScrollView>}
      {error ? <Text style={{flex: 1}} variant="h5">{error}</Text>  : ''}
    </>
  );
