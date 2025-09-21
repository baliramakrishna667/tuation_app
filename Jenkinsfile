pipeline {
    agent any

    tools {
        maven 'Maven 3.8'   // Name of Maven tool configured in Jenkins
        nodejs 'NodeJS 18'  // Optional, if frontend uses Node.js
    }
     environment {
        SONARQUBE_SERVER = 'SonarQube' // Name of your SonarQube server configured in Jenkins
        SONAR_PROJECT_KEY = 'tuation_app' // Unique project key in SonarQube
        SONAR_HOST_URL = 'http://172.31.20.48:9000' // SonarQube server URL
        SONAR_LOGIN = credentials('sonar-token') // Jenkins credential for SonarQube token
    }

    stages {
        
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:baliramakrishna667/tuation_app.git'
            }
        }
       stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        stage('UNIT TEST'){
            steps {
                dir('backend') {
                   sh 'mvn test'
                }
            }
        }
        stage('INTEGRATION TEST'){
            steps {
                dir('backend') {
                   sh 'mvn verify -DskipUnitTests'
                }
                
            }
        }
        stage ("code analysis with checklist") {
            steps {
                dir('backend') {
                   sh 'mvn checkstyle:checkstyle'
                }
                
            }
            post {
                success {
                    echo "Generated analysis result"
                }
            }
        }
        stage('Code Analysis with SonarQube') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('SonarQube') { // Must match SONARQUBE_SERVER name
                        sh "mvn sonar:sonar \
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                            -Dsonar.host.url=${SONAR_HOST_URL} \
                            -Dsonar.login=${SONAR_LOGIN}"
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        

    }
}
