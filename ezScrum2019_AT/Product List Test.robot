*** Settings ***
Library           keywords/lib/Selenium2Improved.py
Resource          keywords/Product_List/Product_List_Setup.robot
Resource          keywords/Product_List/Product_List_Keywords.robot

*** Variables ***
${product_name}    ezKanban

*** Test Cases ***
Add Product Test
    [Setup]    Add Product Setup
    Add Product    ${product_name}
    Check Data In Table    ${product_name}
    [Teardown]    Exit ezScrum2019

Edit Product Test
    [Setup]    Edit Product Setup
    ${new_product_name}=    Set Variable    ezScrum2019
    Edit Product    ${product_name}    ${new_product_name}
    Check Data In Table    ${new_product_name}
    [Teardown]    Exit ezScrum2019

Add Product With No Required Data Test
    [Setup]    Add Product With No Required Data Setup
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Product"]
    Click Button    //button[text()="Submit"]
    Alert Should Be Present    The name is required.
    [Teardown]    Exit ezScrum2019

Edit Product With No Required Data Test
    [Setup]    Edit Product With No Required Data Setup
    Select Data In Table    ${product_name}
    Click Button    //button[text()="Edit Product"]
    Check Input Text Is Required When Edit Data    //label[text()="*Name:"]/..//input    The name is required.
    [Teardown]    Exit ezScrum2019

Add Duplicate Product Test
    [Setup]    Add Duplicate Product Setup
    Add Product    ${product_name}
    Alert Should Be Present    There is the same name of the product.
    [Teardown]    Exit ezScrum2019

Edit Duplicate Product Test
    [Setup]    Edit Duplicate Product Setup
    ${new_product_name}=    Set Variable    Front-End
    Edit Product    ${product_name}    ${new_product_name}
    Alert Should Be Present    There is the same name of the product.
    [Teardown]    Exit ezScrum2019

Delete Product Test
    [Setup]    Delete Product Setup
    Delete Product    ${product_name}
    Check Data Not In Table    ${product_name}
    [Teardown]    Exit ezScrum2019

Search Product Test
    [Setup]    Search Product Setup
    ${other_product_name}=    Set Variable    Front-End
    Search    Name    ${product_name}
    Check Data In Table    ${product_name}
    Check Data Not In Table    ${other_product_name}
    Clear Search Input Text    Name
    Check Data In Table    ${product_name}
    Check Data In Table    ${other_product_name}
    [Teardown]    Exit ezScrum2019

*** Keywords ***
