*** Settings ***
Library           keywords/lib/Selenium2Improved.py
Resource          keywords/Common_Resource.robot
Resource          keywords/Release_Plan/Release_Plan_Keywords.robot
Resource          keywords/Release_Plan/Release_Plan_Setup.robot
Library           DateTime

*** Variables ***
${backlog_item_description1}    As a user, I want to add the backlog item in the product backlog.
${backlog_item_description2}    As a user, I want to commit the backlog item in the sprint backlog.
${release_name}    Release ezKanban v1.0

*** Test Cases ***
Add Release Test
    [Setup]    Add Release Setup
    Select Page    Release Plan
    ${start_date}=    Get Current Date    result_format=%Y/%m/%d
    ${end_date}=    Add Time To Date    ${start_date}    30 days
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${description}=    Set Variable    ezKanban Principles
    Add Release    ${release_name}    ${start_date}    ${end_date}    ${description}
    Check Data In Table    ${release_name}
    ${start_date}=    Convert Date    ${start_date}    result_format=%Y-%m-%d
    Check Data In Table    ${start_date}
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y-%m-%d
    Check Data In Table    ${end_date}
    Check Data In Table    ${description}
    [Teardown]    Exit ezScrum2019

Edit Release Test
    [Setup]    Edit Release Setup
    Select Page    Release Plan
    ${new_release_name}=    Set Variable    Release ezScrum 2019
    ${current_date}=    Get Current Date
    ${start_date}=    Add Time To Date    ${current_date}    61 days
    ${end_date}=    Add Time To Date    ${start_date}    30 days
    ${start_date}=    Convert Date    ${start_date}    result_format=%Y/%m/%d
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${description}=    Set Variable    Product Backlog, Release Plan, Sprint Plan, Sprint Backlog and Retrospective
    Edit Release    ${release_name}    ${new_release_name}    ${start_date}    ${end_date}    ${description}
    Check Data In Table    ${new_release_name}
    ${start_date}=    Convert Date    ${start_date}    result_format=%Y-%m-%d
    Check Data In Table    ${start_date}
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y-%m-%d
    Check Data In Table    ${end_date}
    Check Data In Table    ${description}
    [Teardown]    Exit ezScrum2019

Add Release With No Required Data Test
    [Setup]    Add Release With No Required Data Setup
    Select Page    Release Plan
    ${description}=    Set Variable    ezKanban Principles
    ${start_date}=    Get Current Date    result_format=%Y/%m/%d
    ${end_date}=    Add Time To Date    ${start_date}    30 days
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Release"]
    Check Input Text Is Required When Add Data    //label[text()="*Name:"]/..//input    ${release_name}    The name is required.
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The format of the start date is not correct.
    Input Date    Start Date    ${start_date}
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The format of the end date is not correct.
    Input Date    End Date    ${end_date}
    Check Input Text Is Required When Add Data    //label[text()="*Description:"]/..//textarea    ${description}    The description is required.
    [Teardown]    Exit ezScrum2019

Edit Release With No Required Data Test
    [Setup]    Edit Release With No Required Data Setup
    Select Page    Release Plan
    Select Data In Table    ${release_name}
    Click Button    //button[text()="Edit Release"]
    Check Input Text Is Required When Edit Data    //label[text()="*Description:"]/..//textarea    The description is required.
    Check Input Date Is Required When Edit Data    End Date    The format of the end date is not correct.
    Check Input Date Is Required When Edit Data    Start Date    The format of the start date is not correct.
    Check Input Text Is Required When Edit Data    //label[text()="*Name:"]/..//input    The name is required.
    [Teardown]    Exit ezScrum2019

Add Overlap Release Test
    [Setup]    Add Overlap Release Setup
    Select Page    Release Plan
    ${start_date}=    Get Current Date    result_format=%Y/%m/%d
    ${end_date}=    Add Time To Date    ${start_date}    30 days
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${description}=    Set Variable    ezKanban Principles
    Add Release    ${release_name}    ${start_date}    ${end_date}    ${description}
    Alert Should Be Present    Sorry, the start date or the end date is overlap with the other release!
    [Teardown]    Exit ezScrum2019

