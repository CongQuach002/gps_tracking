// khai bao hàm và thư viện 
#define MODEM_RST 5
#define MODEM_PWKEY 4
#define MODEM_POWER_ON 23
#define MODEM_TX 27
#define MODEM_RX 26
#define I2C_SDA 21
#define I2C_SCL 22
#define led1 18
#define led2 19
#define TINY_GSM_MODEM_SIM800
#define SerialMon Serial
#define SerialAT Serial1

#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <Adafruit_ADXL345_U.h>
#include <Adafruit_Sensor.h>
#include <TinyGsmClient.h>
#include <ArduinoHttpClient.h>
#include <ArduinoJson.h>
#define firstJsonSize 100

Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified();
float a;
// gps
#include <TinyGPS++.h>
long last = 0;
long last2 = 0;
TinyGPSPlus gps;
#define RXPin 15
#define TXPin 14

const char apn[] = "internet";
const char user[] = "";
const char pass[] = "";
// khai báo firebase 
const char FIREBASE_HOST[] = "gps-tracking-fdb27-default-rtdb.firebaseio.com";
const String FIREBASE_AUTH = "C2QSRsGczuuebNMepQZ1kQi03zSn5dvCYs4t3cED";
const String FIREBASE_PATH = "/haha/";
const int SSL_PORT = 443;

String months, yeara, days, hours, mi, se;
String lat, lo, sed;

TinyGsm modem(SerialAT);
TinyGsmClientSecure gsm_client_secure_modem(modem, 0);
HttpClient http_client = HttpClient(gsm_client_secure_modem, FIREBASE_HOST, SSL_PORT);
unsigned long previousMillis = 0;
long interval = 10000;
void putToFirebase(const char *method, const String &path, const String &data, HttpClient *http);
void postToFirebase(const char *method, const String &path, const String &data, HttpClient *http);

static const uint32_t GPSBaud = 9600;
SoftwareSerial ss(RXPin, TXPin);
unsigned int move_index = 1;

void ADXL345(); // ham cho gia toc
void checkGPS();
void vitri();
void check_connect();
void get_time();
void blynk()
{
  digitalWrite(led2, HIGH);
  delay(100);
  digitalWrite(led2, LOW);
  delay(100);
}
// hàm setup

void setup()
{

  Serial.begin(9600);
  ss.begin(9600);
  delay(10);
  Wire.begin(I2C_SDA, I2C_SCL);
  pinMode(MODEM_PWKEY, OUTPUT);
  pinMode(MODEM_RST, OUTPUT);
  pinMode(MODEM_POWER_ON, OUTPUT);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);

  digitalWrite(MODEM_PWKEY, LOW);
  digitalWrite(MODEM_RST, HIGH);
  digitalWrite(MODEM_POWER_ON, HIGH);
  SerialAT.begin(115200, SERIAL_8N1, MODEM_RX, MODEM_TX);
  delay(3000);
  SerialMon.println("Initializing modem...");
  modem.restart();
  String modemInfo = modem.getModemInfo();
  SerialMon.print("Modem: ");
  SerialMon.println(modemInfo);
  SerialMon.print("Waiting for network...");
  if (!modem.waitForNetwork(240000L))
  {
    SerialMon.println(" fail");
    delay(5000);
    return;
  }
  SerialMon.println(" OK");

  if (modem.isNetworkConnected())
  {
    SerialMon.println("Network connected");
  }

  SerialMon.print(F("Connecting to APN: "));
  SerialMon.print(apn);
  if (!modem.gprsConnect(apn, user, pass))
  {
    SerialMon.println(" fail");
    delay(5000);
    return;
  }
  SerialMon.println(" OK");

  // ADXL345
  if (!accel.begin(0x53))
  {
    Serial.println("No ADXL345 sensor detected.");
    while (1)
      ;
  }
}

