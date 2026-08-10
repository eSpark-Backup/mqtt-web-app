import {
  SMS_NUMBER_LABEL,
  TRIGGER_POINT_LABEL,
} from "../constants/meterConstants";

import axios from "axios";
import { SUBSCRIPTION_LABEL } from "./../constants/meterConstants";

export const getKeys = (data) => {
  let keys = Object.keys(data[0]);
  delete keys[3];

  return keys;
};

export const swapKeysAndValues = (obj, key1, key2) => {
  // check if the keys exist in the object
  if (!(key1 in obj) || !(key2 in obj)) {
    console.log("Error: One or both keys not found in object.");
    return;
  }

  // swap the values of the two keys
  let temp = obj[key1];
  obj[key1] = obj[key2];
  obj[key2] = temp;

  return obj;
};

export const addAllField = (data) => {
  const keys = getKeys(data);
  const newArray = keys.map((item) => {
    return { inputFieldName: item };
  });

  return newArray;
};

export const createObject = (data) => {
  const keys = getKeys(data);

  const getKeysObj = keys.map((item) => {
    return { item };
  });

  const newArray = getKeysObj.map((item) => {
    return { [item.item]: Number };
  });

  let finalObj = {};

  for (let i = 0; i < newArray.length; i++) {
    Object.assign(finalObj, newArray[i]);
  }

  return finalObj;
};

export const inputProps = (item) => {
  if (item.inputFieldName === TRIGGER_POINT_LABEL) {
    return {
      min: "1",
      max: "100",
    };
  }
  if (item.inputFieldName === SUBSCRIPTION_LABEL) {
    return {
      min: "1",
      max: "100000",
    };
  }

  if (item?.inputFieldName === SMS_NUMBER_LABEL) {
    return 400;
  } else {
    return 130;
  }
};

export const sendSmsAndCheckValue = (item) => {
  const percentage = item.Subscription * (item["Trigger Point"] / 100);

  if (
    item["kwh_reading"] > percentage &&
    percentage !== 0 &&
    item["SMS Number"] !== null
  ) {
    // Send the SMS message using Axios and the Sparrow SMS API endpoint
    const data = JSON.stringify({
      token: "v2_WyXiUR3KWEFTca9gGbTTtZyXFp3.zqOo",
      from: "TheAlert",
      to: item["SMS Number"],
      text: `Dear customer, you have consumed more than < ${item["Trigger Point"]}% > of your energy subscription.`,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.sparrowsms.com/v2/sms/",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
