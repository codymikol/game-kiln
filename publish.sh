#!/usr/bin/env bash

printf "Removing Dist Files...\n"

if rm -rf ./dist > /dev/null ; then
    printf "Dist Files Removed!\n"
else
    printf "Failed to clean up Dist Files\n"
    exit 1
fi

printf "Building For Production...\n"

if yarn run build:prod > /dev/null ; then
    printf "Build Successful!\n"
else
    printf "Build Failed\n"
    exit 1
fi

printf "Running Tests...\n"


if yarn run test > /dev/null ; then
    printf "Tests Passed!\n"
else
    printf "Tests Failed\n"
    exit 1
fi

printf "Publishing..."

if standard-version ; then
    printf "Successfully bumped package, ready for push to master!\n"
else
    printf "Standard-Version Failed\n"
    exit 1
fi

exit 0
