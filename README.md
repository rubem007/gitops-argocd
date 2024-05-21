GitOps na prática: CI-CD com Github Actions e ArgoCD

Nesse projeto mostraremos como implementar o ArgoCD para Continuos Delivery do nosso K8s

Requisitos:
Criar conta no docker hub
Ter o docker Desktop instalado https://www.docker.com/products/docker-desktop/
Ter o Kind instalado https://kind.sigs.k8s.io/docs/user/quick-start/
Ter o Kubectl instalado https://kubernetes.io/docs/tasks/tools/ 
Ter nodejs instalado https://nodejs.org/en/download/package-manager

1 - Configurar o Workflows (A pipeline)
 Como adicionar secret no repositorio?
  1 - Dentro do repositório, clique em Settings
  2 - No menu que esta no lado esquerdo, clique em Secrets and Variables, e depois clique em Actions
  3 - Clique em New repository secret
    - Name: Nome do secret
    - Secret: Insira o seu username do docker hub
  4 - Clique em add secret, para salvar

 Como criar token no Docker Hub
 1 - Acesse o Docker Hub  https://hub.docker.com/
 2 - Clique em My Account
 3 - Clique em Security
 4 - Clique em  New Access Token
 5 - Escolha um nome para o seu access token
 6 - Clique em Copy and Close


