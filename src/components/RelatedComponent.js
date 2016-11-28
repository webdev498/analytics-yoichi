function getFieldValue(data, fieldName) {
  if (fieldName.includes('.')) {
    let attributes = fieldName.split('.'),
      fieldValue = data;
    attributes.forEach((attribute, index) => {
      fieldValue = fieldValue[attribute];
    });
    return fieldValue;
  }
  else {
    return data[fieldName];
  }
}

export function renderRelatedComponents(props, type) {
  let {meta, data, params, options} = props,
    {relatedComponents} = meta;

  if (!data) return;

  relatedComponents.forEach((component) => {
    let apiObj = {},
      customParams = {};

    if (component.api[type]) {
      apiObj = Object.assign({}, component.api[type]);
    }
    else {
      apiObj = component.api.default ? Object.assign({}, component.api.default) : '';
    }

    let queryParams = apiObj.queryParams;
    for (let key in queryParams) {
      let value = queryParams[key];
      if (isNaN(value) && value.includes(':fieldName')) {
        let queryParam = value.split(':fieldName');
        queryParams[key] = getFieldValue(data, queryParam[0]);
        customParams[key] = queryParams[key];
      }
    }
    apiObj.queryParams = Object.assign({}, queryParams);

    options = Object.assign({}, options, {
      customParams: customParams
    });

    if (apiObj.body && apiObj.body.includes(':fieldName')) {
      let bodyValue = apiObj.body.split(':fieldName');
      options = Object.assign({}, options, {
        body: getFieldValue(data, bodyValue[0])
      });
    }

    let hideWhenValue = '',
      hideWhenComparedValue = '';

    if (apiObj.hideWhen) {
      for (let key in apiObj.hideWhen) {
        hideWhenValue = getFieldValue(data, key);
        hideWhenComparedValue = apiObj.hideWhen[key];
      }
    }

    if (hideWhenValue !== '' && hideWhenComparedValue !== '' && hideWhenValue === hideWhenComparedValue) {
      apiObj.hideComponent = true;
    }
    else {
      apiObj.hideComponent = false;
      props.fetchApiData(component.id, apiObj, params, options);
    }
  });
}
