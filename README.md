# Traffice Images and Weather
A website to show traffic image and weather of different part of Singapore.

![Screenshot of the website](./screenshot.png? "Screenshot of the website")

## Requirements
Tech stack to use:
- Backend: NestJs
- Frontend: ReactJs + TypeScript

To use the following 2 APIs.

1. Traffic Images (https://data.gov.sg/dataset/traffic-images)
2. Weather forecast (https://data.gov.sg/dataset/traffic-images)

## Functional Requirements
- To build a web app where a list of location to be shown and when the user click on a location, traffic image and weather information to be shown.
- User will be able to select date and time as well.
## Assumption
- Only for Singapore area so I'm using OneMap api for reverse geocoding.
- No database is required as it'll complicate testing(For Hiring Manager to test the app).
- No authentication and authorization required.
- Unique area name.

## Fontend Decision
Instead of just the list UI, I think map UI is more user friendly as it's easier to find the location that I want to find. So I've decided to do both map and list UI as shown in the screenshot.

Clicking on the pin of the map and click a location from the list will select the location and show weather and traffic image.

The weather card to be improve with more background images for different weather condition.

## Backend decision
### Reverse geocoding
- Doing reverse geocoding take a long time especially if the list is long.
So I've decided to save it into a json file for this demo, preferably to be save in DB especially for production. New unseen location will be updated to the json file as the api is being called.

- Some location might not be shown due to the OneMap couldn't find the geo data for that specific lat and long. That could be solve by processing reverse geocoding in a seperate task using different map or enter road/building name manually.

### .env
I would never add a token in the .env file but this is for easy testing purpose for this specific case.
ONEMAP_TOKEN in the env will be expire by 8 Aug as token from OneMap only last for 3 days.

In case of token expiry, contact me for a new token or you may get a new token from here https://www.onemap.gov.sg/apidocs/register

## How to start the application
Run the following command to start the website on local machine.

Install npm packages on the backend.

```
cd backend && npm i
```

Install npm packages on the frontend.

```
cd ..
cd frontend && npm i
```

Start the server by running the following command.

```
cd ..
npm run start
```

Open http://localhost:3000 on the browser.


## Testing
Full unit testing and e2e testing for the backend is added.

Check the folllowing files for unit testing

- /src/traffic/controllers/traffic/traffic.controller.spec.ts
- /src/traffic/services/traffic/traffic.service.spec.ts
- /src/weather/controllers/weather/weather.controller.spec.ts
- /src/weather/services/weather/weather.service.spec.ts

Check the following files for e2e testing

- /test/traffic.e2e-spec.ts
- /test/weather.e2e-spec.ts

Run the following command in the backend folder to initiate the test.

### For unit testing
```
npm run test
```

## For e2e testing
```
npm run test:e2e
```