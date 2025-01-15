#!/bin/bash

if [ -f .env ]; then
    source .env
fi

cd sql/schema
goose postgres $DB_URL up
