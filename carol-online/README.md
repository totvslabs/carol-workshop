Preparing the environment to run the application locally
---

Recommended to create an environment to install the needed libraries for your Carol App.
Make sure you have the following dependencies installed on your environment:
- pycarol
- websocket-client2
- pandas


Running the application locally
---

On the Python file with the endpoints (the one on the manifest file), uncomment the next line:

```
application = OnlineApi('run_me').get_api()
```

The previous line is pointing the Python file that has the services.

After, run the following command to start the server:

```
gunicorn -w 1 -b :5000 run_me
```

These endpoints will be available for all Online Carol App:

```
http://localhost:5000/statusz
http://localhost:5000/logs
http://localhost:5000/healthz
```

Based on provided sample, these URLs will be available:

```
http://localhost:5000/api/hello_world
http://localhost:5000/api/predict
http://localhost:5000/api/sum?a=1&b=2
```

Example how to call the endpoint `sum` (curl):

```
curl -X GET 'http://localhost:5000/api/sum?a=1&b=33'
```


Running the application in Carol
---

You should create a Carol App and send the resource to Carol.

After deployed the Carol App and started the service, the final URL will follow this structure:

```
https://robworkshop-workshop201908test-1-0-0.apps.carol.ai/api/
https://robsonprod-cvtest-computer-vision-services-1-0-0.apps.carol.ai
```

Understanding the Carol App's URL in Carol
---

- `robworkshop`: Tenant name.
- `workshop201908test`: Carol app name.
- `1-0-0`: Carol app version. At the domain itt replaces `.` by `-`. On the path it keeps the `-`.
- `onlineapp`: Algorithm name.
- `api`: Fixed string, used to group the services provided by this carol app.

Ps.: in the near future, all requests will go through Carol (working as a proxy for external requests to the Carol App).


Additional information
---

- There are default docker images for you to start quickly your project: `carol/base-online` and `carol/base-batch`.
- Both Carol App (Online/Batch) need pyCarol (https://github.com/totvslabs/pyCarol).
- Python 3 is required for both Carol App (Online/Batch).


Questions?
---

Send a message on `#carol-feedback` on Slack.
