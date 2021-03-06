import sys
import json
import numpy as np
import luigi
import random
import os

from pycarol.app.online import Online
from pycarol.app.online_api import OnlineApi
from pycarol.app.online_api import request
from pycarol.carol import *
from pycarol.query import *
from pycarol.auth.ApiKeyAuth import *


online = Online()

apiAuth = ApiKeyAuth(api_key = os.environ['CAROLAPPOAUTH'])
connectorId = os.environ['CAROLCONNECTORID']
appName = os.environ['CAROLAPPNAME']
connectorName = "carolai"

carol_instance = Carol(os.environ['CAROLDOMAIN'], appName, apiAuth, connector_id=connectorId)

@online.route("hello_world")
def hello_world():
    print(arg)
    message = {
        'message': 'Hello World'
    }
    return message

@online.route("listcustomers")
def list_customers():
    jsons = {
    "mustList": [
        {
        "mdmFilterType": "TYPE_FILTER",
        "mdmValue": "mdmcustomerGolden"
        }
    ]
    }

    query = Query(carol_instance, get_aggs=False, scrollable=True, only_hits=True, page_size=10, max_hits=10, sort_by="mdmGoldenFieldAndValues.mdmname.raw")
    query.query(jsons).go()
    data = query.results
    return data

	# query = Query(carol=carol_instance)
	# data = query.all(dm_name="mdmcustomer").go().results
	# return data

@online.route("predict")
def predict():
    result = {
        'score': random.randint(1,9)
    }
    return result

@online.route("sum")
def sum():
    total = 0;
    print(request)

    param = request.values

    if (param != None):
        for key in param:
            try:
                total += float(param[key])
            except RuntimeError:
                pass

    result = {
        'sum': total
    }
    return result

#To run the application locally, uncomment the next line
application = OnlineApi('run_me').get_api()
