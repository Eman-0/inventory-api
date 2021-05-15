#!/bin/bash

#Hello Test
curl --silent -X GET https://10.100.201.3:12030/hello --insecure > actual.txt
if grep -f ./test/curl/hello_expected.txt actual.txt; then
    #pass
    echo "Pass"
else
    echo "Test Fail"
fi


#Get by ID
curl --silent -X GET -H 'Content-Type: application/json' -d '{"id": 7}' https://10.100.201.3:12030/properties/id --insecure > actual.txt
if cmp -s ./test/curl/get_by_id.txt actual.txt; then
    echo "pass"
else
    echo "Test Fail by id"
fi 


#Get by ID not found
curl --silent -X GET -H 'Content-Type: application/json' -d '{"id": 1}' https://10.100.201.3:12030/properties/id --insecure > actual.txt
if grep -f ./test/curl/get_by_id_not_found.txt actual.txt; then
    echo "pass"
else
    echo "Test Fail"
fi

#Get All
curl --silent -X GET https://10.100.201.3:12030/properties --insecure > actual.txt
if [ ! -s actual.txt ]; then
    
    echo "Test Fail"
else
    echo "Pass"
fi

#Delete no Auth
curl --silent -X DELETE -H "Content-Type: application/json" -d '{"id": 8}' https://10.100.201.3:12030/properties/id --insecure > actual.txt
if grep -f ./test/curl/delete_by_id_no_auth.txt actual.txt; then
    
    echo "Pass"
else
    echo "Test Fail"
fi

#Good Delete
curl --silent -X DELETE -H "Content-Type: application/json" -H 'api_key: cs4783ftw!' -d '{"id": 1}' https://10.100.201.3:12030/properties/id --insecure > actual.txt
if grep -f ./test/curl/delete_by_id_not_found.txt actual.txt; then
    
    echo "Pass"
else
    echo "Test Fail"
fi

#Good POST
curl --silent -X POST -H 'Content-Type: application/json' -H 'api_key: cs4783ftw!' -d '{"address":"4768 UTSA","city":"San Antonio","state":"Tx","zip":"78228"}' https://10.100.201.3:12030/properties --insecure > actual.txt
if grep -f ./test/curl/post_expected.txt actual.txt; then
    #pass
    echo "Pass"
else
    echo "Test Fail"
fi

#Post no Auth
curl --silent -X POST -H 'Content-Type: application/json' -d '{"address":"4763 UTSA","city":"San Antonio","state":"Tx","zip":"78228"}' https://10.100.201.3:12030/properties --insecure > actual.txt
if grep -f ./test/curl/post_no_auth.txt actual.txt; then
    #pass
    echo "Pass"
else
    echo "Test Fail"
fi

#Put no auth
curl --silent -X PUT -H 'Content-Type: application/json' -d '{"id": 3,"address":"4763 UTSA","city":"San Antonio","state":"Tx","zip":"78228"}' https://10.100.201.3:12030/properties/id --insecure > actual.txt
if grep -f ./test/curl/put_no_auth.txt actual.txt; then
    #pass
    echo "Pass"
else
    echo "Test Fail"
fi

#Good Put
curl --silent -X PUT -H 'Content-Type: application/json' -H 'api_key: cs4783ftw!' -d '{"address":"4763 UTSA","city":"San Antonio","state":"Tx","zip":"78228","id":2}' https://10.100.201.3:12030/properties/id --insecure > actual.txt
if grep -f ./test/curl/put_expected.txt actual.txt; then
    #pass
    echo "Pass"
else
    echo "Test Fail"
fi
