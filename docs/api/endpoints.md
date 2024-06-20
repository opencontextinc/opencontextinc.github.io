---
sidebar_position: 3
---

# REST API endpoints

Currently there are two endpoints available.

## GET '/entities/:kind/:namespace/:name'

```bash
JWT=YOUR_JWT
API_VERSION=v1
TENANT_ID=TENANT_ID_IN_LOWERCASE
curl -H "Authorization: Bearer $JWT" https://api.app.opencontext.com/$API_VERSION/$TENANT_ID/api/rest/entities/team/scatter-ly/eng-raccoon
```

Using the tenant ID assigned to your instance, get a single entity record. The format is `v1/tenant_id/api/rest/entities/:entityKind/:namespace/:entityName`.

Return format:

```json
{
  "kind": "Team",
  "metadata": { "name": "eng-raccoon", "namespace": "scatter-ly" },
  "spec": {
    "type": "team",
    "profile": {
      "displayName": "eng-raccoon",
      "picture": "https://avatars.githubusercontent.com/t/7854544?s=400&v=4"
    },
    "children": ["eng-raccoon-cloud", "eng-raccoon-eco", "eng-raccoon-onprem"],
    "members": ["person:scatter-ly/aeschright"]
  }
}
```

## GET '/owner/:kind/:namespace/:name/entities'

```bash
JWT=YOUR_JWT
API_VERSION=v1
TENANT_ID=TENANT_ID_IN_LOWERCASE
curl -H "Authorization: Bearer $JWT" https://api.app.opencontext.com/$API_VERSION/$TENANT_ID/api/rest/owner/team/scatter-ly/eng-squirrel/entities
```

Using the tenant ID assigned to your instance, get all entities owned by a Team or Person. The format is `v1/tenant_ID/api/rest/owner/:ownerKind/:namespace/:ownerName/entities`.

By default the first 10 items will be returned. Use the query parameter `offset` to request additional entities.

```bash
JWT=YOUR_JWT
API_VERSION=v1
TENANT_ID=TENANT_ID_IN_LOWERCASE
curl -H "Authorization: Bearer $JWT" https://api.app.opencontext.com/$API_VERSION/$TENANT_ID/api/rest/owner/team/scatter-ly/eng-squirrel/entities?offset=10
```

Return format:

```json
{
  "items": [
    {
      "kind": "CodeComponent",
      "metadata": {
        "name": "crates-erp",
        "namespace": "scatter-ly",
        "description": "Distribution Center ERP",
        "links": [
          {
            "url": "https://github.com/scatter-ly/crates-erp/issues",
            "title": "Issues",
            "icon": "github"
          },
          {
            "url": "https://github.com/scatter-ly/crates-erp/pulls",
            "title": "Pull Requests",
            "icon": "github"
          },
          {
            "url": "https://github.com/scatter-ly/crates-erp/releases",
            "title": "Releases",
            "icon": "github"
          },
          {
            "url": "https://github.com/scatter-ly/crates-erp/deployments",
            "title": "Deployments",
            "icon": "github"
          }
        ]
      },
      "spec": {
        "type": "repository",
        "uri": "https://github.com/scatter-ly/crates-erp",
        "owner": ["eng-squirrel"],
        "workflowsEnabled": true,
        "languages": ["Java"],
        "releases": [],
        "vulnerabilityAlerts": [
          {
            "uri": "https://github.com/scatter-ly/crates-erp/security/dependabot/7",
            "updatedAt": "2023-05-24T21:06:51Z",
            "severity": "critical",
            "summary": "Deserialization of Untrusted Data in Log4j",
            "manifestPath": "pom.xml",
            "package": "log4j:log4j",
            "versionRange": ">= 1.2, <= 1.2.17"
          },
          {
            "uri": "https://github.com/scatter-ly/crates-erp/security/dependabot/6",
            "updatedAt": "2023-05-08T20:37:37Z",
            "severity": "critical",
            "summary": "Deserialization of Untrusted Data in Apache Log4j",
            "manifestPath": "pom.xml",
            "package": "log4j:log4j",
            "versionRange": "<= 1.2.17"
          },
          {
            "uri": "https://github.com/scatter-ly/crates-erp/security/dependabot/5",
            "updatedAt": "2023-05-08T20:37:37Z",
            "severity": "critical",
            "summary": "SQL Injection in Log4j 1.2.x",
            "manifestPath": "pom.xml",
            "package": "log4j:log4j",
            "versionRange": "<= 1.2.17"
          },
          {
            "uri": "https://github.com/scatter-ly/crates-erp/security/dependabot/4",
            "updatedAt": "2023-05-08T20:37:36Z",
            "severity": "high",
            "summary": "Deserialization of Untrusted Data in Log4j 1.x",
            "manifestPath": "pom.xml",
            "package": "log4j:log4j",
            "versionRange": "<= 1.2.17"
          },
          {
            "uri": "https://github.com/scatter-ly/crates-erp/security/dependabot/3",
            "updatedAt": "2023-05-08T20:37:36Z",
            "severity": "high",
            "summary": "JMSAppender in Log4j 1.2 is vulnerable to deserialization of untrusted data",
            "manifestPath": "pom.xml",
            "package": "log4j:log4j",
            "versionRange": ">= 1.2.0, <= 1.2.17"
          },
          {
            "uri": "https://github.com/scatter-ly/crates-erp/security/dependabot/2",
            "updatedAt": "2023-05-08T20:37:36Z",
            "severity": "medium",
            "summary": "TemporaryFolder on unix-like systems does not limit access to created files",
            "manifestPath": "pom.xml",
            "package": "junit:junit",
            "versionRange": ">= 4.7, < 4.13.1",
            "patchedVersion": "4.13.1"
          }
        ],
        "contributors": ["person:scatter-ly/alchen99"]
      },
      "relations": [
        {
          "type": "dependencyOf",
          "targetRef": "auxcomponent:scatter-ly/crates-erp-ownership",
          "target": {
            "kind": "auxcomponent",
            "namespace": "scatter-ly",
            "name": "crates-erp-ownership"
          }
        },
        {
          "type": "dependencyOf",
          "targetRef": "auxcomponent:scatter-ly/crates-erp-rfc",
          "target": {
            "kind": "auxcomponent",
            "namespace": "scatter-ly",
            "name": "crates-erp-rfc"
          }
        },
        {
          "type": "dependencyOf",
          "targetRef": "auxcomponent:scatter-ly/crates-erp-rules",
          "target": {
            "kind": "auxcomponent",
            "namespace": "scatter-ly",
            "name": "crates-erp-rules"
          }
        },
        {
          "type": "dependencyOf",
          "targetRef": "auxcomponent:scatter-ly/crates-erp-security",
          "target": {
            "kind": "auxcomponent",
            "namespace": "scatter-ly",
            "name": "crates-erp-security"
          }
        },
        {
          "type": "dependsOn",
          "targetRef": "platformcomponent:scatter-ly/crates-config",
          "target": {
            "kind": "platformcomponent",
            "namespace": "scatter-ly",
            "name": "crates-config"
          }
        },
        {
          "type": "dependsOn",
          "targetRef": "platformcomponent:scatter-ly/crates-ssl",
          "target": {
            "kind": "platformcomponent",
            "namespace": "scatter-ly",
            "name": "crates-ssl"
          }
        },
        {
          "type": "hasContributor",
          "targetRef": "person:scatter-ly/alchen99",
          "target": {
            "kind": "person",
            "namespace": "scatter-ly",
            "name": "alchen99"
          }
        },
        {
          "type": "hasPart",
          "targetRef": "codecomponentsidecar:scatter-ly/crates-erp-extras",
          "target": {
            "kind": "codecomponentsidecar",
            "namespace": "scatter-ly",
            "name": "crates-erp-extras"
          }
        },
        {
          "type": "ownedBy",
          "targetRef": "team:scatter-ly/eng-squirrel",
          "target": {
            "kind": "team",
            "namespace": "scatter-ly",
            "name": "eng-squirrel"
          }
        },
        {
          "type": "partOf",
          "targetRef": "service:scatter-ly/crates",
          "target": {
            "kind": "service",
            "namespace": "scatter-ly",
            "name": "crates"
          }
        }
      ]
    }
  ]
}
```