void loop()
{
  Serial.print(F("Connecting to "));
  Serial.print(apn);
  if (!modem.gprsConnect(apn, user, pass))
  {
    Serial.println(" fail");
    delay(1000);
    return;
  }
  Serial.println(" OK");
  http_client.connect(FIREBASE_HOST, SSL_PORT);
  while (true)
  {
    if (!http_client.connected())
    {
      Serial.println();
      http_client.stop(); // Shutdown
      Serial.println("HTTP  not connect");
      break;
    }
    else
    {
      digitalWrite(led1, HIGH);
      //digitalWrite(led2,HIGH);
      checkGPS();
      while (ss.available() > 0)
      {
        if (gps.encode(ss.read()))
        {
            float ab = gps.location.lat();
            if (ab > 0)
            {
                 digitalWrite(led2,HIGH);
            
          get_time();
          lat = String(gps.location.lat(), 6);
          lo = String(gps.location.lng(), 6);
          sed = gps.speed.kmph();

          StaticJsonDocument<256> firstJSON;

          firstJSON["LA"] = lat;
          firstJSON["LO"] = lo;
          firstJSON["TIME"] = hours + mi + se;
          firstJSON["DATE"] = days + yeara + months;
          firstJSON["SP"] = sed;
          char buffer[firstJsonSize];

          serializeJson(firstJSON, buffer);
          Serial.print("Data serialised: ");
          Serial.println(buffer);

          sensors_event_t event;
          accel.getEvent(&event);
          // tinh toán cảm biến ADXL345
          a = sqrt(event.acceleration.x * event.acceleration.x * 0.0078 + event.acceleration.y * event.acceleration.y * 0.0078 + event.acceleration.z * event.acceleration.z * 0.0078);
          if (a < 1)
          {
            // gửi dữ liệu lên Firebase 
            postToFirebase("/", "/GPS2/", buffer, &http_client);
          }
          putToFirebase("/", "ecall", String(a), &http_client);
          if (millis() - last >= 50000)
          {
            postToFirebase("/", "/GPS3/", buffer, &http_client);
            last = millis();
          }
          if (millis() - last2 >= 50)

          {
            putToFirebase("/", "/GPS4/", buffer, &http_client);
            
            last2 = millis();
          }
            }
            else{
              blynk();
            }
        }
      }
    }
  }
}

// cam bien gps

void checkGPS()
{
  if (gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
       blynk();
  }
}

void putToFirebase(const char *method, const String &path, const String &data, HttpClient *http)
{
  String response;
  int statusCode = 0;
  http->connectionKeepAlive(); // Currently, this is needed for HTTPS

  String url;
  if (path[0] != '/')
  {
    url = "/";
  }
  url += path + ".json";
  url += "?auth=" + FIREBASE_AUTH;
  Serial.print("POST:");
  Serial.println(url);
  Serial.print("Data:");
  Serial.println(data);

  String contentType = "CONTENT";
  http->put(url, contentType, data);

  statusCode = http->responseStatusCode();
  Serial.print("Status code: ");
  Serial.println(statusCode);
  response = http->responseBody();
  Serial.print("Response: ");
  Serial.println(response);
  if (!http->connected())
  {
    Serial.println();
    http->stop(); // Shutdown
    Serial.println("HTTP POST disconnected");
  }
}
void postToFirebase(const char *method, const String &path, const String &data, HttpClient *http)
{
  String response;
  int statusCode = 0;
  http->connectionKeepAlive(); // Currently, this is needed for HTTPS

  String url;
  if (path[0] != '/')
  {
    url = "/";
  }
  url += path + ".json";
  url += "?auth=" + FIREBASE_AUTH;
  Serial.print("POST:");
  Serial.println(url);
  Serial.print("Data:");
  Serial.println(data);
  String contentType = "CONTENT";
  http->post(url, contentType, data);
  statusCode = http->responseStatusCode();
  Serial.print("Status code: ");
  Serial.println(statusCode);
  response = http->responseBody();
  Serial.print("Response: ");
  Serial.println(response);
  if (!http->connected())
  {
    Serial.println();
    http->stop(); // Shutdown
    Serial.println("HTTP POST disconnected");
  }
}
void get_time()
{
  String timea = modem.getGSMDateTime(DATE_FULL);
  String loca = modem.getGsmLocation();
  Serial.println(loca);
  int splitT = timea.indexOf(",");
  String dayStamp = timea.substring(0, splitT);
  //day
  int t = dayStamp.indexOf("/");
  months = dayStamp.substring(0, t);
  String d2 = dayStamp.substring(t + 1);
  int t1 = d2.indexOf("/");
  yeara = d2.substring(0, t1);
  days = d2.substring(t1 + 1);
  //time
  String timeaa = timea.substring(splitT + 1);
  int ti = timeaa.indexOf("+");
  String time_a = timeaa.substring(0, ti);
  int ti2 = time_a.indexOf(":");
  hours = time_a.substring(0, ti2);
  String hourss = time_a.substring(ti2 + 1);
  int ti3 = hourss.indexOf(":");
  mi = hourss.substring(0, ti3);
  se = hourss.substring(ti3 + 1);

  // Serial.println(hours);
  // Serial.println(mi);
  // Serial.println(se);
}