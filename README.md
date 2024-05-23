<h1> GitOps na prática: CI-CD com Github Actions e ArgoCD </h1>

<h6> Don't speak portuguese? <a href="https://github.com/rubem007/observability/blob/main/log/README.md"> Click here </a> to view this page in English. </h6>

> Status do Projeto: Concluído :heavy_check_mark:

## Descrição do Projeto
<p align="justify">
Nesse projeto mostraremos como implementar o ArgoCD para Continuos Delivery do nosso K8s
</p>

## Pré-requisitos
:warning: Criar conta no docker hub (https://hub.docker.com/) <br>
:warning: Instalar o docker Desktop (https://www.docker.com/products/docker-desktop/) <br>
:warning: Instalar o Kind (https://kind.sigs.k8s.io/docs/user/quick-start/) <br>
:warning: Instalar o Kubectl (https://kubernetes.io/docs/tasks/tools/) <br>
:warning: Instalar o Kustomize (https://kubectl.docs.kubernetes.io/installation/kustomize/) <br>
:warning: Instalar o nodejs (https://nodejs.org/en/download/package-manager)

## Implementando o projeto
1 - Faça fork do projeto

2 - Adicione as Variáveis de Ambiente (DOCKERHUB_USERNAME e DOCKERHUB_TOKEN) <br>
 Eis o passo a passo para adicionar as Variáveis de Ambiente: <br>
  1 - Dentro do repositório, clique em Settings <br>
  2 - No menu que esta no lado esquerdo, clique em Secrets and Variables, e depois clique em Actions <br>
  3 - Clique em New repository secret
  - Name: `DOCKERHUB_USERNAME`
  - Secret: Insira o username do seu docker hub
  
4 - Clique em add secret, para salvar

Caso não saiba como gerar o token do docker hub, siga este passo a passo: <br>
 1 - Acesse o Docker Hub  (https://hub.docker.com/) <br>
 2 - Clique em My Account <br>
 3 - Clique em Security <br>
 4 - Clique em  New Access Token <br>
 5 - Escolha um nome para o seu access token <br>
 6 - Clique em Copy and Close

Habilite o GITHUB_TOKEN seguindo este passo a passo: <br>
1 - Dentro do repositório, clique em Settings <br>
2 - No menu que esta no lado esquerdo, clique em Actions, e depois clique em General <br>
3 - Escolha a opção Read and write permissions em Workflow Permissions <br>
4 - Clique em Save

3 - Criar o cluster no docker <br>
Para criar o cluster no docker, execute os seguintes comandos no CMD:
```
 kind create cluster
```
 Após a criação do cluster, execute o seguinte comando
 ```
 kubectl cluster-info --context kind-kind
```

### Configurando o ArgoCD
1 - Instalar o ArgoCD no K8s

Execute os seguintes comandos no CMD:
```
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Para verificar se os Pods foram inicializados, execute o seguinte comando
```
kubectl get pods -n argocd
```
Os Pods devem estar com o `STATUS=Running`. Caso  contrário é porque ainda estão a inicializar

2 - Recuperar a senha (No powershell) <br>
No Windows, abra o powershell e execute o seguinte comando:
```
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | 
ForEach-Object { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) };
```

ATT: copie esta senha para usá-la no momento do Login

3 - Acessando o ArgoCD <br>
Para acessar o ArgoCD, habilite antes o port forward executando o seguinte comando no CMD:
```
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

4 - Login <br>
Acesse a seguinte url para fazer Login no ArgoCD
- Url: `http://localhost:8080`
- Username: `admin`
- Password: insira a senha do ponto 2.

#### Criar App via UI
Para criar a sua app, siga os seguintes passos:
 - Abra o navegador e faça login usando as credenciais definidas do ponto 4. <br> 
  1 - Clique no botão **+ New App**, conforme mostrado abaixo: <br>
    ![ArgoCD](https://github.com/rubem007/gitops-argocd/blob/main/images/1.webp "ArgoCD")

 - Insira um nome (sem espaço) no campo **Application Name**
 - No campo **Project** deixe como default
 - Escolha Manual no campo **SYNC POLICY** 
    ![ArgoCD](https://github.com/rubem007/gitops-argocd/blob/main/images/2.png "ArgoCD")
  
 2 - Conecte a url do repositório https://github.com/rubem007/gitops-argocd
  - Insira a url do repositorio no campo **Repository URL** https://github.com/rubem007/gitops-argocd
  - Selecione k8s no campo **Path** <br>
  ![ArgoCD](https://github.com/rubem007/gitops-argocd/blob/main/images/3.png "ArgoCD")

   3 - DESTINATION <br>
   - Selecione https://kubernetes.default.svc no campo **Cluster URL**
   - Insira default no campo **Namespace** <br>
    ![ArgoCD](https://github.com/rubem007/gitops-argocd/blob/main/images/4.png "ArgoCD")
  
  Como estamos a usar o Kustomize, automaticamente ele mostrará a imagem actual, como mostrado na imagem abaixo <br>
    ![ArgoCD](https://github.com/rubem007/gitops-argocd/blob/main/images/5.png "ArgoCD")
  
  Clique em CREATE para criar a App

Após a criação aparecerá um card, como mostrado abaixo <br>
  ![ArgoCD](https://github.com/rubem007/gitops-argocd/blob/main/images/6.png "ArgoCD")

Na imagem acima, repare que o status está `outOfSync`, isso significa que há uma divergência entre o que está atualmente implementado no k8s e o que deveria estar no repositório. <br>
Para que esteja tudo sincronizado, basta clicar no botão `SYNC` que encontra-se no card. Após está operação o status vai mudar para `Synced`, como mostrado na imagem abaixo <br>
  ![ArgoCD](https://github.com/rubem007/gitops-argocd/blob/main/images/7.png "ArgoCD")

2 - Rodando a App <br>
Para rodar a app execute o seguinte comando
```
kubectl port-forward service/app-express-service 3000:3000
```

Abra o navegador e insira a seguinte URL
http:localhost:3000

## Referências
<a href="https://argo-cd.readthedocs.io/en/stable/" target="_blank">Documentação Oficial do ArgoCD</a><br>
<a href="https://opengitops.dev/" target="_blank">Princípios de GipOps</a><br>
<a href="https://fullcycle.com.br/" target="_blank">Plataforma Oficial da Full Cycle</a><br>


## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) e propor melhorias para o projeto.

## Licença
The [MIT License]() (MIT)

Copyright :copyright: 2024 - Projeto de GitOps ArgoCD
