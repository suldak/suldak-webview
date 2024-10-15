pipeline {
    agent any

    environment {
        PATH = "C:\\Windows\\System32;%PATH%;C:\\Program Files\\nodejs;C:\\Users\\cms\\AppData\\Roaming\\npm\\node_modules\\yarn\\bin"
        BUILD_FILE_PATH = "C:\\suldak\\web"
    }

    stages {
        // 필요 없나....
        // stage('Install') {
        //     steps {
        //         script {
        //             bat "npm install -g yarn"
        //             bat "yarn install"
        //         }
        //     }
        // }
        stage('Build') {
            steps {
                script {
                    bat 'yarn build'
                }
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