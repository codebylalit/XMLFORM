import React from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import XMLParser from "react-xml-parser";

const FormRenderer = ({ xmlData }) => {
  const renderForm = (xmlData) => {
    const xml = new XMLParser().parseFromString(xmlData);

    return xml.children.map((field, index) => {
      const typeElement = field.children.find((child) => child.name === "type");
      const labelElement = field.children.find(
        (child) => child.name === "label"
      );

      if (!typeElement || !labelElement) {
        console.error("Invalid XML structure", field);
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text>Error: Invalid XML structure</Text>
          </View>
        );
      }

      const type = typeElement.value;
      const label = labelElement.value;

      console.log(`Rendering field: type=${type}, label=${label}`);

      if (type === "text") {
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text>{label}</Text>
            <TextInput style={{ borderWidth: 1, padding: 10 }} />
          </View>
        );
      } else if (type === "datetime") {
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text>{label}</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 10 }}
              placeholder="YYYY-MM-DD"
            />
          </View>
        );
      } else if (type === "radio") {
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text>{label}</Text>
            {field.children
              .filter((child) => child.name === "option")
              .map((option, idx) => {
                const optionLabelElement = option.children.find(
                  (child) => child.name === "label"
                );
                const optionValueElement = option.children.find(
                  (child) => child.name === "value"
                );

                if (!optionLabelElement || !optionValueElement) {
                  console.error("Invalid option structure", option);
                  return (
                    <View
                      key={idx}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>Error: Invalid option structure</Text>
                    </View>
                  );
                }

                return (
                  <View
                    key={idx}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <TextInput style={{ marginRight: 10 }} type="radio" />
                    <Text>{optionLabelElement.value}</Text>
                  </View>
                );
              })}
          </View>
        );
      } else if (type === "drawing") {
        return (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text>{label}</Text>
            <View style={{ borderWidth: 1, padding: 20, height: 100 }}>
              <Text>Drawing Area</Text>
            </View>
          </View>
        );
      }

      return null;
    });
  };

  return <ScrollView>{renderForm(xmlData)}</ScrollView>;
};

export default FormRenderer;
