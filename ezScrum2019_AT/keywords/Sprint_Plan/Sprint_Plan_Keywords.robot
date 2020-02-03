*** Settings ***
Library           ../lib/Selenium2Improved.py
Resource          ../Common_Resource.robot

*** Keywords ***
Add Sprint
    [Arguments]    ${goal}    ${interval}    ${demo_place}    ${daily}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Sprint"]
    Input Text    //label[text()="*Goal:"]/..//textarea    ${goal}
    Input Text    //label[text()="*Interval:"]/..//input    ${interval}
    Input Text    //label[text()="Demo Place:"]/..//input    ${demo_place}
    Input Text    //label[text()="Time and Place for Daily Scrum:"]/..//input    ${daily}
    Click Button    //button[text()="Submit"]

Edit Sprint
    [Arguments]    ${original_goal}    ${new_goal}    ${interval}    ${start_date}    ${demo_place}    ${daily}
    Select Data In Table    ${original_goal}
    Click Button    //button[text()="Edit Sprint"]
    Input Text    //label[text()="*Goal:"]/..//textarea    ${new_goal}
    Input Text    //label[text()="*Interval:"]/..//input    ${interval}
    Clear Date    Start Date
    Input Date    Start Date    ${start_date}
    Input Text    //label[text()="Demo Place:"]/..//input    ${demo_place}
    Input Text    //label[text()="Time and Place for Daily Scrum:"]/..//input    ${daily}
    Click Button    //button[text()="Submit"]

Delete Sprint
    [Arguments]    ${goal}
    Select Data In Table    ${goal}
    Click Button    //button[text()="Delete Sprint"]
    Click Button    //button[text()="Submit"]
