import requests

url = 'https://filespot.platformcraft.ru/2/fs/container/60b080470e3e5ae85/object/kit/filetest.mp4' #Вместо {your_owner_ID} укажите свой. После "object" укажите желаемый путь и название файла.
headers = {'Authorization': 'Bearer eyJh-CjKRgmqew2zmN3HgGOGfG1fIsWjkw'} #Вместо {your_access_token} подставьте свой
files = {'file' : open('C:/Users/KiT/Videos/chainsawman_video.mp4', 'rb')}

req = requests.post(url, headers=headers, files=files)

print(req.status_code)
print(req.headers)
print(req.text)