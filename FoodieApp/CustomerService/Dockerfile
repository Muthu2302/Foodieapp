FROM openjdk
WORKDIR usr/lib
ADD ./target/CustomerService-0.0.1-SNAPSHOT.jar /usr/lib/CustomerService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","CustomerService-0.0.1-SNAPSHOT.jar"]