GitOps na prática: CI-CD com Github Actions e ArgoCD

Nesse projeto mostraremos como implementar o ArgoCD para Continuos Delivery do nosso K8s

Requisitos:
Criar conta no docker hub
Ter o docker Desktop instalado https://www.docker.com/products/docker-desktop/
Ter o Kind instalado https://kind.sigs.k8s.io/docs/user/quick-start/
Ter o Kubectl instalado https://kubernetes.io/docs/tasks/tools/ 
Ter o Kustomize instalado https://kubectl.docs.kubernetes.io/installation/kustomize/
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

2 - Configurar os manifestos do k8s


3 - Criar o Kind no docker
Para criar o kind no docker, execute os seguintes comandos no CMD:
 kind create cluster
 Apos a criação rode o seguinte comando
 kubectl cluster-info --context kind-kind

4 - Instalar o ArgoCD no K8s
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

Para verificar se os Pods foram inicializados, rode o seguinte comando
  kubectl get pods -n  argocd
Os Pods devem estar com o STATUS=Running. Caso  contrário é porque ainda estão a inicializar.

2 - Recuperar a senha (No powershell)
No Windows, abra o powershell e execute o seguinte comando:
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | 
    ForEach-Object { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) };
ATT: copie esta senha para usa-la no momento do Login

3 - No CMD insira o seguinte comando para teres acesso a UI do ArgoCD
 kubectl port-forward svc/argocd-server -n argocd 8080:443

4 - Acesse a seguinte url para fazer Login no ArgoCD
 localhost:8080
 Username: admin
 Password: insira a senha do ponto 2.

Creating Apps Via UI
5 - Criando a App
 1 - Abra o navegador e faça login usando as credenciais definidas do ponto 4.
 2 - Clique no botão + New App, conform mostrado abaixo:
    imagem
 3 - Insira um nome (sem espaço) no campo Application Name, no campo Project deixe como default e SYNC POLICY Manual
    imagem
 4 - Conecte a url do repositório https://github.com/rubem007/gitops-argocd
   Insira a url do respositorio no campo Repository URL https://github.com/rubem007/gitops-argocd
   Selecione k8s no campo Path 
   DESTINATION
   Selecione https://kubernetes.default.svc no campo Cluster URL
   Insira default no campo Namespace
    Imagem
  
  Como estamos a usar o Kustomize, automaticamente ele mostrará a images actual
    imagem
  
  Clique em CREATE para criar a App

  Após a criação aparecerá ..., como mostrado abaixo
  imagem 6

Na imagem acima, repare que o status está outOfSync, isso quer dizer que o argo CD não pegou a actualização atual da aplicação.
existem novas alterações que foram feitas no repositório git, mas ainda não foram aplicadas no k8s.
há uma divergência entre o que está atualmente implementado no k8s e o que deveria estar no repositório

Para que esteja tudo sincronizado, basta clicar no botão SYNC que encontra-se no card
Após está operação o status vai mudar para Synced

Referencias
https://argo-cd.readthedocs.io/en/stable/
https://opengitops.dev/
