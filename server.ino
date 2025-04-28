#include <WiFi.h>
#include <DHT.h>
#include <WiFiClient.h>  // For socket connections

// WiFi credentials
const char* ssid = ""; //WIFI NAME
const char* password = "";WIFI PASSOWRD
const char* serverHost = "";  // Flask server IP Example 192.168.10.1
const uint16_t serverPort = 8888;          // Flask server port
int32_t timeout_ms = 10000;

// DHT11 setup
#define DHTPIN 4     // DHT11 connected to GPIO4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Soil moisture sensor setup
#define SOIL_MOISTURE_PIN A0   // Analog pin for the soil moisture sensor

// TDS meter setup (Assume connected to GPIO39)
#define TDS_PIN 39
WiFiClient client;



//=======================================SETUP===
void setup() {
  Serial.begin(115200);
  dht.begin();
  
  // WiFi connection
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
    
  Serial.println("Connecting to server...");
  
  client.connect(serverHost, serverPort, timeout_ms);
  Serial.println("##################Connected to server...");
}


void loop() {
  while (WiFi.status() == WL_CONNECTED) {
    // Read sensor data
    float temp = dht.readTemperature();
    float humidity = dht.readHumidity();
    int tdsValue = analogRead(TDS_PIN);  // Read TDS meter value
    int soilMoisture = analogRead(SOIL_MOISTURE_PIN);  // Read soil moisture value

    // Check if any reading failed
    if (isnan(temp) || isnan(humidity)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }

    // Prepare the data to be sent
    //temp, humidity, tdsval, soil moisture
    String postData = String(temp) + "," + String(humidity);
    postData += "," + String(soilMoisture);
    postData += "," + String(tdsValue);
    Serial.println(postData);
    
    // Prepare the HTTP POST request
    String httpRequest = "POST /insert HTTP/1.1\r\n";
    httpRequest += "Host: " + String(serverHost) + "\r\n";
    httpRequest += "Content-Type: application/json\r\n";
    httpRequest += "Content-Length: " + String(postData.length()) + "\r\n";
    httpRequest += "Connection: close\r\n";
    httpRequest += "\r\n";
    httpRequest += postData;

    // Send the HTTP request
    client.print(httpRequest);

    // Wait for the response and read it
    String response = "";
    while (client.connected() || client.available()) {
      if (client.available()) {
        response += client.readString();
      }
    }

    // Close the connection
    

    // Print response for debugging
    Serial.println("Response:");
    Serial.println(response);
  } 
  client.stop();
  Serial.println("WiFi Disconnected");

  delay(600);  // Send data every 60 seconds
}
