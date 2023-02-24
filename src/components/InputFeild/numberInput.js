import React from "react";
import {
  Box,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import {
  editTnputFields,
  METER_READING_LABEL,
  SMS_NUMBER_LABEL,
  TRIGGER_POINT_LABEL,
} from "../../constants/meterConstants";

import { inputProps } from "../../utils/utils";

import styles from "./style.module.css";

const NumberInput = (props) => {
  const { data, isEdit, addAllField, setObj } = props;

  const handleChangeValue = (e, data, item) => {
    data[item?.inputFieldName] =
      item?.inputFieldName === SMS_NUMBER_LABEL
        ? e.target.value
        : Number(e.target.value) !== 0
        ? Number(e.target.value)
        : null;
    setObj({ ...data });
  };

  const isDisabled = (item) => {
    if (isEdit && item?.inputFieldName !== METER_READING_LABEL) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box className={styles.mainInputsArea}>
      {addAllField &&
        addAllField?.map((item) => {
          if (isEdit && editTnputFields.includes(item?.inputFieldName)) {
            return (
              <Box className={styles.content}>
                <Typography variant="p" className={styles.typography}>
                  {item?.inputFieldName}
                </Typography>

                <OutlinedInput
                  type={"number"}
                  value={data[item?.inputFieldName]}
                  style={{
                    width: inputProps(item),
                  }}
                  inputProps={inputProps(item)}
                  endAdornment={
                    item?.inputFieldName === TRIGGER_POINT_LABEL && (
                      <InputAdornment position="end">%</InputAdornment>
                    )
                  }
                  disabled={isDisabled(item)}
                  onChange={(e) => handleChangeValue(e, data, item)}
                />
              </Box>
            );
          } else if (!isEdit && item?.inputFieldName !== SMS_NUMBER_LABEL) {
            return (
              <Box className={styles.content}>
                <Typography variant="p" className={styles.typography}>
                  {item?.inputFieldName}
                </Typography>

                <OutlinedInput
                  type={"number"}
                  value={data[item?.inputFieldName] ?? 0}
                  disabled={isEdit ? false : true}
                  endAdornment={
                    item?.inputFieldName === "Trigger Point" && (
                      <InputAdornment position="end">%</InputAdornment>
                    )
                  }
                  className={styles.input}
                />
              </Box>
            );
          }
        })}
    </Box>
  );
};

export default NumberInput;
