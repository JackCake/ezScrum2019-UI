*** Settings ***
Library           keywords/lib/Selenium2Improved.py
Resource          keywords/Common_Resource.robot
Resource          keywords/Sprint_Backlog/Sprint_Backlog_Setup.robot
Resource          keywords/Sprint_Backlog/Sprint_Backlog_Keywords.robot
Library           DateTime

*** Variables ***
${backlog_item_description1}    As a user, I want to add the backlog item in the product backlog.
${backlog_item_description2}    As a user, I want to commit the backlog item in the sprint backlog.
${task_description1}    Use Case
${task_description2}    Unit Test

*** Test Cases ***
Add Backlog Item Test
    [Setup]    Add Backlog Item Setup
    Select Page    Sprint Backlog
    ${estimate}=    Set Variable    3
    ${importance}=    Set Variable    100
    @{tags}=    Create List    Thesis Tag    Bug    "Important" Thing!!!
    ${notes}=    Set Variable    The notes of the backlog item...
    Add Backlog Item    ${backlog_item_description1}    ${estimate}    ${importance}    ${notes}    @{tags}
    ${order_id}=    Set Variable    1
    Check Data In Story Card    ${order_id}    ${backlog_item_description1}
    Check Data In Story Card    ${order_id}    ${estimate}
    Check Tags In Story Card    ${order_id}    @{tags}
    [Teardown]    Exit ezScrum2019

Edit Backlog Item Test
    [Setup]    Edit Backlog Item Setup
    Select Page    Sprint Backlog
    ${new_backlog_item_description1}=    Set Variable    As a user, I want to edit the backlog item in the product backlog.
    ${estimate}=    Set Variable    2
    ${importance}=    Set Variable    80
    @{tags}=    Create List    "Important" Thing!!!
    @{unassigned_tags}=    Create List    Thesis Tag    Bug
    ${notes}=    Set Variable    The notes of the backlog item...
    Edit Story Card    ${backlog_item_description1}    ${new_backlog_item_description1}    ${estimate}    ${importance}    ${notes}    @{unassigned_tags}
    ${order_id}=    Set Variable    2
    Check Data In Story Card    ${order_id}    ${new_backlog_item_description1}
    Check Data In Story Card    ${order_id}    ${estimate}
    Check Tags In Story Card    ${order_id}    @{tags}
    Check Tags Not In Story Card    ${order_id}    @{unassigned_tags}
    [Teardown]    Exit ezScrum2019

Add Backlog Item With No Required Data Test
    [Setup]    Add Backlog Item With No Required Data Setup
    Select Page    Sprint Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Backlog Item"]
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The description is required.
    [Teardown]    Exit ezScrum2019

Edit Backlog Item With No Required Data Test
    [Setup]    Edit Backlog Item With No Required Data Setup
    Select Page    Sprint Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${backlog_item_description1}"]/../..//img[@alt="Edit Backlog Item"]
    Check Input Text Is Required When Edit Data    //label[text()="*Description:"]/..//textarea    The description is required.
    [Teardown]    Exit ezScrum2019

Delete Backlog Item Test
    [Setup]    Delete Backlog Item Setup
    Select Page    Sprint Backlog
    Delete Story Card    ${backlog_item_description1}
    Story Card Should Not Exist With Data    ${backlog_item_description1}
    Select Page    Product Backlog
    Check Data Not In Table    ${backlog_item_description1}
    [Teardown]    Exit ezScrum2019

Commit Backlog Item Test
    [Setup]    Commit Backlog Item Setup
    Select Page    Sprint Backlog
    Commit Backlog Item    ${backlog_item_description2}
    ${order_id}=    Set Variable    1
    Check Data In Story Card    ${order_id}    ${backlog_item_description2}
    [Teardown]    Exit ezScrum2019

Dop Backlog Item Test
    [Setup]    Drop Backlog Item Setup
    Select Page    Sprint Backlog
    Drop Story Card    ${backlog_item_description2}
    Story Card Should Not Exist With Data    ${backlog_item_description2}
    Select Page    Product Backlog
    Check Data In Table    ${backlog_item_description2}
    [Teardown]    Exit ezScrum2019

