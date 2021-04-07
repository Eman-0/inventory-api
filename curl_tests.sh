#!/bin/bash
curl --silent -X GET https://10.100.201.3:12030/hello --insecure > actual.txt
if grep -f ./test/curl/hello_expected.txt actual.txt; then
    #pass
    #echo "Pass"
    exit 0
fi
#fail
#echo "Fail"
exit 1