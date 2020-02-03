*** Settings ***
Library           ../lib/Selenium2Improved.py
Resource          ../Common_Resource.robot

*** Keywords ***
Add Tag
    [Arguments]    ${name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Manage Tag"]
    Input Text    //label[text()="*Name:"]/..//input    ${name}
    Click Button    //button[text()="Submit"]

Edit Tag
    [Arguments]    ${original_name}    ${new_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Manage Tag"]
    Select Data In Table    ${original_name}
    ${original_name_input}=    Set Variable    //input[@value="${original_name}"]
    Input Text    ${original_name_input}    ${new_name}
    Click Button    ${original_name_input}/../../..//button[text()="Submit"]

Delete Tag
    [Arguments]    ${name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Manage Tag"]
    Click Element    //td[text()="${name}"]/..//input[@type="radio"]
    Click Button    //button[text()="Delete Tag"]
    Click Button    //h4[text()="Delete Tag"]/../..//button[text()="Submit"]