Search Not Yet Committed Backlog Item Test
    [Setup]    Search Not Yet Committed Backlog Item Setup
    Select Page    Sprint Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Commit Backlog Item"]
    Search In Dialog    Commit Backlog Item    Description    ${backlog_item_description1}
    Check Data In Table    ${backlog_item_description1}
    Check Data Not In Table    ${backlog_item_description2}
    Clear Search Input Text In Dialog    Commit Backlog Item    Description
    Check Data In Table    ${backlog_item_description1}
    Check Data In Table    ${backlog_item_description2}
    [Teardown]    Exit ezScrum2019

Add Task Test
    [Setup]    Add Task Setup
    Select Page    Sprint Backlog
    ${estimate1}=    Set Variable    5
    ${notes1}=    Set Variable    The notes of the use case...
    Add Task Card    ${task_description1}    ${estimate1}    ${notes1}    ${backlog_item_description1}
    ${order_id1}=    Set Variable    1
    Check Data In Task Card    ${order_id1}    ${task_description1}
    Check Data In Task Card    ${order_id1}    ${estimate1}
    ${estimate2}=    Set Variable    3
    ${notes2}=    Set Variable    The notes of the unit test...
    ${order_id2}=    Set Variable    2
    Add Task Card    ${task_description2}    ${estimate2}    ${notes2}    ${backlog_item_description1}
    Check Data In Task Card    ${order_id2}    ${task_description2}
    Check Data In Task Card    ${order_id2}    ${estimate2}
    [Teardown]    Exit ezScrum2019

Edit Task Test
    [Setup]    Edit Task Setup
    Select Page    Sprint Backlog
    ${new_task_description1}=    Set Variable    Implement Use Case
    ${estimate1}=    Set Variable    8
    ${notes1}=    Set Variable    The notes about implement use case...
    Edit Task Card    ${task_description1}    ${new_task_description1}    ${estimate1}    ${notes1}
    ${order_id1}=    Set Variable    1
    Check Data In Task Card    ${order_id1}    ${new_task_description1}
    Check Data In Task Card    ${order_id1}    ${estimate1}
    ${new_task_description2}=    Set Variable    Implement Unit Test
    ${estimate2}=    Set Variable    5
    ${notes2}=    Set Variable    The notes about implement unit test...
    Edit Task Card    ${task_description2}    ${new_task_description2}    ${estimate2}    ${notes2}
    ${order_id2}=    Set Variable    2
    Check Data In Task Card    ${order_id2}    ${new_task_description2}
    Check Data In Task Card    ${order_id2}    ${estimate2}
    [Teardown]    Exit ezScrum2019

Add Task With With No Required Data Test
    [Setup]    Add Task With No Required Data Setup
    Select Page    Sprint Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${backlog_item_description1}"]/../..//img[@alt="Add Task"]
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The description is required.
    [Teardown]    Exit ezScrum2019

Edit Task With With No Required Data Test
    [Setup]    Edit Task With No Required Data Setup
    Select Page    Sprint Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${task_description1}"]/../..//img[@alt="Edit Task"]
    Check Input Text Is Required When Edit Data    //label[text()="*Description:"]/..//textarea    The description is required.
    [Teardown]    Exit ezScrum2019

Delete Task Test
    [Setup]    Delete Task Setup
    Select Page    Sprint Backlog
    Delete Task Card    ${task_description1}
    Task Card Should Not Exist With Data    ${task_description1}
    Delete Task Card    ${task_description2}
    Task Card Should Not Exist With Data    ${task_description2}
    [Teardown]    Exit ezScrum2019

