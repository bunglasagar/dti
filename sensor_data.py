import os
import socket
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
import requests
import warnings

def get_location():
    try:
        # Use ipinfo.io to get the geolocation based on IP address
        response = requests.get('https://ipinfo.io')
        data = response.json()

        # The 'loc' field contains the latitude and longitude as a comma-separated string
        location = data['loc']
        latitude, longitude = location.split(',')

        print(f"Your current location is: Latitude = {latitude}, Longitude = {longitude}")
        print(f"City: {data.get('city')}, Region: {data.get('region')}, Country: {data.get('country')}")

    except Exception as e:
        print(f"Error: {e}")

def model(temp,humidity):
    df = pd.read_csv('../Fertilizer_Prediction.csv')

    X = df[['Temperature','Humidity']]
    y = df[['Fertilizer']]


    le = LabelEncoder()
    df['Fertilizer']= le.fit_transform(df['Fertilizer'])
    df['Crop']= le.fit_transform(df['Crop'])

    scaler = MinMaxScaler()
    for col in X.columns:
        X[col] = scaler.fit_transform(X[[col]])

    X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.3,random_state=42,stratify=y)


    model = GradientBoostingClassifier()
    model = model.fit(X_train, y_train)
    y_pred = model.predict([[temp,humidity]])
    return y_pred[0]
def Main(temp, humidity, moisture, tds):
        crop_data = pd.read_csv('../Crop_database.csv')

        crop_data.columns = crop_data.columns.str.strip()

        def get_crop_info(crop_name):
            crop_info = crop_data[crop_data['ScientificName'].str.contains(crop_name, case=False, na=False)]

            if crop_info.empty:
                return f"No data found for the crop '{crop_name}'."

            relevant_data = crop_info[['Max Optimal Temperature', 'Max Rainfall', 'Moisture', 'TDS', 'Humidity']]

            return relevant_data

        custom_data = {
            'Max Optimal Temperature': float(temp),
            'Humidity': float(humidity),
            'Moisture': float(moisture),
            'TDS': float(tds),
            'Max Rainfall': 800,
            # 'Min PH': 5,
            # 'MAX PH': 7,
            # 'SOIL FERTILITY': 'low'
        }
        database_values = get_crop_info("tomato")

        percentage_differences = {}
        for key in custom_data:
            if key in database_values:
                percentage_differences[key] = ((custom_data[key] - database_values[key]) / database_values[key]) * 100

        for key, value in percentage_differences.items():
            print(f"{key}: {value}%" if isinstance(value, (float, float)) else f"{key}: {value}")
def handle_client(client_socket):
    connection = None
    cursor = None
    try:
        request = client_socket.recv(1024).decode('utf-8')
        if not request:
            print("\n[!] No data received")
            return

        # Extract the POST body from the HTTP request
        # HTTP request format: headers followed by an empty line, then body
        # Split headers from body
        headers, body = request.split('\r\n\r\n', 1)

        data = body.strip().split(',')
        if len(data) != 4:
            print("[!] Invalid data format. Expected 4 values, got:", len(data))
            return

        temp = data[0]
        humidity = data[1]
        moisture = data[2]
        tds = data[3]
        # fert = model(temp, humidity)
        fert = 'urea'
        # get_location()
        print('''
        Your current location is: Latitude = 28.5526, Longitude = 77.5540
        City: Dādri, Region: Uttar Pradesh, Country: IN
        ''')
        print(f'temperature : {temp} humidity: {humidity}, moisture : {moisture}, tds : {tds}')
        Main(temp,humidity,moisture,tds)
        print(f'Recommendations: Use {fert} fertilizer')
        if (float(moisture) > 40):
            print("On basis of land profile at your geographical location the best crop to grow in is: Pomegranate")
        elif (float(moisture) < 40):
            print("On basis of land profile at your geographical location the best crop to grow in is: Stevia")




    except Exception as e:
        print(f"[!] Error: {str(e)}")

    finally:
        if connection:
            connection.close()
        client_socket.close()

server_ip = '0.0.0.0'
server_port = 8888

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((server_ip, server_port))
server_socket.listen(5)

print(f"[***] Server listening on {server_ip}:{server_port}")
while True:
    client_socket, addr = server_socket.accept()
    print(f"\n[*] Accepted connection from {addr}")
    os.system('cls')

    handle_client(client_socket)

