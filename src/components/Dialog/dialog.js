import * as React from "react";

import NumberInput from "../InputFeild/numberInput";
import { addAllField, createObject } from "../../utils/utils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { APPLY_LABEL } from "../../constants/meterConstants";

export default function ResponsiveDialog({
  open,
  data,
  handleClose,
  handleApply,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [obj, setObj] = React.useState(createObject([data]));
  
  const ButtonDisable =
    data.Subscription && data["Trigger Point"] && data["SMS Number"]
      ? false
      : true;

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={handleClose}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Meter ID " + data.meter_id}
        </DialogTitle>
        <DialogContent>
          <NumberInput
            isEdit={open}
            addAllField={addAllField([data])}
            data={data}
            setObj={setObj}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleApply}
            disabled={ButtonDisable}
            autoFocus
          >
            {APPLY_LABEL}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