Show Backlog Item History Test
    [Setup]    Show Backlog Item History Setup
    Select Page    Sprint Backlog
    ${sprint_goal}=    Set Variable    Implement the product backlog and sprint backlog.
    ${estimate}=    Set Variable    3
    ${importance}=    Set Variable    100
    ${notes}=    Set Variable    The notes of adding the backlog item...
    @{tags}=    Create List    Thesis Tag    Bug    "Important" Thing!!!
    Add Backlog Item    ${backlog_item_description1}    ${estimate}    ${importance}    ${notes}    @{tags}
    ${new_backlog_item_description1}=    Set Variable    As a user, I want to edit the backlog item in the product backlog.
    ${new_estimate}=    Set Variable    2
    ${new_importance}=    Set Variable    80
    ${new_notes}=    Set Variable    The notes of editing the backlog item...
    @{unassigned_tags}=    Create List    Thesis Tag    Bug
    Edit Story Card    ${backlog_item_description1}    ${new_backlog_item_description1}    ${new_estimate}    ${new_importance}    ${new_notes}    @{unassigned_tags}
    Drop Story Card    ${new_backlog_item_description1}
    Commit Backlog Item    ${new_backlog_item_description1}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${new_backlog_item_description1}"]/../..//img[@alt="Backlog Item Histories"]
    Check Data In Table    Create
    Check Data In Table    Create Backlog Item
    Check Data In Table For Multiple Times    Commit Backlog Item    2
    Check Data In Table For Multiple Times    Commit Backlog Item To Sprint "${sprint_goal}"    2
    Check Data In Table    Edit Description
    Check Data In Table    "${backlog_item_description1}" → "${new_backlog_item_description1}"
    Check Data In Table    Change Estimate
    Check Data In Table    "${estimate}" → "${new_estimate}"
    Check Data In Table    Edit Notes
    Check Data In Table    "${notes}" → "${new_notes}"
    Check Data In Table    Change Importance
    Check Data In Table    "${importance}" → "${new_importance}"
    Check Data In Table    Drop Backlog Item
    Check Data In Table    Drop Backlog Item From Sprint "${sprint_goal}"
    [Teardown]    Exit ezScrum2019

Show Task History Test
    [Setup]    Show Task History Setup
    Select Page    Sprint Backlog
    ${estimate}=    Set Variable    5
    ${notes}=    Set Variable    The notes of the use case...
    Add Task Card    ${task_description1}    ${estimate}    ${notes}    ${backlog_item_description1}
    ${new_task_description1}=    Set Variable    Implement Use Case
    ${new_estimate}=    Set Variable    8
    ${new_notes}=    Set Variable    The notes about implement use case...
    Edit Task Card    ${task_description1}    ${new_task_description1}    ${new_estimate}    ${new_notes}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${new_task_description1}"]/../..//img[@alt="Task Histories"]
    Check Data In Table    Create
    Check Data In Table    Create Task
    Check Data In Table    Edit Description
    Check Data In Table    "${task_description1}" → "${new_task_description1}"
    Check Data In Table    Change Estimate
    Check Data In Table For Multiple Times    "${estimate}" → "${new_estimate}"    2
    Check Data In Table    Change Remains
    Check Data In Table    Edit Notes
    Check Data In Table    "${notes}" → "${new_notes}"
    [Teardown]    Exit ezScrum2019

Upload And Remove Backlog Item Attach File Test
    [Setup]    Upload And Remove Backlog Item Attach File Setup
    Select Page    Sprint Backlog
    ${order_id}=    Set Variable    1
    ${file_name}=    Set Variable    test.pdf
    ${file_path}=    Catenate    SEPARATOR=\\    ${EXECDIR}    TestData    ${file_name}
    Upload Attach File    ${backlog_item_description1}    ${file_path}
    Check Attach File In Story Card    ${order_id}    ${file_name}
    Remove Attach File From Story Card    ${order_id}    ${file_name}
    Check Attach File Not In Story Card    ${order_id}    ${file_name}
    [Teardown]    Exit ezScrum2019

Upload And Remove Task Attach File Test
    [Setup]    Upload And Remove Task Attach File Setup
    Select Page    Sprint Backlog
    ${order_id}=    Set Variable    1
    ${file_name}=    Set Variable    test.pdf
    ${file_path}=    Catenate    SEPARATOR=\\    ${EXECDIR}    TestData    ${file_name}
    Upload Attach File    ${task_description1}    ${file_path}
    Check Attach File In Task Card    ${order_id}    ${file_name}
    Remove Attach File From Task Card    ${order_id}    ${file_name}
    Check Attach File Not In Task Card    ${order_id}    ${file_name}
    [Teardown]    Exit ezScrum2019

