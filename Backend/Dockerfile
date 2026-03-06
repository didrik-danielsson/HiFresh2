# Multi-stage build for Spring Boot backend
FROM maven:3.9-eclipse-temurin-23-alpine AS build

WORKDIR /app

# Copy pom files
COPY pom.xml .
COPY shared/pom.xml shared/
COPY server/pom.xml server/

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY shared/src shared/src
COPY server/src server/src

# Build the application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:23-jre-alpine

WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/server/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
