import requests

url = 'https://auth.platformcraft.ru/token'
headers = {'Content-Type': 'application/x-www-form-urlencoded'}
body = """login=greenatom&password=123123""" #укажите свои логин и пароль

req = requests.post(url, headers=headers, data=body)

print(req.status_code)
print(req.headers)
print(req.text)