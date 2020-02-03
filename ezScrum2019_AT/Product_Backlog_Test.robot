*** Settings ***
Library           keywords/lib/Selenium2Improved.py
Resource          keywords/Common_Resource.robot
Resource          keywords/Product_Backlog/Product_Backlog_Setup.robot
Resource          keywords/Product_Backlog/Product_Backlog_Keywords.robot
Library           OperatingSystem

*** Variables ***
${backlog_item_description}    As a user, I want to add the backlog item in the product backlog.
${tag_name}       Thesis Tag

*** Test Cases ***
Add Backlog Item Test
    [Setup]    Add Backlog Item Setup
    Select Page    Product Backlog
    ${estimate}=    Set Variable    3
    ${importance}=    Set Variable    100
    @{tags}=    Create List    Thesis Tag    Bug    "Important" Thing!!!
    ${notes}=    Set Variable    The notes of the backlog item...
    Add Backlog Item    ${backlog_item_description}    ${estimate}    ${importance}    ${notes}    @{tags}
    Check Data In Table    ${backlog_item_description}
    Check Data In Table    ${estimate}
    Check Data In Table    ${importance}
    Check Tags In Table    @{tags}
    Check Data In Table    ${notes}
    [Teardown]    Exit ezScrum2019

Edit Backlog Item Test
    [Setup]    Edit Backlog Item Setup
    Select Page    Product Backlog
    ${new_backlog_item_description}=    Set Variable    As a user, I want to edit the backlog item in the product backlog.
    ${estimate}=    Set Variable    2
    ${importance}=    Set Variable    80
    @{tags}=    Create List    "Important" Thing!!!
    @{unassigned_tags}=    Create List    Thesis Tag    Bug
    ${notes}=    Set Variable    The notes of the backlog item...
    Edit Backlog Item    ${backlog_item_description}    ${new_backlog_item_description}    ${estimate}    ${importance}    ${notes}    @{unassigned_tags}
    Check Data In Table    ${new_backlog_item_description}
    Check Data In Table    ${estimate}
    Check Data In Table    ${importance}
    Check Tags In Table    @{tags}
    Check Tags Not In Table    @{unassigned_tags}
    Check Data In Table    ${notes}
    [Teardown]    Exit ezScrum2019

Add Backlog Item With No Required Data Test
    [Setup]    Add Backlog Item With No Required Data Setup
    Select Page    Product Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Backlog Item"]
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The description is required.
    [Teardown]    Exit ezScrum2019

Edit Backlog Item With No Required Data Test
    [Setup]    Edit Backlog Item With No Required Data Setup
    Select Page    Product Backlog
    Select Data In Table    ${backlog_item_description}
    Click Button    //button[text()="Edit Backlog Item"]
    Check Input Text Is Required When Edit Data    //label[text()="*Description:"]/..//textarea    The description is required.
    [Teardown]    Exit ezScrum2019

Delete Backlog Item Test
    [Setup]    Delete Backlog Item Setup
    Select Page    Product Backlog
    Delete Backlog Item    ${backlog_item_description}
    Check Data Not In Table    ${backlog_item_description}
    [Teardown]    Exit ezScrum2019

Search Backlog Item Test
    [Setup]    Search Backlog Item Setup
    ${other_backlog_item_description}=    Set Variable    As a user, I want to commit the backlog item in the sprint backlog.
    Select Page    Product Backlog
    Search    Description    ${backlog_item_description}
    Check Data In Table    ${backlog_item_description}
    Check Data Not In Table    ${other_backlog_item_description}
    Clear Search Input Text    Description
    Check Data In Table    ${backlog_item_description}
    Check Data In Table    ${other_backlog_item_description}
    @{tags}=    Create List    ${tag_name}
    Search    Tag    ${tag_name}
    Check Tags In Table    @{tags}
    Check Data In Table    ${backlog_item_description}
    Check Data Not In Table    ${other_backlog_item_description}
    Clear Search Input Text    Tag
    Check Tags In Table    @{tags}
    Check Data In Table    ${backlog_item_description}
    Check Data In Table    ${other_backlog_item_description}
    [Teardown]    Exit ezScrum2019

Add Tag Test
    [Setup]    Add Tag Setup
    Select Page    Product Backlog
    Add Tag    ${tag_name}
    Check Data In Table    ${tag_name}
    [Teardown]    Exit ezScrum2019

Edit Tag Test
    [Setup]    Edit Tag Setup
    Select Page    Product Backlog
    ${new_tag_name}=    Set Variable    Thesis
    Edit Tag    ${tag_name}    ${new_tag_name}
    Check Data In Table    ${new_tag_name}
    [Teardown]    Exit ezScrum2019

Add Tag With No Required Data Test
    [Setup]    Add Tag With No Required Data Setup
    Select Page    Product Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Manage Tag"]
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The name is required.
    [Teardown]    Exit ezScrum2019

Edit Tag With No Required Data Test
    [Setup]    Edit Tag With No Required Data Setup
    Select Page    Product Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Manage Tag"]
    Select Data In Table    ${tag_name}
    ${tag_name_input}=    Set Variable    //input[@value="${tag_name}"]
    Clear Text    ${tag_name_input}
    Click Button    ${tag_name_input}/../../..//button[text()="Submit"]
    Alert Should Be Present    The name is required.
    [Teardown]    Exit ezScrum2019

Add Duplicate Tag Test
    [Setup]    Add Duplicate Tag Setup
    Select Page    Product Backlog
    Add Tag    ${tag_name}
    Alert Should Be Present    There is the same name of the tag.
    [Teardown]    Exit ezScrum2019

Edit Duplicate Tag Test
    [Setup]    Edit Duplicate Tag Setup
    Select Page    Product Backlog
    ${other_tag_name}=    Set Variable    Bug
    Edit Tag    ${other_tag_name}    ${tag_name}
    Alert Should Be Present    There is the same name of the tag.
    [Teardown]    Exit ezScrum2019

Delete Tag Test
    [Setup]    Delete Tag Setup
    Select Page    Product Backlog
    Delete Tag    ${tag_name}
    Check Data Not In Table    ${tag_name}
    [Teardown]    Exit ezScrum2019

Search Tag Test
    [Setup]    Search Tag Setup
    ${other_tag_name1}=    Set Variable    Bug
    ${other_tag_name2}=    Set Variable    "Important" Thing!!!
    Select Page    Product Backlog
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Manage Tag"]
    Search In Dialog    Manage Tag    Name    ${tag_name}
    Check Data In Table    ${tag_name}
    Check Data Not In Table    ${other_tag_name1}
    Check Data Not In Table    ${other_tag_name2}
    Clear Search Input Text In Dialog    Manage Tag    Name
    Check Data In Table    ${tag_name}
    Check Data In Table    ${other_tag_name1}
    Check Data In Table    ${other_tag_name2}
    [Teardown]    Exit ezScrum2019
