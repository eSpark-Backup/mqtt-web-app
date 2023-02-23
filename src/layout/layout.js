import React, { useEffect, useState } from "react";
import NavBar from "./../components/Navbar/navbar";
import MeterCard from "../components/MeterCard/MeterCard";
import { createTheme, Grid, ThemeProvider } from "@material-ui/core";
import mqtt from "mqtt";
import meterData from "../json/meter.json";
import { toast } from "react-hot-toast";

const Layout = () => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState(meterData);
  const [connectStatus, setConnectStatus] = useState("Connect");

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus("Connecting");
    setClient(mqtt.connect(host, mqttOption));
  };

  const subscribeRecord = {
    topic: "testtopic/meter",
    qos: 0,
    payload: payload,
  };

  useEffect(() => {
    const record = {
      host: "broker.emqx.io",
      clientId: `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`,
      port: 8084,
    };
    const url = `wss://${record.host}:${record.port}/mqtt`;
    const options = {
      clientId: record.clientId,
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };
    mqttConnect(url, options);
  }, []);

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos, payload } = subscription;
      client.subscribe(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
        toast.success("Connected");
        mqttSub(subscribeRecord);
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
        toast.error(connectStatus);
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(
          payload.message
            ? JSON.parse(payload.message)
            : meterData["meter_data"]
        );
      });
    }
  }, [client]);

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#243c6b",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
      text: {
        secondary: {
          // This is green.A700 as hex.
          main: "#1A2027",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Grid container rowSpacing={1} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <MeterCard meterData={payload} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Layout;
