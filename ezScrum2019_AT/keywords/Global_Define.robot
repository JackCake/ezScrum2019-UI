*** Variables ***
${url}            http://localhost:3000/
${browser}        googlechrome
${selenium_speed}    0.5
${database_url}    127.0.0.1
${database_account}    root
${database_password}    root
@{database_names}    kanban    backlog_item_attach_file_service    backlog_item_importance_service    release_service    sprint_service    task_service    tag_service
${retry_time}     30s
${retry_interval}    3s
${product_name}    ezKanban
