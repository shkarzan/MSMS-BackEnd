# Add this to your application.properties

spring.application.name=MedicalStoreManagementSystem
spring.jpa.hibernate.ddl-auto = update
spring.datasource.url = jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username = your_database_username
spring.datasource.password = your_database_pass
spring.datasource.driver-class-name = com.mysql.cj.jdbc.Driver
# For Gmail
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username= your_gmail
spring.mail.password= your_gmail_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.ssl.trust=smtp.gmail.com
# For Multipart File
spring.servlet.multipart.max-file-size = 15MB or Anysize as per your chocie
spring.servlet.multipart.max-request-size = 15MB or Anysize as per your chocie
spring.web.resources.static-locations=classpath:/static/
spring.mvc.pathmatch.matching-strategy=ant_path_matcher