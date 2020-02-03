*** Settings ***
Resource          Global_Define.robot
Library           lib/DatabaseHandler.py
Library           lib/Selenium2Improved.py

*** Keywords ***
Import SQL File Into Database
    [Arguments]    ${database_name}    ${file_name}
    ${SQLFilePath}=    Catenate    SEPARATOR=\\    ${EXECDIR}    TestData    ${file_name}.sql
    Load Database    ${database_url}    ${database_name}    ${database_account}    ${database_password}    ${SQLFilePath}

Turn On ezScrum2019
    Open Browser    ${url}    ${browser}
    Maximize Browser Window
    Set Selenium Speed    ${selenium_speed}

Exit ezScrum2019
    Clean Data In Database
    Close Browser

Clean Data In Database
    FOR    ${database_name}    IN    @{database_names}
        Clean Database    ${database_url}    ${database_account}    ${database_password}    ${database_name}
    END

Select Page
    [Arguments]    ${page_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //a[text()="${page_name}"]

Add Backlog Item
    [Arguments]    ${description}    ${estimate}    ${importance}    ${notes}    @{tags}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Backlog Item"]
    Input Text    //label[text()="*Description:"]/..//textarea    ${description}
    Input Text    //label[text()="Estimate:"]/..//input    ${estimate}
    Input Text    //label[text()="Importance:"]/..//input    ${importance}
    Input Text    //label[text()="Notes:"]/..//textarea    ${notes}
    Assign Tags    @{tags}
    Click Button    //button[text()="Submit"]

Edit Backlog Item
    [Arguments]    ${original_description}    ${new_description}    ${estimate}    ${importance}    ${notes}    @{tags}
    Select Data In Table    ${original_description}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Edit Backlog Item"]
    Input Text    //label[text()="*Description:"]/..//textarea    ${new_description}
    Input Text    //label[text()="Estimate:"]/..//input    ${estimate}
    Input Text    //label[text()="Importance:"]/..//input    ${importance}
    Input Text    //label[text()="Notes:"]/..//textarea    ${notes}
    Assign Tags    @{tags}
    Click Button    //button[text()="Submit"]

Delete Backlog Item
    [Arguments]    ${description}
    Select Data In Table    ${description}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Delete Backlog Item"]
    Click Button    //button[text()="Submit"]

Select Data In Table
    [Arguments]    ${data}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()='${data}']

Go Into Product
    [Arguments]    ${product_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${product_name}"]
    Click Button    //button[text()="Go Into Product"]

Check Data In Table
    [Arguments]    ${data}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain Element    //td[text()='${data}']

Check Data Not In Table
    [Arguments]    ${data}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Not Contain Element    //td[text()='${data}']

Check Data In Table For Multiple Times
    [Arguments]    ${data}    ${times}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain Element    //td[text()='${data}']    limit=${times}

Assign Tags
    [Arguments]    @{tags}
    Click Element    //img[@alt="Assign Tag"]
    FOR    ${tag}    IN    @{tags}
        Select Data In Table    ${tag}
    END
    Click Button    //h4[text()="Assign Tag"]/../..//button[text()="Close"]

Check Tags In Table
    [Arguments]    @{tags}
    FOR    ${tag}    IN    @{tags}
        Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain Element    //td[contains(text(), '${tag}')]
    END

Check Tags Not In Table
    [Arguments]    @{tags}
    FOR    ${tag}    IN    @{tags}
        Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Not Contain Element    //td[contains(text(), '${tag}')]
    END

Clear Text
    [Arguments]    ${locator}
    Input Text    ${locator}    ${SPACE}
    Press Keys    ${locator}    \ue003

Clear Date
    [Arguments]    ${date_type}
    Repeat Keyword    10    Press Keys    //label[text()="*${date_type}:"]/..//input    \ue003

Clear Search Input Text
    [Arguments]    ${column_name}
    Clear Text    //th[text()="${column_name}"]//input

Clear Search Input Text In Dialog
    [Arguments]    ${dialog_title}    ${column_name}
    Clear Text    //h4[text()="${dialog_title}"]/../..//th[text()="${column_name}"]//input

Input Date
    [Arguments]    ${date_type}    ${date}
    ${label_locator}=    Set Variable    //label[text()="*${date_type}:"]
    Input Text    ${label_locator}/..//input    ${date}
    Click Element    ${label_locator}

Search
    [Arguments]    ${column_name}    ${data}
    Input Text    //th[text()="${column_name}"]//input    ${data}

Search In Dialog
    [Arguments]    ${dialog_title}    ${column_name}    ${data}
    Input Text    //h4[text()="${dialog_title}"]/../..//th[text()="${column_name}"]//input    ${data}

Check Input Text Is Required When Add Data
    [Arguments]    ${locator}    ${text}    ${alert_message}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Submit"]
    Alert Should Be Present    ${alert_message}
    Input Text    ${locator}    ${text}

Check Input Date Is Required When Add Data
    [Arguments]    ${date_type}    ${date}    ${alert_message}
    ${label_locator}=    Set Variable    //label[text()="*${date_type}:"]
    Clear Date    ${date_type}
    Check Input Text Is Required When Add Data    ${label_locator}/..//input    ${date}    ${alert_message}
    Click Element    ${label_locator}

Check Input Text Is Required When Edit Data
    [Arguments]    ${locator}    ${alert_message}
    Clear Text    ${locator}
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    ${alert_message}

Check Input Date Is Required When Edit Data
    [Arguments]    ${date_type}    ${alert_message}
    Clear Date    ${date_type}
    Click Element    //label[text()="*${date_type}:"]
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    ${alert_message}

Check Overdue Button
    [Arguments]    ${locator}    ${alert_message}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    ${locator}
    Alert Should Be Present    ${alert_message}
    Click Button    //button[text()="Cancel"]
