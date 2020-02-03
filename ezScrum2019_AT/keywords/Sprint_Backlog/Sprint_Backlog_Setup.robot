*** Settings ***
Resource          ../Common_Resource.robot
Resource          ../Global_Define.robot

*** Keywords ***
Add Backlog Item Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Import SQL File Into Database    tag_service    tags
    Import SQL File Into Database    tag_service    assigned_tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Backlog Item With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Backlog Item With No Required Data Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Import SQL File Into Database    tag_service    tags
    Import SQL File Into Database    tag_service    assigned_tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Delete Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Commit Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Drop Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Search Not Yet Committed Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Task Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Task Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Import SQL File Into Database    task_service    tasks
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Task With No Required Data Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Task With No Required Data Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Import SQL File Into Database    task_service    tasks
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Delete Task Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Import SQL File Into Database    task_service    tasks
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Show Backlog Item History Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Show Task History Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Upload And Remove Backlog Item Attach File Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Upload And Remove Task Attach File Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Import SQL File Into Database    task_service    tasks
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Upload Backlog Item Attach File With No File Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Upload Task Attach File With No File Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Import SQL File Into Database    task_service    tasks
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Show Sprint Information Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Operate Sprint Backlog With Overdue Sprint Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    sprint_service    overdue_sprints
    Import SQL File Into Database    sprint_service    committed_backlog_items
    Import SQL File Into Database    task_service    tasks
    Turn On ezScrum2019
    Go Into Product    ${product_name}
