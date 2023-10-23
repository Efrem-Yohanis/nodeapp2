import requests

url = "http://localhost:8000/api/v1/books"
r = requests.get(url)
data = r.json()
print(data)