Edit Overlap Release Test
    [Setup]    Edit Overlap Release Setup
    Select Page    Release Plan
    ${new_release_name}=    Set Variable    Release ezScrum 2019
    ${current_date}=    Get Current Date
    ${start_date}=    Add Time To Date    ${current_date}    14 days
    ${end_date}=    Add Time To Date    ${start_date}    30 days
    ${start_date}=    Convert Date    ${start_date}    result_format=%Y/%m/%d
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${description}=    Set Variable    Product Backlog, Release Plan, Sprint Plan, Sprint Backlog and Retrospective
    Edit Release    ${release_name}    ${new_release_name}    ${start_date}    ${end_date}    ${description}
    Alert Should Be Present    Sorry, the start date or the end date is overlap with the other release!
    [Teardown]    Exit ezScrum2019

Edit Release With Start Date After End Date Test
    [Setup]    Edit Release With Start Date After End Date Setup
    Select Page    Release Plan
    ${current_date}=    Get Current Date
    ${start_date}=    Add Time To Date    ${current_date}    61 days
    ${start_date}=    Convert Date    ${start_date}    result_format=%Y/%m/%d
    Select Data In Table    ${release_name}
    Click Button    //button[text()="Edit Release"]
    Clear Date    Start Date
    Input Date    Start Date    ${start_date}
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    Sorry, the start date must be before the end date!
    [Teardown]    Exit ezScrum2019

Delete Release Test
    [Setup]    Delete Release Setup
    Select Page    Release Plan
    Delete Release    ${release_name}
    Check Data Not In Table    ${release_name}
    [Teardown]    Exit ezScrum2019

Search Release Test
    [Setup]    Search Release Setup
    ${other_release_name}=    Set Variable    Release ezKanban v2.0
    Select Page    Release Plan
    Search    Name    ${release_name}
    Check Data In Table    ${release_name}
    Check Data Not In Table    ${other_release_name}
    Clear Search Input Text    Name
    Check Data In Table    ${release_name}
    Check Data In Table    ${other_release_name}
    [Teardown]    Exit ezScrum2019

Schedule Backlog Item Test
    [Setup]    Schedule Backlog Item Setup
    Select Page    Release Plan
    Schedule Backlog Item    ${backlog_item_description2}    ${release_name}
    Check Data In Table    ${backlog_item_description2}
    [Teardown]    Exit ezScrum2019

Unschedule Backlog Item Test
    [Setup]    Unschedule Backlog Item Setup
    Select Page    Release Plan
    Unschedule Backlog Item    ${backlog_item_description2}    ${release_name}
    Check Data Not In Table    ${backlog_item_description2}
    Select Page    Product Backlog
    Check Data In Table    ${backlog_item_description2}
    [Teardown]    Exit ezScrum2019

Add Backlog Item Test
    [Setup]    Add Backlog Item Setup
    Select Page    Release Plan
    Select Data In Table    ${release_name}
    ${estimate}=    Set Variable    3
    ${importance}=    Set Variable    100
    @{tags}=    Create List    Thesis Tag    Bug    "Important" Thing!!!
    ${notes}=    Set Variable    The notes of the backlog item...
    Add Backlog Item    ${backlog_item_description1}    ${estimate}    ${importance}    ${notes}    @{tags}
    Check Data In Table    ${backlog_item_description1}
    Check Data In Table    ${estimate}
    Check Data In Table    ${importance}
    Check Tags In Table    @{tags}
    Check Data In Table    ${notes}
    [Teardown]    Exit ezScrum2019

Edit Backlog Item Test
    [Setup]    Edit Backlog Item Setup
    Select Page    Release Plan
    Select Data In Table    ${release_name}
    ${new_backlog_item_description1}=    Set Variable    As a user, I want to edit the backlog item in the product backlog.
    ${estimate}=    Set Variable    2
    ${importance}=    Set Variable    80
    @{tags}=    Create List    "Important" Thing!!!
    @{unassigned_tags}=    Create List    Thesis Tag    Bug
    ${notes}=    Set Variable    The notes of the backlog item...
    Edit Backlog Item    ${backlog_item_description1}    ${new_backlog_item_description1}    ${estimate}    ${importance}    ${notes}    @{unassigned_tags}
    Check Data In Table    ${new_backlog_item_description1}
    Check Data In Table    ${estimate}
    Check Data In Table    ${importance}
    Check Tags In Table    @{tags}
    Check Tags Not In Table    @{unassigned_tags}
    Check Data In Table    ${notes}
    [Teardown]    Exit ezScrum2019

