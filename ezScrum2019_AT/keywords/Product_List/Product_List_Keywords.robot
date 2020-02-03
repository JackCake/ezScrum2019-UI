*** Settings ***
Library           ../lib/Selenium2Improved.py
Resource          ../Common_Resource.robot

*** Keywords ***
Add Product
    [Arguments]    ${product_name}
    Wait Until Keyword Succeeds    ${retry_time}    ${retry_interval}    Click Button    //button[text()="Add Product"]
    Input Text    //label[text()="*Name:"]/..//input    ${product_name}
    Click Button    //button[text()="Submit"]

Edit Product
    [Arguments]    ${original_product_name}    ${new_product_name}
    Select Data In Table    ${original_product_name}
    Click Button    //button[text()="Edit Product"]
    Input Text    //label[text()="*Name:"]/..//input    ${new_product_name}
    Click Button    //button[text()="Submit"]

Delete Product
    [Arguments]    ${product_name}
    Select Data In Table    ${product_name}
    Click Button    //button[text()="Delete Product"]
    Click Button    //button[text()="Submit"]
