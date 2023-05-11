pipeline {
  agent any
  stages {
    stage('Build') {
        dir 'reto-3'
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Test') {
        dir 'reto-3'
      steps {
        sh 'npm test'
      }
    }
    stage('Quality PEP8 Test') {
      dir 'reto-3'
      steps {
        sh 'pip install flake8'
        sh 'flake8 reto-3'
      }
    }
    stage('Deploy') {
        dir 'reto-3'
      steps {
        sh './deploy.sh'
      }
    }
    stage('Docker Build') {
      dir 'reto-3'
      steps {
        script {
          sh 'docker build -t digitalnao .'
        }
      }
    }
  }
}