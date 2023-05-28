#!/bin/bash

# 2. Autenticación en AWS ECR
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin digitalnao

# 3. Crear el repositorio de AWS ECR para almacenar las imágenes
aws ecr create-repository --repository-name reto-3

# 4. Subir las imágenes de Docker a AWS ECR
docker tag lambda1-image digitalnao/reto-3:lambda1
docker push digitalnao/reto-3:lambda1
# ... subir imágenes para cada Lambda

# 5. Crear y desplegar el stack de AWS CloudFormation utilizando AWS SAM
sam build
sam deploy --stack-name radionet-stack --region us-east-2 --capabilities CAPABILITY_IAM