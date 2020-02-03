*** Settings ***
Resource          ../Global_Define.robot
Resource          ../Common_Resource.robot

*** Keywords ***
Add Product Setup
    Turn On ezScrum2019

Edit Product Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019

Add Product With No Required Data Setup
    Turn On ezScrum2019

Edit Product With No Required Data Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019

Add Duplicate Product Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019

Edit Duplicate Product Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019

Delete Product Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019

Search Product Setup
    Import SQL File Into Database    kanban    products
    Turn On ezScrum2019
