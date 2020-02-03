*** Settings ***
Resource          ../Common_Resource.robot
Resource          ../Global_Define.robot

*** Keywords ***
Add Sprint Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Sprint Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Sprint With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Sprint With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Overlap Sprint Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Overlap Sprint Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Delete Sprint Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Search Sprint Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Operate Sprint Plan With Overdue Sprint Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    overdue_sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}
