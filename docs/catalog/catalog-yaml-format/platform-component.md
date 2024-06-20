---
sidebar_position: 8
---

# Kind: PlatformComponent

This kind of entity describes the infrastructure a platform needs to operate, like BigTable databases, Pub/Sub topics, S3 buckets or CDNs. Modeling them together with code components and platforms allows you to visualize your platform components' footprint, and create tooling around them.

## Definition

:::tip A key that ends with a question mark is optional.
For example, `spec.priority`
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: PlatformComponent
spec:
  type: string
  lifecycle: string
  owner: string[]
  dependsOn?: string[]
  dependencyOf?: string[]
  service?: string
  uri?: string
  priority?: number
  sla?: string
  datacenter?: string[]
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: PlatformComponent [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to describe the infrastructure a service needs to operate, like BigTable databases, Pub/Sub topics, S3 buckets or CDNs. Modeling them together with code components and services allows it to visualize platform components' footprint, and create tooling around them.

## Spec

- **type** (string) [required]
  The type of platform component.
  For example: database, loadbalancer, cluster, server, vm, blob storage, network switch, firewall, ssl certificate
- **lifecycle** (string) [required]
  The lifecycle state of the component.
  For example: experimental, staging, production, deprecated.
- **owner** (string array) [required]
  An array of [entity references](entity-reference) to the owner of the datacenter. Default entity type is [Kind: Team](team).
  For example: cloud-team, person:sean
- **dependsOn** (string array) [optional]
  An array of [entity references](entity-reference) to other entities that the platform component depends on to function.
- **dependencyOf** (string array) [optional]
  An array of [entity references](entity-reference) to other entities that the platform component is a dependency of.
- **service** (string) [optional]
  An [entity reference](entity-reference) to the [service](service) that the platform component belongs to. Default entity type [Kind:Service](service).
- **uri** (string) [optional]
  A component's URI / FQDN.
  For example: [https://jenkins.example.com](https://jenkins.example.com/)
- **priority** (number) [optional]
  Priority of 1-5 to fix component with 1 being the highest.
- **sla** (string) [optional]
  The SLA of the component.
  For example: 24x7, 24x5
- **datacenter** (string array) [optional]
  An array of [entity references](entity-reference) to the [datacenter](datacenter) that the code component belongs to. Default entity type [Kind:Datacenter](datacenter).

## Examples

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: PlatformComponent
metadata:
  name: crates-db
  description: Crates ERP data warehouse
  annotations:
    pagerduty.com/service-id: 'TEST7XW'
spec:
  type: database
  lifecycle: production
  owner: [eng-squirrel]
  service: crates
  datacenter: [aws]
  dependsOn: [datacenter:aws]
  dependencyOf: [code-component:crates-erp]
  priority: 2
  sla: 24x5
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: PlatformComponent
metadata:
  name: crates-config
  description: Crates config bucket
  annotations:
    pagerduty.com/integration-key: 'e0efde5a1somethingorother'
spec:
  type: s3
  lifecycle: production
  owner: [eng-squirrel]
  service: crates
  datacenter: [aws]
  dependencyOf: [platform-component:crates-db, code-component:crates-erp]
  uri: s3://crates-config
  priority: 3
  sla: 24x5
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: PlatformComponent
metadata:
  name: dumpster-db-vend
  description: Dumpster vendor data store
  links:
    - url: https://example.com/vendor-docs
      title: Docs
      icon: docs
spec:
  type: database
  lifecycle: production
  owner: [person:daniel]
  service: dumpster-prod
  datacenter: [aws]
  dependencyOf: [code-component:dumpster-data, platform-component:dumpster-db]
  priority: 1
  sla: 12x7
```
