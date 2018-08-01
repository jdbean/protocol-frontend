## Protocol 
Protocol is a messaging app that translates languages in real time. For the first time, many people can communicate in different 
languages and each person will see all the messages translated in their own language automatically. 
Developed by J.D. Bean and Jeremy Gottfried. This project is unmaintained and is not seeking contributions at this time.

## Motivation 
Today we can message people all across the world in real time, yet one of the few remaining communication barriers
is spoken language. Protocol makes it possible for people who speak different languages to have conversations in real time. 
No copying and pasting into Google Translate is required. Every message is translated automatically.

## Screenshot gif 
<img src='https://github.com/jdbean/protocol-frontend/blob/master/Protocol.gif' width=1200>

## Tech/Frameworks used
- JWT + bcrypt authentication and authorization
- Vanilla JS frontend
- Ruby on Rails backend
- Web Sockets through Action Cable
- Google Translate API 

## Installation and using the app

1. Clone this repo 
2. Clone the backend repo at https://github.com/jdbean/protocol-backend
3. Run `bundle install` on the backend repo. 
4. Run `rails db:create` and `rails db:migrate` on the backend repo. 
5. Alter the seed.rb file to add your own info. 
5. Set up your own Google Translate API credentials -- follow directions here: https://cloud.google.com/docs/authentication/production
6. Run `rails s` on the backend repo. 
7. Run `python -m SimpleHTTPServer 8000` on the frontend server
8. Navigate to http://localhost:8000

## Rails Backend API Docs 
https://github.com/jdbean/protocol-backend
