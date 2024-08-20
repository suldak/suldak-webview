pipeline {
    agent any

    environment {
        PATH = "%PATH%"
        BUILD_FILE_PATH = "C:\\suldak\\web"
    }

    stages {
        stage('Install') {
            sh "npm install -g yarn"
            sh "yarn install"
        }
        stage('Build') {
            steps {
                bat 'yarn build'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    def buildFilePath = "${WORKSPACE}\\build"
                    bat "xcopy /s /e /y ${buildFilePath}\\* ${BUILD_FILE_PATH}"
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}