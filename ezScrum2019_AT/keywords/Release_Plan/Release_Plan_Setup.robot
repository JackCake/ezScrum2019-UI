*** Settings ***
Resource          ../Common_Resource.robot
Resource          ../Global_Define.robot

*** Keywords ***
Add Release Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Release Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    release_service    releases
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Release With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Release With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    release_service    releases
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Overlap Release Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    release_service    releases
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Overlap Release Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    release_service    releases
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Release With Start Date After End Date Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    release_service    releases
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Delete Release Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    release_service    releases
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Search Release Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    release_service    releases
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Schedule Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    release_service    releases
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Unschedule Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    release_service    releases
    Import SQL File Into Database    release_service    scheduled_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Backlog Item Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    release_service    releases
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    release_service    releases
    Import SQL File Into Database    release_service    scheduled_backlog_items
    Import SQL File Into Database    tag_service    tags
    Import SQL File Into Database    tag_service    assigned_tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Backlog Item With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    release_service    releases
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Backlog Item With No Required Data Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    release_service    releases
    Import SQL File Into Database    release_service    scheduled_backlog_items
    Import SQL File Into Database    tag_service    tags
    Import SQL File Into Database    tag_service    assigned_tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Delete Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    release_service    releases
    Import SQL File Into Database    release_service    scheduled_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Search Scheduled Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    release_service    releases
    Import SQL File Into Database    release_service    scheduled_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Search Not Yet Scheduled Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    release_service    releases
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Show Release Information Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    release_service    releases
    Import SQL File Into Database    release_service    scheduled_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Operate Release Plan With Overdue Release Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    release_service    overdue_releases
    Import SQL File Into Database    release_service    scheduled_backlog_items
    Turn On ezScrum2019
    Go Into Product    ${product_name}
