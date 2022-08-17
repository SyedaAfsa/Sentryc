#!/bin/bash

./node_modules/.bin/cucumber-js --exit
npx playwright test --project=chromium