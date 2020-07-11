pipeline {
  agent any
  stages {
    stage('git clone') {
      steps {
        git(url: 'https://github.com/ERP-Dev-Team/ERPAngularWeb.git', branch: 'master')
      }
    }

    stage('intall dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('deploy') {
      steps {
        bat 'npm host'
      }
    }

  }
}