Add Backlog Item With No Required Data Test
    [Setup]    Add Backlog Item With No Required Data Setup
    Select Page    Release Plan
    Select Data In Table    ${release_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Backlog Item"]
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The description is required.
    [Teardown]    Exit ezScrum2019

Edit Backlog Item With No Required Data Test
    [Setup]    Edit Backlog Item With No Required Data Setup
    Select Page    Release Plan
    Select Data In Table    ${release_name}
    Select Data In Table    ${backlog_item_description1}
    Click Button    //button[text()="Edit Backlog Item"]
    Check Input Text Is Required When Edit Data    //label[text()="*Description:"]/..//textarea    The description is required.
    [Teardown]    Exit ezScrum2019

Delete Backlog Item Test
    [Setup]    Delete Backlog Item Setup
    Select Page    Release Plan
    Select Data In Table    ${release_name}
    Delete Backlog Item    ${backlog_item_description1}
    Check Data Not In Table    ${backlog_item_description1}
    Select Page    Product Backlog
    Check Data Not In Table    ${backlog_item_description1}
    [Teardown]    Exit ezScrum2019

Search Scheduled Backlog Item Test
    [Setup]    Search Scheduled Backlog Item Setup
    Select Page    Release Plan
    Select Data In Table    ${release_name}
    Search    Description    ${backlog_item_description1}
    Check Data In Table    ${backlog_item_description1}
    Check Data Not In Table    ${backlog_item_description2}
    Clear Search Input Text    Description
    Check Data In Table    ${backlog_item_description1}
    Check Data In Table    ${backlog_item_description2}
    [Teardown]    Exit ezScrum2019

Search Not Yet Scheduled Backlog Item Test
    [Setup]    Search Not Yet Scheduled Backlog Item Setup
    Select Page    Release Plan
    Select Data In Table    ${release_name}
    Click Button    //button[text()="Schedule Backlog Item"]
    Search In Dialog    Schedule Backlog Item    Description    ${backlog_item_description1}
    Check Data In Table    ${backlog_item_description1}
    Check Data Not In Table    ${backlog_item_description2}
    Clear Search Input Text In Dialog    Schedule Backlog Item    Description
    Check Data In Table    ${backlog_item_description1}
    Check Data In Table    ${backlog_item_description2}
    [Teardown]    Exit ezScrum2019

Show Release Information Test
    [Setup]    Show Release Information Setup
    Select Page    Release Plan
    Show Release Information    ${release_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Select Window    NEW
    ${order_id}=    Set Variable    1
    ${start_date}=    Get Current Date    result_format=%Y/%m/%d
    ${end_date}=    Add Time To Date    ${start_date}    30 days
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${release_description}=    Set Variable    ezKanban Principles
    ${backlog_item_estimate1}=    Set Variable    3
    ${backlog_item_estimate2}=    Set Variable    5
    ${total_backlog_item_estimate}=    Evaluate    ${backlog_item_estimate1} + ${backlog_item_estimate2}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain    ezScrum, Release ${order_id}
    Page Should Contain    Release Name
    Page Should Contain    ${release_name}
    Page Should Contain    Release Backlog(Estimates in Parenthesis)
    Page Should Contain    ${backlog_item_description1}(${backlog_item_estimate1})
    Page Should Contain    ${backlog_item_description2}(${backlog_item_estimate2})
    Page Should Contain    Estimated velocity : ${total_backlog_item_estimate} points
    Page Should Contain    Schedule
    Page Should Contain    Release period : ${start_date} to ${end_date}
    Page Should Contain    Description : ${release_description}
    [Teardown]    Exit ezScrum2019

Operate Release Plan With Overdue Release Test
    [Setup]    Operate Release Plan With Overdue Release Setup
    Select Page    Release Plan
    Select Data In Table    ${release_name}
    Check Overdue Button    //button[text()="Edit Release"]    The release is overdue, are you sure to edit it?
    Check Overdue Button    //button[text()="Delete Release"]    The release is overdue, are you sure to delete it?
    Element Should Be Disabled    //button[text()="Add Backlog Item"]
    Element Should Be Disabled    //button[text()="Schedule Backlog Item"]
    Select Data In Table    ${backlog_item_description1}
    Check Overdue Button    //button[text()="Edit Backlog Item"]    The release is overdue, are you sure to edit the story?
    Check Overdue Button    //button[text()="Delete Backlog Item"]    The release is overdue, are you sure to delete the story?
    Check Overdue Button    //button[text()="Unschedule Backlog Item"]    The release is overdue, are you sure to unschedule the backlog item?
    [Teardown]    Exit ezScrum2019
