# Viper Probe Droid

## The Vision
At Carbonite, the Digital Analytics team is responsible for handling the
management of our Tracking Beacons as well as our Event Analytics Platform. For
managing our tracking beacons we use [Tealium IQ](http://tealium.com). We use
the [Snowplow JavaScript Tracker](https://github.com/snowplow/snowplow-javascript-tracker)
to send events to our Event Analytics Platform. In addition to the standard
events provided by Snowplow, we include in this project a number of other
event types.

In order to keep the "ownership" of Analytics to our team, we have created this
project so that the various web teams in Carbonite don't have to be responsible
for managing the beacons and events themselves. We work with those teams to
make sure that the DOM has the proper markdown. Then upon their request, or
from other teams throughout the company we instrument the events.

# LICENSE
Copyright (c) 2015, Robert G. Johnson Jr. @Oakensoul, Apache Version 2.0
Copyright (c) 2015, [Carbonite](http://www.carbonite.com), Apache Version 2.0
