import React from "react";
import { useEffect } from "react";
import ResponsiveDialog from "../Dialog/dialog";
import NumberInput from "../InputFeild/numberInput";

import { Box, Button, Grid, styled, Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";

import { addAllField, sendSmsAndCheckValue } from "../../utils/utils";
import { SMS_NUMBER_LABEL } from "../../constants/meterConstants";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  margin: 10,
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
}));

const Item2 = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  margin: 1,
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
}));

const Item3 = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  margin: 10,
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-around",
  flexDirection: "column",
  flexWrap: "wrap",
  height: "100%",
}));

const MeterCard = ({ meterData }) => {
  const [open, setOpen] = React.useState(false);
  const [itemData, setItemData] = React.useState({});
  const [makeArrObj, setMakeArrObj] = React.useState([]);

  const handleOpen = (item) => {
    setItemData(item);
    setOpen(true);
  };

  const handleChangeData = () => {
    setOpen(false);
    makeArrObj.map((item) => {
      sendSmsAndCheckValue(item);
    });
  };

  const makeNewArray = (meterData) => {
    let newArr = [];
    for (let i = 0; i < meterData?.meter_data.length; i++) {
      let newObj = {
        Subscription: null,
        "Trigger Point": null,
        "SMS Number": null,
        ...makeArrObj[i],
        ...meterData?.meter_data[i],
      };
      newArr.push(newObj);
    }

    setMakeArrObj([...newArr]);
  };

  useEffect(() => {
    makeNewArray(meterData);
  }, [meterData]);

  return (
    <Box style={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {makeArrObj &&
          makeArrObj?.map((item, index) => {
            return (
              <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                <Item>
                  <Typography variant="h4">Meter ID {item.meter_id}</Typography>
                  <Grid container>
                    <Grid item xs={8} sm={8} md={8}>
                      <Item2>
                        <NumberInput
                          addAllField={addAllField([item])}
                          data={item}
                        />
                      </Item2>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                      <Item3>
                        <Typography variant="h5">{SMS_NUMBER_LABEL}</Typography>
                        <Typography variant="h5">
                          {item["SMS Number"]}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpen(item)}
                        >
                          {"Settings"}
                        </Button>
                      </Item3>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            );
          })}
      </Grid>
      <ResponsiveDialog
        open={open}
        handleClose={() => setOpen(!open)}
        handleApply={handleChangeData}
        data={itemData}
      />
    </Box>
  );
};

export default MeterCard;
