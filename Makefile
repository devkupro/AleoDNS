frontend:
	cd front-end/ && npm i --legacy-peer-deps &&  npm run dev
backend:
	cd back-end/ && npm i && npm start

.PHONY: frontend backend