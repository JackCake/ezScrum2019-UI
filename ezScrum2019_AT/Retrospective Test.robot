*** Settings ***
Library           keywords/lib/Selenium2Improved.py
Resource          keywords/Common_Resource.robot
Resource          keywords/Retrospective/Retrospective_Keywords.robot
Resource          keywords/Retrospective/Retrospective_Setup.robot

*** Variables ***
${retrospective}    The good thing is we can create the backlog item in the product backlog.

*** Test Cases ***
Edit Retrospective Test
    [Setup]    Edit Retrospective Setup
    Select Page    Retrospective
    ${sprint_order_id}=    Set Variable    2
    Edit Retrospective    ${retrospective}    ${sprint_order_id}
    Check Data In Table    ${retrospective}
    [Teardown]    Exit ezScrum2019

Search Retrospective
    [Setup]    Search Retrospective Setup
    ${searched_retrospective_sentence}=    Set Variable    The difficult thing is the design about the user interface!
    ${searched_retrospective_td}=    Set Variable    //td[contains(text(), "${searched_retrospective_sentence}")]
    ${sprint_order_id}=    Set Variable    1
    ${other_sprint_order_id}=    Set Variable    2
    Select Page    Retrospective
    Search    Retrospective Discussion    ${searched_retrospective_sentence}
    Check Data In Table    ${sprint_order_id}
    Check Data Not In Table    ${other_sprint_order_id}
    Page Should Contain Element    ${searched_retrospective_td}
    Clear Search Input Text    Retrospective Discussion
    Check Data In Table    ${sprint_order_id}
    Check Data In Table    ${other_sprint_order_id}
    Page Should Contain Element    ${searched_retrospective_td}
    [Teardown]    Exit ezScrum2019
