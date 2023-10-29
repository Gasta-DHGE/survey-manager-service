export function unpackMap (data) {
  const unpackedData = {};
  const keys = Object.keys(data);

  keys.forEach(key => {
    unpackedData[key] = unpackValueTypes(data[key]);
  });

  return unpackedData;
}

export function unpackValueTypes (data) {
  if (data.valueType === 'mapValue') {
    return unpackMap(data.mapValue.fields);
  } else if (data.valueType === 'arrayValue') {
    const dataArray = [];

    data.arrayValue.values.forEach(value => {
      const unpackedValue = unpackValueTypes(value);
      dataArray.push(unpackedValue);
    });

    return dataArray;
  } else if (data.valueType === 'floatValue') {
    return parseFloat(data[data.valueType].toString());
  } else if (data.valueType === 'integerValue') {
    return parseInt(data[data.valueType].toString(), 10);
  } else {
    return data[data.valueType];
  }
}
