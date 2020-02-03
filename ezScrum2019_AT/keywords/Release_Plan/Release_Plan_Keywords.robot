*** Settings ***
Library           ../lib/Selenium2Improved.py
Resource          ../Common_Resource.robot

*** Keywords ***
Add Release
    [Arguments]    ${name}    ${start_date}    ${end_date}    ${description}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Release"]
    Input Text    //label[text()="*Name:"]/..//input    ${name}
    Input Date    Start Date    ${start_date}
    Input Date    End Date    ${end_date}
    Input Text    //label[text()="*Description:"]/..//textarea    ${description}
    Click Button    //button[text()="Submit"]

Edit Release
    [Arguments]    ${original_name}    ${new_name}    ${start_date}    ${end_date}    ${description}
    Select Data In Table    ${original_name}
    Click Button    //button[text()="Edit Release"]
    Input Text    //label[text()="*Name:"]/..//input    ${new_name}
    Clear Date    Start Date
    Input Date    Start Date    ${start_date}
    Clear Date    End Date
    Input Date    End Date    ${end_date}
    Input Text    //label[text()="*Description:"]/..//textarea    ${description}
    Click Button    //button[text()="Submit"]

Delete Release
    [Arguments]    ${name}
    Select Data In Table    ${name}
    Click Button    //button[text()="Delete Release"]
    Click Button    //button[text()="Submit"]

Schedule Backlog Item
    [Arguments]    ${backlog_item_description}    ${release_name}
    Select Data In Table    ${release_name}
    Click Button    //button[text()="Schedule Backlog Item"]
    Select Data In Table    ${backlog_item_description}
    Click Button    //button[text()="Submit"]

Unschedule Backlog Item
    [Arguments]    ${backlog_item_description}    ${release_name}
    Select Data In Table    ${release_name}
    Select Data In Table    ${backlog_item_description}
    Click Button    //button[text()="Unschedule Backlog Item"]
    Click Button    //button[text()="Submit"]

Show Release Information
    [Arguments]    ${name}
    Select Data In Table    ${name}
    Click Button    //button[text()="Release Information"]
