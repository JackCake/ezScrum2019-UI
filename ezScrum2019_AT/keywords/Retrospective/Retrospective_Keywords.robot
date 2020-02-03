*** Settings ***
Library           ../lib/Selenium2Improved.py
Resource          ../Common_Resource.robot

*** Keywords ***
Edit Retrospective
    [Arguments]    ${retrospective}    ${sprint_order_id}
    Select Data In Table    ${sprint_order_id}
    Click Button    //button[text()="Edit Retrospective"]
    Input Text    //label[text()="*Discussion:"]/..//textarea    ${retrospective}
    Click Button    //button[text()="Submit"]
