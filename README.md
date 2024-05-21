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

Como habilitar o GITHUB_TOKEN?
  1 - Dentro do repositório, clique em Settings
  2 - No menu que esta no lado esquerdo, clique em Actions, e depois clique em General
  3 - Escolha a opção Read and write permissions em Workflow Permissions
  4 - Clique em Save
2 

3 - Criar o Kind no docker
Para criar o kind no docker, execute os seguintes comandos no CMD:
 kind create cluster
 Apos a criação rode o seguinte comando
 kubectl cluster-info --context kind-kind

4 - Instalar o ArgoCD

1 - Rode o seguinte comando
  kubectl create namespace argocd
  kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

- Recuperar a senha (No powershell)
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | 
    ForEach-Object { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) };

