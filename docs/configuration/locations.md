---
sidebar_position: 4
---

# Locations

## Bitbucket

The Bitbucket integration for OpenContext can:

- read repository data directly from your workspaces.
- search for .yaml files inside your repositories.

### Setup

- Use type `bitbucket-discovery` for all options.

- Workspaces should be referenced using the workspace ID, and projects will use the project key, as you can see below.

```yaml
- type: bitbucket-discovery
  target: https://bitbucket.org/workspaces/myworkspaceID/projects/myprojKey
```

### Examples

All repositories in a workspace  
`https://bitbucket.org/workspaces/myworkspaceID`

All repositories in a project  
`https://bitbucket.org/workspaces/myworkspaceID/projects/myprojKey`

A single repository  
`https://bitbucket.org/workspaces/myworkspaceID/myrepo`

Find YAML files  
`https://bitbucket.org/workspaces/myworkspaceID/projects/myprojKey/repos/*?search=true&catalogPath=my/nested/path/catalog.yaml`

Add all YAML files from a specific repository and branch

```yaml
- type: url
  target: https://bitbucket.org/myworkspaceID/myrepo/src/mybranch/*.yaml
```

## GitHub

OpenContext can automatically read code repository data from GitHub.

In order to do this, we need to know the organization and repository names. We can also optionally search for YAML files that match a filename pattern.

### Examples

Here are examples of what our `github-discovery` processor can read:

Full organization with all repositories: `https://github.com/scatter-ly`

A single repository from an organization: `https://github.com/scatter-ly/opencontext/`

All 'oc-catalog.yaml' files found in the default branch of a repository: `https://github.com/scatter-ly/*/blob/-/oc-catalog.yaml`

A specific yaml file location: `https://github.com/scatter-ly/*/blob/main/oc-catalog.yaml`

All repos starting with the letter c: `https://github.com/scatter-ly/c*`

All repos that contain the word `end`: `https://github.com/scatter-ly/*end*`

Add all yaml files from a specific repository and specific branch:

```yaml
- type: url
  target: https://github.com/scatter-ly/opencontext/blob/main/*.yaml
```

## GitLab

The GitLab integration can:

- Read catalog YAML files stored in a project repository
- Import project details
- Assign project ownership using CODEOWNERS
- Import users and groups

### Examples

Import users and groups:

```yaml
- type: gitlab-org
  target: https://gitlab.com/scatter-ly
```

Import catalog files named `oc-catalog.yaml` from all projects' `main` branch in a group:

```yaml
- type: gitlab-discovery
  target: https://gitlab.com/scatter-ly/blob/main/oc-catalog.yaml
```

Import from a subgroup/project:

```yaml
- type: gitlab-discovery
  target: https://gitlab.com/scatter-ly/retail-app/blob/main/oc-catalog.yaml
```

Import using glob expression for subgroup/project and/or file name:

```yaml
# Import all YAML files from all projects' test branch in the group scatter-ly
- type: gitlab-discovery
  target: https://gitlab.com/scatter-ly/blob/test/*.yaml
# Import oc-catalog.yaml file on the main branch from subgroups/projects
# that start with platform*
- type: gitlab-discovery
  target: https://gitlab.com/scatter-ly/platform*/blob/main/oc-catalog.yaml
# Import all YAML files on the test branch from subgroups/projects
# that start with platform*
- type: gitlab-discovery
  target: https://gitlab.com/scatter-ly/platform*/blob/test/*.yaml
```
