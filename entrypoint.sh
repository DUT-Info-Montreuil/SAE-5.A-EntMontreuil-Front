#!/bin/bash
cd /path/to/angular-app 
ng serve --host 0.0.0.0
nginx -g 'daemon off;'