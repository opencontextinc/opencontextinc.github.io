---
sidebar_position: 3
---

# Install OpenContext on Kubernetes (Self Hosted Only)

OpenContext can be self hosted on a Kubernetes cluster using the OpenContext Helm chart.

## Prerequisites

- Kubernetes 1.21+
- Helm3 installed -- See the [Installing Helm docs](https://helm.sh/docs/intro/install) for more information.
- imagePullSecret -- Please contact sales@opencontext.com to create this if you don't already have a registry key.
- [GitHub credentials](../configuration/github-credentials) -- Decide whether to use a token or a GitHub app credential. If you're working with multiple organizations, then it's preferable to use a token.

## Quick start

### Namespace

It is highly recommended for you to create a namespace for OpenContext. In this document we will use the `opencontext` namespace.

```shell
kubectl create namespace opencontext
```

### Image Pull Secret

The OpenContext Helm chart uses a private Docker registry. In order to pull the image from this Docker registry, you'll need a key for the registry. This can be obtained from sales@opencontext.com if you don't already have one.

Once you have a key, run the following command to create an `imagePullSecret` called `opencontext-artifact-registry`:

```shell
kubectl create secret docker-registry opencontext-artifact-registry \
--docker-server=https://us-docker.pkg.dev \
--docker-email=sa-opencontext-registry@vpc-host-prod-345521.iam.gserviceaccount.com \
--docker-username=_json_key --docker-password="$(cat $PATH_TO_REGISTRY_JSON_KEY)" \
--namespace opencontext
```

### Add the OpenContext Helm repository

```shell
helm repo add opencontext https://helm.opencontext.com
helm repo update
```

### Installing the OpenContext chart

To install the chart in the `opencontext` namespace with the release name `<RELEASE_NAME>`, GitHub token `<GH_TOKEN>`, GitHub org `<GH_ORG>`, and org name `<YOUR_ORG>` run:

```shell
helm install  --namespace opencontext --name-template=<RELEASE_NAME> \
  --set "app.orgName=<YOUR_ORG>" \
  --set app.github.token=<GH_TOKEN> \
  --set "app.catalog.locations.githubOrg[0]=https://github.com/<GH_ORG>" \
  --set "app.catalog.locations.githubDiscovery[0]=https://github.com/<GH_ORG>" \
  opencontext/opencontext
```

After installing the chart follow the instructions to port-forward the OpenContext service. Then visit http://localhost:8080 in your browser to use the application.

### Uninstalling OpenContext

To uninstall the OpenContext `<RELEASE_NAME>` release from the namespace `opencontext`:

```shell
NAMESPACE=opencontext
RELEASE_NAME=<release-name> # use `helm list` to find out the name
helm uninstall --namespace ${NAMESPACE} ${RELEASE_NAME}
kubectl --namespace ${NAMESPACE} delete secret opencontext-github-app-auth opencontext-google-cloud-storage opencontext-postgresql opencontext-postgresql-certs opencontext-postgresql-initdb opencontext-tls ${RELEASE_NAME}-opencontext-auth
kubectl --namespace ${NAMESPACE} delete configmap ${RELEASE_NAME}-opencontext-db-pool ${RELEASE_NAME}-opencontext-locations ${RELEASE_NAME}-opencontext-postgres-ca ${RELEASE_NAME}-opencontext-config
kubectl --namespace ${NAMESPACE} delete pvc data-${RELEASE_NAME}-opencontext-postgresql-0
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Configuration

As a best practice, a YAML file that specifies the values for the chart parameters should be used to configure the chart. Any parameters not specified in this file will default to those set in [values.yaml](https://github.com/opencontextinc/opencontext-helm/blob/main/charts/opencontext/values.yaml) file. To install the chart in the `opencontext` namespace with the release name `<RELEASE_NAME>`, GitHub token `<GH_TOKEN>`, GitHub org `<GH_ORG>`, and org name `<YOUR_ORG>` do the following:

1. Create an empty `opencontext-values.yaml` file.
2. Set the following parameters in your `opencontext-values.yaml` file.

```yaml
app:
  orgName: <YOUR_ORG>
  github:
    authType: token
    token: <GH_TOKEN>
  catalog:
    locations:
      githubOrg:
        - https://github.com/<GH_ORG>
      githubDiscovery:
        - https://github.com/<GH_ORG>
```

3. Install or upgrade the OpenContext Helm chart with the new `opencontext-values.yaml` file:

```shell
helm install --namespace opencontext --name-template=<RELEASE_NAME>
  -f opencontext-values.yaml opencontext/opencontext
```

OR

```shell
helm upgrade --namespace opencontext --name-template=<RELEASE_NAME>
  -f opencontext-values.yaml opencontext/opencontext
```

See the [All configuration options](https://github.com/opencontextinc/opencontext-helm/blob/main/charts/opencontext/README.md#all-configuration-options) section in our chart docs to discover all the possibilities in the OpenContext chart.

### Different namespace

To install the charts on a specific namespace use `--namespace <ns>`:

```shell
helm install --namespace <ns> --name-template=<RELEASE_NAME> \
  -f opencontext_values.yaml opencontext/opencontext.
```

### Ingress

#### Ingress controller

If ingress is enabled in the chart then the associated Ingress controller should already be present on the cluster. We have tested the `ingress-nginx` and `traefik` controller; however, other controllers should also work.

To install the `ingress-nginx` controller run the following:

```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx --create-namespace --namespace nginx-ingress \
  --set rbac.create=true
```

To install the `traefik` controller run the following:

```shell
helm repo add traefik https://helm.traefik.io/traefik
helm repo update
helm install traefik traefik/traefik --create-namespace --namespace traefik
```

#### Example ingress chart values

Nginx without SSL. See the [SSL Certificates](#ssl-certificates) section for an example with SSL:

```yaml
ingress:
  enabled: true
  className: nginx
  hosts:
    - host: opencontext.example.com
      paths:
        - path: /
          pathType: Prefix
```

Traefik without SSL:

```shell
ingress:
  enabled: true
  className: traefik
  hosts:
    - host: opencontext.example.com
      paths:
        - path: /
          pathType: Prefix
```

### SSL Certificates

This chart can install or reuse a `ClusterIssuer` to generate certificates for the OpenContext Ingress. To do this:

1. Install [cert-manager](https://cert-manager.io/docs/) or make sure [cert-manager is installed](https://cert-manager.io/docs/installation/helm/#installing-with-helm) in the cluster.
2. Enable the issuer in the charts. This will check if there is a `letsencrypt` issuer already deployed in your cluster, and deploy one if it doesn't exist.

To enable it, set the `clusterIssuer` in the chart's values to one of the following:

- `selfsigned-issuer`,
- `letsencrypt-staging`, or
- `letsencrypt-prod`.

If the `clusterIssuer` is not set to `selfsigned-issuer`, then a valid email address must also be provided.

```yaml
issuer:
  email: me@example.com
  clusterIssuer: 'letsencrypt-prod'
```

The above example instructs Helm to use the letsencrypt production issuer.

3. Add `cert-manager.io/cluster-issuer` annotation and `tls` section to the ingress values.

For example:

```yaml
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: opencontext.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: opencontext-tls
      hosts:
        - opencontext.example.com
```

### GitHub credentials

Some form of GitHub credentials must be provided. The default credential type is `token`. The permissions required can be found in our docs about [GitHub Credentials](../configuration/github-credentials).

#### Token

To provide a token as the credential, set `app.github.authType` to `token` in the chart's values, and also set `app.github.token`.

For example:

```yaml
app:
  github:
    authType: token
    token: ghp_someverylonggithubtoken
```

#### GitHub application credentials

This integration enables the application to show and import information about your GitHub repositories and teams.

The GitHub application credentials file must follow the format found in our about [GitHub Credentials](../configuration/github-credentials#github-app). To provide a GitHub application credential, set `app.github.authType` to `app` in the chart's values.

If `app.github.appAuth.createAppAuthFromFile` is also set to the PATH of the GitHub app credentials file, then the chart will create a secret called `opencontext-github-app-auth` from the file. Otherwise, create a Kubernetes secret named `opencontext-github-app-auth` by running the following command:

```shell
kubectl create secret generic opencontext-github-app-auth \
--from-file=github-app-auth.yaml=$PATH_TO_GITHUB_APP_AUTH_YAML \
--namespace opencontext
```

The following is an example where you would have to manually create the Kubernetes secret named `opencontext-github-app-auth`:

```yaml
app:
  github:
    authType: app
```

The following is an example where the chart will create the Kubernetes secret named `opencontext-github-app-auth` from the path provided to the chart:

```yaml
app:
  github:
    authType: app
    appAuth:
      createAppAuthFromFile: github-app-auth.yaml
```

### GitLab credentials

This integration enables OpenContext to discover repositories and look for OpenContext YAML file definitions in GitLab.

To enable this integration, you'll need an [access token](../configuration/gitlab-credentials). Then. in your configuration:

- Set `app.gitlab.enabled` to `true`
- Set `app.gitlab.authType` to `token`
- Set `app.gitlab.token`

```yaml
app:
  gitlab:
    enabled: true
    authType: token
    token: MY_TOKEN
```

### Bitbucket

This integration enables the application to discover repositories and look for OpenContext YAML file definitions in Bitbucket Cloud.

To enable this integration, you'll need [access credentials](../configuration/bitbucket-credentials) in the form of an app password or token. Set `app.bitbucket.enabled` to `true` and in your configuration set `app.bitbucket.authType` to `appPassword` or `token` and then set either `app.bitbucket.appAuth` section or `app.bitbucket.token`.

The following is an example where the `authType` is `appPassword`:

```yaml
app:
  bitbucket:
    enabled: true
    authType: appPassword
    appAuth:
      username: USER
      appPassword: PASSWORD
```

The following is an example where the `authType` is `token`:

```yaml
app:
  bitbucket:
    enabled: true
    authType: token
    token: MY_TOKEN
```

### PagerDuty

This integration allows a user to trigger an incident to the currently on-call responder(s) or display relevant PagerDuty information (active incident, on-call responders' profile, recent changes, escalation policy) about an entity.

To enable this integration, you'll need a [PagerDuty API key](../configuration/pagerduty-credentials). Set `app.pagerDuty.enabled` to `true` and `app.pagerDuty.token` to your PagerDuty API token.

The following is an example:

```yaml
app:
  pagerDuty:
    enabled: true
    token: $YOUR_PAGERDUTY_API_TOKEN
```

### Google Cloud Storage (GCS)

This integration enables the application to look for OpenContext YAML file definitions in Google Cloud Storage (GCS). Depending on whether or not you are running OpenContext in Google Cloud (GCP), you may or may not need to provide a [service account key](https://cloud.google.com/iam/docs/keys-create-delete).

If you are running OpenContext in GCP, and the underlying service account has reader access to the bucket location provided, then this integration can be enabled by setting `app.googleCloudStorage.enabled` to `true`.

Otherwise, set `app.googleCloudStorage.enabled` to `true` and `app.googleCloudStorage.useServiceAccount` to `true`.

If `app.googleCloudStorage.createServiceAccountFromFile` is also set to the PATH of the service account file, then the chart will create a secret called `opencontext-google-cloud-storage` from the file.

Otherwise, create a Kubernetes secret named `opencontext-google-cloud-storage` by running the following command:

```shell
kubectl create secret generic opencontext-google-cloud-storage \
--from-file=gcp-sa-credentials.json=$PATH_TO_GCP_SA_CREDENTIALS_JSON \
--namespace opencontext
```

The following is an example where you are running OpenContext in GCP and don't need a service account file:

```yaml
app:
  googleCloudStorage:
    enabled: true
    userServiceAccount: false
```

The following is an example where you would have to manually create the Kubernetes secret named `opencontext-google-cloud-storage`:

```yaml
app:
  googleCloudStorage:
    enabled: true
    userServiceAccount: true
```

The following is an example where the chart will create the Kubernetes secret named `opencontext-google-cloud-storage` from the path provided to the chart:

```yaml
app:
  googleCloudStorage:
    enabled: true
    userServiceAccount: true
    createServiceAccountFromFile: sa-account-for-gcs.json
```

### Auth

This is not enabled by default. In order to use auth in OpenContext, you must configure the application with [SSL](#ssl-certificates) and create a [User YAML](../catalog/catalog-yaml-format/user) for all the users that need to log in to the system.

#### Configure app

Follow the instructions from [Google](https://support.google.com/cloud/answer/6158849?hl=en) on how to set up OAuth 2.0 and note the following:

- OAuth consent screen - User Type -- Typically setting it to `Internal` is enough.
- OAuth client id configuration
  - Authorized JavaScript origins -- Add the HTTPS URL for opencontext. For example, `https://opencontext.example.com`.
  - Authorized redirect URIs -- Add `${URL}/api/auth/google/handler/frame`. For example, `https://opencontext.example.com/api/auth/google/handler/frame`.
  - Remember to save your changes and note the client id and client secret!

To enable this integration set `app.auth.enabled` to `true` and also set `app.auth.provider.google.clientId`, `app.auth.provider.google.clientSecret`, `app.url`, `ingress`, and `issuer` in the chart's values.

For example:

```yaml
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: opencontext.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: opencontext-tls
      hosts:
        - opencontext.example.com

app:
  url: https://opencontext.example.com
  auth:
    enabled: true
    provider:
      google:
        clientId: some-client-id.apps.googleusercontent.com
        clientSecret: some-client-secret
```

#### Create User YAML

All users that need to log in to OpenContext need a [User YAML](../catalog/catalog-yaml-format/user) created for them.

Here's an example for Jax Raccoon at example dot com, with the GitHub username jaxraccoon:

```yaml
apiVersion: opencontext.com/v1alpha1
kind: User
metadata:
  name: jax.raccoon
  annotation:
    google.com/email: jax.raccoon@example.com
    github.com/user-login: jaxraccoon
spec:
  primaryEmail: jax.raccoon@example.com
  profile:
    displayName: Jax Raccoon
    displayEmail: jax.raccoon@example.com
```

After creating the User YAML, make sure to either:

- add it to a GitHub repository, or
- upload it to Google Cloud Storage.

Whichever you choose, that choice becomes the _location_ for the next step: configuring [Catalog Locations](#catalog-locations).

You'll need to make sure to add your chosen location to the list under `githubDiscovery` or `gcsDiscovery` as appropriate.

### Catalog Locations

:::tip Minimally enable githubOrg and githubDiscovery to discover the people, teams, and repositories in GitHub.
:::

Catalog locations must be provided so the application knows where to go for entity discovery. There are four types of locations:

- githubOrg -- This type of location discovers your GitHub organization (teams and people).
- githubDiscovery -- This type of location discovers the various repositories and their metadata.
- url -- This type of location looks at a URL for an [OpenContext YAML file](https://docs.opencontext.com/docs/category/yaml-file-format).
- gcs-discovery -- This type of location looks at Google Cloud Storage for an [OpenContext YAML file](https://docs.opencontext.com/docs/category/yaml-file-format). Note that this must be enabled for this to work.
- bitbucket-discovery -- This type of location discovers the various repositories and looks for an [OpenContext YAML file](https://docs.opencontext.com/docs/category/yaml-file-format). Note that this must be enabled for this to work.

The following is an example of all four types of locations configured:

```yaml
app:
  catalog:
    locations:
      githubOrg:
        # Discover people and teams in GitHub org
        # URL Format: https://github.com/${GITHUB_ORG}
        - https://github.com/scatter-ly
      githubDiscovery:
        # Discover repos, codepath and other assoicated artifacts in a GitHub repo
        # URL Format: https://github.com/${GITHUB_ORG}/${MY_REPO}/
        # NOTE: The trailing slash is required if you are specifying an exact repo name!
        - https://github.com/scatter-ly/publictest/
        # Discover repos, codepath and other associated artifacts in a GitHub repo using
        # glob expression
        # URL Format: https://github.com/${GITHUB_ORG}/c*
        #             https://github.com/${GITHUB_ORG}/*end*
        # Find all repos starting with c
        - https://github.com/scatter-ly/c*
        # Find all repos containg the word end
        - https://github.com/scatter-ly/*end*
        # Discover all OpenContext YAML files in a specific GitHub repo that includes a Location YAML
        # URL Format: https://github.com/${GITHUB_ORG}/${MY_REPO}/blob/${MY_BRANCH}/*.yaml
        - https://github.com/scatter-ly/scatter.ly/blob/main/*.yaml
      url:
        # Discover OpenContext catalog YAML file in a public GitHub repository
        - https://github.com/scatter-ly/publictest/blob/main/oc-catalog.yaml
        # Discover all OpenContext YAML files in a specific BitBucket repo
        # NOTE: Bitbucket must be enabled
        # URL Format: https://bitbucket.org/${WORKSPACE_ID}/${MY_REPO}/src/${MY_BRANCH}/*.yaml
        - https://bitbucket.org/scatter-ly/scatter.ly/src/main/*.yaml
        # Discover all OpenContext YAML files in a specific GitHub repo without a Location YAML
        # URL Format: https://github.com/${GITHUB_ORG}/${MY_REPO}/blob/${MY_BRANCH}/*.yaml
        - https://github.com/scatter-ly/opencontext/blob/main/*.yaml
      gcsDiscovery:
        # Discover all OpenContext YAML files in a Google Cloud Storage bucket
        # URL Format: https://storage.cloud.google.com/${GCS_BUCKET}/${GCS_BUCKET_PATH_TO_YAML}/*
        - https://storage.cloud.google.com/scatterly/yaml/uploads/*
      bitbucketDiscovery:
        # Workspaces should be referenced using the workspace ID and projects should use the
        # project key.
        # Discover all repositories in a workspace
        # URL Format: https://bitbucket.org/workspaces/${WORKSPACE_ID}
        - https://bitbucket.org/workspaces/scatterly
        # Discover all repositories in a project
        # URL Format: https://bitbucket.org/workspaces/${WORKSPACE_ID}/projects/${PROJECT_KEY}
        - https://bitbucket.org/workspaces/scatterly/projects/CRATES
        # Select only a specific repository
        # URL Format: https://bitbucket.org/workspaces/${WORKSPACE_ID}/${MY_REPO}
        - https://bitbucket.org/workspaces/scatterly/crates-frontend
        # Search for OpenContext catalog YAML file in all repositories in a project
        # URL Format: https://bitbucket.org/workspaces/${WORKSPACE_ID}/projects/${PROJECT_KEY}/repos/*?search=true&catalogPath=my/nested/path/catalog.yaml
        - https://bitbucket.org/workspaces/scatterly/projects/CRATES/repos/*?search=true&catalogPath=my/nested/path/catalog.yaml
      gitlabOrg:
        # Discover people and groups in GitLab main group
        # URL Format: https://gitlab.com/${GROUP}
        - https://gitlab.com/scatterly-gl
      gitlabDiscovery:
        # For all projects of $GROUP, discover OpenContext YAML file (oc-catalog.yaml) on main branch
        # URL Format: https://gitlab.com/${GROUP}/blob/${BRANCH}/oc-catalog.yaml
        - https://gitlab.com/scatterly-gl/blob/main/oc-catalog.yaml
        # For project matching $SUBGROUP_GLOB, discover all YAML files on the prod branch
        # URL Format: https://gitlab.com/${GROUP}/${SUBGROUP_GLOB}/blob/${BRANCH}/${FILE_GLOB}
        - https://gitlab.com/scatterly-gl/platform*/blob/prod/*.yaml
```

### Example with all configurations enabled

After choosing a DNS name for where OpenContext will be hosted, and figuring out what integrations you would like to enable, create a YAML file for your custom configuration.

The following is an example `opencontext_values.yaml` file for the following configuration:

- Ingress - nginx
- SSL certificates - Use cert-manager and letsencrypt-prod to generate an SSL certificate.
- GitHub credentials -- token
- GitLab credentials -- token
- Bitbucket -- appPassword
- PagerDuty enabled
- Google Cloud Storage (GCS) enabled and using service account
- Auth enabled
- Catalog locations configured with all four types of locations

1. Create an empty `opencontext-values.yaml` file.
2. Set the following parameters in your `opencontext-values.yaml` file.

```yaml
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: opencontext.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: opencontext-tls
      hosts:
        - opencontext.example.com

issuer:
  email: it@example.com
  clusterIssuer: letsencrypt-prod

app:
  orgName: Example Org
  url: https://opencontext.example.com
  github:
    authType: token
    token: ghp_someverylonggithubtoken
  gitlab:
    enabled: true
    authType: token
    token: gl_someverylonggitlabtoken
  bitbucket:
    enabled: true
    authType: appPassword
    appAuth:
      username: BITBUCKET_USERNAME
      appPassword: BITBUCKET_APP_PASSWORD
  pagerDuty:
    enabled: true
    token: pagerduty_api_token
  googleCloudStorage:
    enabled: true
    userServiceAccount: true
    createServiceAccountFromFile: sa-account-for-gcs.json
  auth:
    enabled: true
    provider:
      google:
        clientId: some-client-id.apps.googleusercontent.com
        clientSecret: some-client-secret
  catalog:
    locations:
      githubOrg:
        # Format: https://github.com/GITHUB_ORG
        - https://github.com/scatter-ly
      githubDiscovery:
        # Format to look for OpenContext YAML in GitHub repository:
        #     https://github.com/GITHUB_ORG/REPO/blob/BRANCH/*.yaml
        - https://github.com/scatter-ly/scatter.ly/blob/main/*.yaml
        # Format to discover metadata about a repo:
        #     https://github.com/GITHUB_ORG/REPO/
        # NOTE: The trailing slash is required!
        - https://github.com/scatter-ly/sandbox/
      url:
        # URL to OpenContext YAML
        - https://github.com/scatter-ly/publictest/blob/main/oc-catalog.yaml
        # Discover all OpenContext YAML files in a specific BitBucket repo
        - https://bitbucket.org/scatter-ly/scatter.ly/src/main/*.yaml
      bitbucketDiscovery:
        # Discover all repositories in a workspace
        - https://bitbucket.org/workspaces/scatterly-test
        # Discover all repositories in a project
        - https://bitbucket.org/workspaces/scatterly/projects/CRATES
      gcsDiscovery:
        # Format to look for OpenContext YAML in GCS:
        #     https://storage.cloud.google.com/${GCS_BUCKET}/${GCS_BUCKET_PATH_TO_YAML}/*
        - https://storage.cloud.google.com/scatterly/yaml/uploads/*
      gitlabOrg:
        # Format: https://gitlab.com/${GROUP}
        - https://gitlab.com/scatterly-gl
        # For all projects of $GROUP, discover OpenContext YAML file (oc-catalog.yaml) on main branch
        - https://gitlab.com/scatterly-gl/blob/main/oc-catalog.yaml
        # For project matching $SUBGROUP_GLOB, discover all YAML files on the prod branch
        - https://gitlab.com/scatterly-gl/platform*/blob/prod/*.yaml
```

3. Install or upgrade the OpenContext Helm chart with the new `opencontext-values.yaml` file:

```shell
helm install --namespace opencontext --name-template=<RELEASE_NAME>
  -f opencontext-values.yaml opencontext/opencontext
```

OR

```shell
helm upgrade --namespace opencontext --name-template=<RELEASE_NAME>
  -f opencontext-values.yaml opencontext/opencontext
```

This command will deploy the following pieces:

- OpenContext application
- PostgreSQL instance
- Ingress with SSL cert

After a fe:w
w minutes OpenContext should be up and running in your cluster under the DNS specified in your YAML.

Make sure to create the appropriate DNS entry in your infrastructure. To find the IP of your Ingress controller, check its service and look for an external IP.
You should see something like the following:

```shell
$ kubectl -n nginx-ingress get svc
NAME                                               TYPE           CLUSTER-IP    EXTERNAL-IP     PORT(S)                      AGE
nginx-ingress-ingress-nginx-controller             LoadBalancer   10.0.1.1      123.1.2.3       80:31907/TCP,443:32345/TCP   2d7h
```

To get information about your Ingress run the following:

```shell
$ kubectl get ingress
NAME                          HOSTS                         ADDRESS         PORTS       AGE
<RELEASE_NAME>-opencontext   opencontext.example.com                       80, 443     17m
```

## All configuration options

Please see our chart docs in [GitHub](https://github.com/opencontextinc/opencontext-helm/blob/main/charts/opencontext/README.md#all-configuration-options) to discover all the possibilities in the OpenContext chart.

## Customization

### Custom PostgreSQL instance

#### Customize PostgreSQL subchart

By default the OpenContext chart uses the subchart [Bitnami PostgreSQL](https://artifacthub.io/packages/helm/bitnami/postgresql). The PostgreSQL subchart can be customized by adding values to the `global.postgresql` and/or `postgresql` key.

#### Use existing PostgreSQL server

To use an already configured PostgreSQL server you will need to do the following:

- Have admin access to the PostgreSQL server since you will need to create an opencontext user and grant the user permissions.
- Create user with password auth
- Get CA, cert, and key if using SSL (optional)

As a PostgreSQL administrator run the following SQL statements. Remember to substitute `YOUR_PASSWORD` for a real password!

```sql
CREATE USER opencontext WITH PASSWORD 'YOUR_PASSWORD' CREATEDB;
GRANT USAGE, CREATE ON SCHEMA public TO opencontext;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO opencontext;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO opencontext;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO opencontext;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO opencontext;
```

#### Without SSL

Then create/add the following Helm values overrides:

```yaml
postgresql:
  enabled: false

app:
  database:
    connection:
      host: POSTGRESQL_HOST
      port: POSTGRESQL_PORT
      user: opencontext
      password: YOUR_PASSWORD
      ssl:
        enabled: false
```

#### With SSL

If your database needs an SSL connection, then do the following:

- Create a `configMap` named `<release name>-<chart name>-postgres-ca` with a file called `ca.crt` for the PostgreSQL CA:

```shell
kubectl create configmap $RELEASE_NAME-opencontext-postgres-ca --from-file=ca.crt --namespace opencontext"
```

- Create a tls `Secret` named `opencontext-postgresql-certs` with two files `tls.crt` and `tls.key` for the PostgreSQL SSL cert and key:

```shell
kubectl create secret tls opencontext-postgresql-certs --cert=$PATH_TO/tls.crt --key=$PATH_TO/tls.key --namespace opencontext
```

Then create/add the following Helm value overrides:

```yaml
postgresql:
  enabled: false

app:
  database:
    connection:
      host: POSTGRESQL_HOST
      port: POSTGRESQL_PORT
      user: opencontext
      password: YOUR_PASSWORD
      ssl:
        enabled: true
```

## Troubleshooting

Some resources created by these charts are meant to survive after upgrades and even after uninstalls. When
troubleshooting these charts it can be useful to delete these resources between re-installs.

Secrets:

```shell
# contains the certificates used by the deployed PostgreSQL
opencontext-postgresql-certs
```

Persistent volumes:

```shell
# this is the data volume used by PostgreSQL to store data and configuration
data-<release-name>-opencontext-postgresql-0
```

> **NOTE**: this volume also stores the configuration for PostgreSQL which includes things like the password for the
> `postgres` user. This means that uninstalling and re-installing the charts with `postgres.enabled` set to `true` and
> auto generated passwords will fail. The solution is to delete this volume with
> `kubectl delete pvc data-<release-name>-opencontext-postgresql-0 --namespace opencontext`

ConfigMaps:

```shell
# contains the generated CA certificate for PostgreSQL when `postgres` is enabled
<release-name>-opencontext-postgres-ca
```

#### Unable to verify signature

```
Backend failed to start up Error: unable to verify the first certificate
    at TLSSocket.onConnectSecure (_tls_wrap.js:1501:34)
    at TLSSocket.emit (events.js:315:20)
    at TLSSocket._finishInit (_tls_wrap.js:936:8)
    at TLSWrap.ssl.onhandshakedone (_tls_wrap.js:710:12) {
  code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE'
```

This error happens in the backend when it tries to connect to the configured PostgreSQL database and the specified CA is not correct. The solution is to make sure that the contents of the `configMap` that holds the certificate match the CA for the PostgreSQL instance.

A workaround is to set `app.database.connection.ssl.rejectUnauthorized` to `false` in the chart's values.

#### Multi-Platform Kubernetes Services

If you are running a multi-platform Kubernetes service with Windows and Linux nodes, then you will need to apply a `nodeSelector` to the Helm chart to ensure that pods are scheduled onto the correct platform nodes.

Add the following to your Helm values file:

```yaml
global:
  nodeSelector:
    kubernetes.io/os: linux

# If using Postgres Chart also add
postgresql:
  master:
    nodeSelector:
      kubernetes.io/os: linux
  slave:
    nodeSelector:
      kubernetes.io/os: linux
```
