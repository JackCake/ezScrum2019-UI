*** Settings ***
Resource          ../Common_Resource.robot
Resource          ../Global_Define.robot

*** Variables ***

*** Keywords ***
Add Backlog Item Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    tag_service    tags
    Import SQL File Into Database    tag_service    assigned_tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Backlog Item With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Backlog Item With No Required Data Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    tag_service    tags
    Import SQL File Into Database    tag_service    assigned_tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Delete Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Search Backlog Item Setup
    Import SQL File Into Database    kanban    product_backlog_items
    Import SQL File Into Database    backlog_item_importance_service    backlog_item_importances
    Import SQL File Into Database    tag_service    tags
    Import SQL File Into Database    tag_service    assigned_tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Tag Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Tag Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Tag With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Tag With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Add Duplicate Tag Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Edit Duplicate Tag Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Delete Tag Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}

Search Tag Setup
    Import SQL File Into Database    kanban    products
    Import SQL File Into Database    tag_service    tags
    Turn On ezScrum2019
    Go Into Product    ${product_name}