Upload Backlog Item Attach File With No File Test
    [Setup]    Upload Backlog Item Attach File With No File Setup
    Select Page    Sprint Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${backlog_item_description1}"]/../..//img[@alt="Upload Attach File"]
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The file must be choose.
    [Teardown]    Exit ezScrum2019

Upload Task Attach File With No File Test
    [Setup]    Upload Task Attach File With No File Setup
    Select Page    Sprint Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${task_description1}"]/../..//img[@alt="Upload Attach File"]
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The file must be choose.
    [Teardown]    Exit ezScrum2019

Show Sprint Information Test
    [Setup]    Show Sprint Information Setup
    Select Page    Sprint Backlog
    Show Sprint Information
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Select Window    NEW
    ${order_id}=    Set Variable    2
    ${sprint_goal}=    Set Variable    Implement the product backlog and sprint backlog.
    ${current_date}=    Get Current Date
    ${start_date}=    Add Time To Date    ${current_date}    14 days
    ${end_date}=    Add Time To Date    ${start_date}    13 days
    ${start_date}=    Convert Date    ${start_date}    result_format=%Y/%m/%d
    ${end_date}=    Convert Date    ${end_date}    result_format=%Y/%m/%d
    ${demo_place}=    Set Variable    12F Room
    ${daily}=    Set Variable    10:00 Room 1321
    ${backlog_item_estimate1}=    Set Variable    3
    ${backlog_item_estimate2}=    Set Variable    5
    ${total_backlog_item_estimate}=    Evaluate    ${backlog_item_estimate1} + ${backlog_item_estimate2}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain    ezScrum, Sprint ${order_id}
    Page Should Contain    Sprint Goal
    Page Should Contain    ${sprint_goal}
    Page Should Contain    Sprint Backlog(Estimates in Parenthesis)
    Page Should Contain    ${backlog_item_description1}(${backlog_item_estimate1})
    Page Should Contain    ${backlog_item_description2}(${backlog_item_estimate2})
    Page Should Contain    Estimated velocity : ${total_backlog_item_estimate} points
    Page Should Contain    Schedule
    Page Should Contain    Sprint period : ${start_date} to ${end_date}
    Page Should Contain    Daily Scrum : ${daily}
    Page Should Contain    Sprint demo : ${end_date} ${demo_place}
    [Teardown]    Exit ezScrum2019

Operate Sprint Backlog With Overdue Sprint Test
    [Setup]    Operate Sprint Backlog With Overdue Sprint Setup
    Select Page    Sprint Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Element Should Be Disabled    //button[text()="Add Backlog Item"]
    Element Should Be Disabled    //button[text()="Commit Backlog Item"]
    ${backlog_item_description_td}=    Set Variable    //td[text()="${backlog_item_description1}"]
    Element Should Be Disabled    ${backlog_item_description_td}/../..//img[@alt="Add Task"]/..
    Check Overdue Button    ${backlog_item_description_td}/../..//img[@alt="Edit Backlog Item"]/..    The sprint is overdue, are you sure to edit the story?
    Check Overdue Button    ${backlog_item_description_td}/../..//img[@alt="Delete Backlog Item"]/..    The sprint is overdue, are you sure to delete the story?
    Check Overdue Button    ${backlog_item_description_td}/../..//img[@alt="Drop Backlog Item"]/..    The sprint is overdue, are you sure to drop the backlog item?
    ${task_description_td}=    Set Variable    //td[text()="${task_description1}"]
    Check Overdue Button    ${task_description_td}/../..//img[@alt="Edit Task"]/..    The sprint is overdue, are you sure to edit the task?
    Check Overdue Button    ${task_description_td}/../..//img[@alt="Delete Task"]/..    The sprint is overdue, are you sure to delete the task?
    [Teardown]    Exit ezScrum2019
