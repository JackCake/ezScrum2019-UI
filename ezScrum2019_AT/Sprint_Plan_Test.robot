*** Settings ***
Library           keywords/lib/Selenium2Improved.py
Resource          keywords/Common_Resource.robot
Resource          keywords/Sprint_Plan/Sprint_Plan_Setup.robot
Resource          keywords/Sprint_Plan/Sprint_Plan_Keywords.robot
Library           DateTime

*** Variables ***
${sprint_goal}    Implement the product backlog and sprint backlog.

*** Test Cases ***
Add Sprint Test
    [Setup]    Add Sprint Setup
    Select Page    Sprint Plan
    ${interval}=    Set Variable    2
    ${start_date}=    Get Current Date    result_format=%Y/%m/%d
    ${end_date}=    Add Time To Date    ${start_date}    13 days
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${demo_place}=    Set Variable    Room 1622
    ${daily}=    Set Variable    10:00 Room 1321
    Add Sprint    ${sprint_goal}    ${interval}    ${demo_place}    ${daily}
    Check Data In Table    ${sprint_goal}
    Check Data In Table    ${interval}
    ${start_date}=    Convert Date    ${start_date}    result_format=%Y-%m-%d
    Check Data In Table    ${start_date}
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y-%m-%d
    Check Data In Table For Multiple Times    ${end_date}    2
    Check Data In Table    ${demo_place}
    Check Data In Table    ${daily}
    [Teardown]    Exit ezScrum2019

Edit Sprint Test
    [Setup]    Edit Sprint Setup
    Select Page    Sprint Plan
    ${new_sprint_goal}=    Set Variable    Implement the product backlog.
    ${interval}=    Set Variable    1
    ${current_date}=    Get Current Date
    ${start_date}=    Add Time To Date    ${current_date}    28 days
    ${end_date}=    Add Time To Date    ${start_date}    6 days
    ${start_date}=    Convert Date    ${start_date}    result_format=%Y/%m/%d
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${demo_place}=    Set Variable    Room 1622
    ${daily}=    Set Variable    10:00 Room 1321
    Edit Sprint    ${sprint_goal}    ${new_sprint_goal}    ${interval}    ${start_date}    ${demo_place}    ${daily}
    Check Data In Table    ${new_sprint_goal}
    Check Data In Table    ${interval}
    ${start_date}=    Convert Date    ${start_date}    result_format=%Y-%m-%d
    Check Data In Table    ${start_date}
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y-%m-%d
    Check Data In Table For Multiple Times    ${end_date}    2
    Check Data In Table    ${demo_place}
    Check Data In Table    ${daily}
    [Teardown]    Exit ezScrum2019

Add Sprint With No Required Data Test
    [Setup]    Add Sprint With No Required Data Setup
    Select Page    Sprint Plan
    ${interval}=    Set Variable    2
    ${start_date}=    Get Current Date    result_format=%Y/%m/%d
    ${end_date}=    Add Time To Date    ${start_date}    13 days
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Sprint"]
    Check Input Text Is Required When Add Data    //label[text()="*Goal:"]/..//textarea    ${sprint_goal}    The goal is required.
    ${interval_input}=    Set Variable    //label[text()="*Interval:"]/..//input
    Input Text    ${interval_input}    0
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The interval of the sprint should not be zero.
    Clear Text    ${interval_input}
    Check Input Text Is Required When Add Data    ${interval_input}    ${interval}    The interval is required.
    Check Input Date Is Required When Add Data    Start Date    ${start_date}    The format of the start date is not correct.
    Check Input Date Is Required When Add Data    End Date    ${end_date}    The format of the end date is not correct.
    Check Input Date Is Required When Add Data    Demo Date    ${end_date}    The format of the demo date is not correct.
    [Teardown]    Exit ezScrum2019

Edit Sprint With No Required Data Test
    [Setup]    Edit Sprint With No Required Data Setup
    Select Page    Sprint Plan
    Select Data In Table    ${sprint_goal}
    Click Button    //button[text()="Edit Sprint"]
    Check Input Date Is Required When Edit Data    Demo Date    The format of the demo date is not correct.
    Check Input Date Is Required When Edit Data    End Date    The format of the end date is not correct.
    Check Input Date Is Required When Edit Data    Start Date    The format of the start date is not correct.
    ${interval_input}=    Set Variable    //label[text()="*Interval:"]/..//input
    Check Input Text Is Required When Edit Data    ${interval_input}    The interval is required.
    Input Text    ${interval_input}    0
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The interval of the sprint should not be zero.
    Check Input Text Is Required When Edit Data    //label[text()="*Goal:"]/..//textarea    The goal is required.
    [Teardown]    Exit ezScrum2019

Add Overlap Sprint Test
    [Setup]    Add Overlap Sprint Setup
    Select Page    Sprint Plan
    ${interval}=    Set Variable    2
    ${start_date}=    Get Current Date    result_format=%Y/%m/%d
    ${end_date}=    Add Time To Date    ${start_date}    13 days
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${demo_place}=    Set Variable    Room 1622
    ${daily}=    Set Variable    10:00 Room 1321
    Add Sprint    ${sprint_goal}    ${interval}    ${demo_place}    ${daily}
    Alert Should Be Present    Sorry, the start date or the end date is overlap with the other sprint!
    [Teardown]    Exit ezScrum2019

Edit Overlap Sprint Test
    [Setup]    Edit Overlap Sprint Setup
    Select Page    Sprint Plan
    ${new_sprint_goal}=    Set Variable    Implement the product backlog.
    ${interval}=    Set Variable    3
    ${start_date}=    Get Current Date    result_format=%Y/%m/%d
    ${end_date}=    Add Time To Date    ${start_date}    20 days
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${demo_place}=    Set Variable    Room 1622
    ${daily}=    Set Variable    10:00 Room 1321
    Edit Sprint    ${sprint_goal}    ${new_sprint_goal}    ${interval}    ${start_date}    ${demo_place}    ${daily}
    Alert Should Be Present    Sorry, the start date or the end date is overlap with the other sprint!
    [Teardown]    Exit ezScrum2019

Delete Sprint Test
    [Setup]    Delete Sprint Setup
    Select Page    Sprint Plan
    Delete Sprint    ${sprint_goal}
    Check Data Not In Table    ${sprint_goal}
    [Teardown]    Exit ezScrum2019

Search Sprint Test
    [Setup]    Search Sprint Setup
    ${other_sprint_goal}=    Set Variable    Implement the sprint backlog.
    Select Page    Sprint Plan
    Search    Goal    ${sprint_goal}
    Check Data In Table    ${sprint_goal}
    Check Data Not In Table    ${other_sprint_goal}
    Clear Search Input Text    Goal
    Check Data In Table    ${sprint_goal}
    Check Data In Table    ${other_sprint_goal}
    [Teardown]    Exit ezScrum2019

Operate Sprint Plan With Overdue Sprint Test
    [Setup]    Operate Sprint Plan With Overdue Sprint Setup
    Select Page    Sprint Plan
    Select Data In Table    ${sprint_goal}
    Check Overdue Button    //button[text()="Edit Sprint"]    The sprint is overdue, are you sure to edit it?
    Check Overdue Button    //button[text()="Delete Sprint"]    The sprint is overdue, are you sure to delete it?
    [Teardown]    Exit ezScrum2019
