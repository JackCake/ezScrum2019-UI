*** Settings ***
Resource          ../Common_Resource.robot
Library           ../lib/Selenium2Improved.py

*** Keywords ***
Commit Backlog Item
    [Arguments]    ${description}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Commit Backlog Item"]
    Select Data In Table    ${description}
    Click Button    //button[text()="Submit"]

Drop Story Card
    [Arguments]    ${description}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //table[@class="StoryCard_Table"]//td[text()="${description}"]/../..//img[@alt="Drop Backlog Item"]
    Click Button    //button[text()="Submit"]

Add Task Card
    [Arguments]    ${description}    ${estimate}    ${notes}    ${backlog_item_description}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${backlog_item_description}"]/../..//img[@alt="Add Task"]
    Input Text    //label[text()="*Description:"]/..//textarea    ${description}
    Input Text    //label[text()="Estimate:"]/..//input    ${estimate}
    Input Text    //label[text()="Notes:"]/..//textarea    ${notes}
    Click Button    //button[text()="Submit"]

Edit Task Card
    [Arguments]    ${original_description}    ${new_description}    ${estimate}    ${notes}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${original_description}"]/../..//img[@alt="Edit Task"]
    Input Text    //label[text()="*Description:"]/..//textarea    ${new_description}
    Input Text    //label[text()="Estimate:"]/..//input    ${estimate}
    Input Text    //label[text()="Notes:"]/..//textarea    ${notes}
    Click Button    //button[text()="Submit"]

Delete Task Card
    [Arguments]    ${description}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${description}"]/../..//img[@alt="Delete Task"]
    Click Button    //button[text()="Submit"]

Edit Story Card
    [Arguments]    ${original_description}    ${new_description}    ${estimate}    ${importance}    ${notes}    @{tags}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${original_description}"]/../..//img[@alt="Edit Backlog Item"]
    Input Text    //label[text()="*Description:"]/..//textarea    ${new_description}
    Input Text    //label[text()="Estimate:"]/..//input    ${estimate}
    Input Text    //label[text()="Importance:"]/..//input    ${importance}
    Input Text    //label[text()="Notes:"]/..//textarea    ${notes}
    Assign Tags    @{tags}
    Click Button    //button[text()="Submit"]

Delete Story Card
    [Arguments]    ${description}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${description}"]/../..//img[@alt="Delete Backlog Item"]
    Click Button    //button[text()="Submit"]

Upload Attach File
    [Arguments]    ${description}    ${file_path}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //td[text()="${description}"]/../..//img[@alt="Upload Attach File"]
    Choose File    //label[text()="*Attach File:"]/..//input    ${file_path}
    Click Button    //button[text()="Submit"]

Remove Attach File From Story Card
    [Arguments]    ${order_id}    ${file_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //h5[text()="Story #" and text()="${order_id}"]/../../../../../../../..//button[text()="${file_name}"]/../..//img[@alt="Delete Attach File"]
    Click Button    //button[text()="Submit"]

Remove Attach File From Task Card
    [Arguments]    ${order_id}    ${file_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Element    //h5[text()="Task #" and text()="${order_id}"]/../../../../../../../..//button[text()="${file_name}"]/../..//img[@alt="Delete Attach File"]
    Click Button    //button[text()="Submit"]

Check Data In Story Card
    [Arguments]    ${order_id}    ${data}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain Element    //h5[text()="Story #" and text()="${order_id}"]/../../../../../../..//td[text()="${data}"]

Check Data In Task Card
    [Arguments]    ${order_id}    ${data}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain Element    //h5[text()="Task #" and text()="${order_id}"]/../../../../../../..//td[text()="${data}"]

Story Card Should Not Exist With Data
    [Arguments]    ${data}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Not Contain Element    //table[@class="StoryCard_Table"]//td[text()="${data}"]

Task Card Should Not Exist With Data
    [Arguments]    ${data}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Not Contain Element    //table[@class="TaskCard_Table"]//td[text()="${data}"]

Check Tags In Story Card
    [Arguments]    ${order_id}    @{tags}
    FOR    ${tag}    IN    @{tags}
        Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain Element    //h5[text()="Story #" and text()="${order_id}"]/../../../../../../..//span/h5[text()='${tag}']
    END

Check Tags Not In Story Card
    [Arguments]    ${order_id}    @{tags}
    FOR    ${tag}    IN    @{tags}
        Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Not Contain Element    //h5[text()="Story #" and text()="${order_id}"]/../../../../../../..//span/h5[text()='${tag}']
    END

Check Attach File In Story Card
    [Arguments]    ${order_id}    ${file_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain Element    //h5[text()="Story #" and text()="${order_id}"]/../../../../../../../..//button[text()="${file_name}"]

Check Attach File Not In Story Card
    [Arguments]    ${order_id}    ${file_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Not Contain Element    //h5[text()="Story #" and text()="${order_id}"]/../../../../../../../..//button[text()="${file_name}"]

Check Attach File In Task Card
    [Arguments]    ${order_id}    ${file_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Contain Element    //h5[text()="Task #" and text()="${order_id}"]/../../../../../../../..//button[text()="${file_name}"]

Check Attach File Not In Task Card
    [Arguments]    ${order_id}    ${file_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Page Should Not Contain Element    //h5[text()="Task #" and text()="${order_id}"]/../../../../../../../..//button[text()="${file_name}"]

Show Sprint Information
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Sprint Information"]
