import React, { useState } from "react";
import { View, Button, TextInput, ScrollView } from "react-native";
import FormRenderer from "./FormRenderer";
import { predefinedXML } from "./xmlfile";

const App = () => {
  const [xmlInput, setXmlInput] = useState("");
  const [xmlData, setXmlData] = useState("");

  const handleRenderFromFile = () => {
    console.log("Rendering form from predefined XML file");
    setXmlData(predefinedXML);
  };

  const handleRenderFromInput = () => {
    console.log("Rendering form from user input XML");
    setXmlData(xmlInput);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Button
        title="Render Form from XML File"
        onPress={handleRenderFromFile}
      />
      <TextInput
        style={{ borderWidth: 1, marginVertical: 20, height: 100, padding: 10 }}
        placeholder="Enter XML here"
        multiline
        onChangeText={(text) => setXmlInput(text)}
      />
      <Button
        title="Render Form from XML Input"
        onPress={handleRenderFromInput}
      />
      {xmlData ? <FormRenderer xmlData={xmlData} /> : null}
    </ScrollView>
  );
};

export default App;
