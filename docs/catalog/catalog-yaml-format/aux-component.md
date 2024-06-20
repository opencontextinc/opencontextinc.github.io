---
sidebar_position: 4
---

# Kind: AuxComponent

This kind of entity is used to describe documents, tools, and other resources that may be associated with code and platform components.

## Definition

:::tip A key that ends with a question mark is optional.
For example, `spec.uri`
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: AuxComponent
spec:
  type: 'infocard' | 'document' | 'website' | 'tool' | 'sbom' | 'runbook' | 'other'
  otherType?: string
  lifecycle: string
  owner: string[]
  service?: string
  uri?: string
  dependsOn?: string[]
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: AuxComponent [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to describe documents, tools, and other resources that may be associated with code and platform components.

## Spec

- **type** (string) [required]
  The type of AuxComponent. Must be one of the following: `infocard`, `document`, `website`, `tool`, `sbom`, `runbook`, `other`. If this is set to other then `spec.otherType` is also required.
- **otherType** (string) [optional]
  Required if `spec.type` is set to other.
  For example: customer-ticketing
- **lifecycle** (string) [required]
  The lifecycle state of the component.
  For example: experimental, staging, production, deprecated.
- **owner** (string array) [required]
  An array of [entity references](entity-reference) to the owner of the datacenter. Default entity type is [Kind: Team](team).
  For example: cloud-team, people:sean
- **service** (string) [optional]
  An [entity reference](entity-reference) to the [service](service) that the code component belongs to. Default entity type [Kind:Service](service).
- **uri** (string) [optional]
  A component's URI / FQDN.
  For example: [https://jenkins.example.com](https://jenkins.example.com/)
- **dependsOn** (string array) [optional]
  An array of [entity references](entity-reference) to other entities that the auxiliary component depends on to function.

## Examples

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: AuxComponent
metadata:
  name: crates-erp-website
  title: Crates ERP site
  description: Crates ERP admin website
  tags:
    - java
spec:
  type: website
  lifecycle: production
  owner: [eng-squirrel]
  service: crates
  uri: https://example.com/admin
  priority: 1
  sla: 24x5
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: AuxComponent
metadata:
  name: crates-docs
  title: Crates docs
  description: Crates documentation
  tags:
    - java
spec:
  type: document
  lifecycle: production
  owner: [prod-squirrel]
  service: crates
  uri: https://example.com/docs
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: AuxComponent
metadata:
  name: map-thingy
  title: Map thingy
  description: Prototyping toolkit for maps
spec:
  type: tool
  lifecycle: planning
  owner: [eng-raccoon-eco, prod-raccoon-ent]
  service: dumpster-prod
  uri: https://example.com/website
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: AuxComponent
metadata:
  name: custom-ticketing
  title: Custom ticketing
  description: Custom ticketing system
spec:
  type: other
  otherType: custom-ticketing
  lifecycle: production
  owner: [eng-raccoon-eco, prod-raccoon-ent]
  service: dumpster-prod
  uri: https://example.com/website
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: AuxComponent
metadata:
  name: eng-raccoon-info
  title: Eng Raccoon Info
  description: Additional links for Eng Raccoon
  links:
    - url: https://slack.com
      title: Slack
      icon: chat
    - url: https://jira.com
      title: Jira
      icon: dashboard
spec:
  type: infocard
  lifecycle: production
  owner: [eng-raccoon]
```
