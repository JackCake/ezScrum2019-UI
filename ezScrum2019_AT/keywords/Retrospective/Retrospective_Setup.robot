*** Settings ***
Resource          ../Common_Resource.robot
Resource          ../Global_Define.robot

*** Keywords ***
Edit Retrospective Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Search Retrospective Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}
