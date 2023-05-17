pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        dir 'reto-3/site'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        dir 'reto-3/site'
        sh 'npm test'
      }
    }
    stage('Quality PEP8 Test') {
      steps {
        dir 'reto-3/site'
        sh 'pip install flake8'
        sh 'flake8 reto-3/site'
      }
    }
    stage('Deploy') {
      steps {
        dir 'reto-3/site'
        sh './deploy.sh'
      }
    }
    stage('Docker Build') {
      steps {
        dir 'reto-3/site'
        script {
          sh 'docker build -t digitalnao .'
        }
      }
    }
  }
}