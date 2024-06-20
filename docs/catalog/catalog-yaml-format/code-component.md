---
sidebar_position: 5
---

# Kind: CodeComponent

This kind of entity is used to describe a software package, library, or other code entity.

## Definition

:::tip A key that ends with a question mark is optional.
For example, `spec.uri`
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: CodeComponent
spec:
  type: 'repository' | 'codepath' | 'library' | 'package' | 'lambda' | 'utility' | 'other'
  owner: string[]
  otherType?: string
  uri?: string
  service?: string
  datacenter?: string[]
  lifecycle?: string
  priority?: number
  sla?: string
  subcomponentOf?: string[]
  dependsOn?: string[]
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: CodeComponent [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to describe a software package, library, or other code entity.

## Spec

- **type** (string) [required]
  The type of datacenter. Must be one of the following: `repository`, `codepath`, `library`, `package`, `lambda`, `utility`, `other` . If this is set to other then `spec.otherType` is also required.
- **otherType** (string) [optional]
  Required if `spec.type` is set to other.
  For example: glitch
- **owner** (string array) [required]
  An array of [entity references](entity-reference) to the owner of the datacenter. Default entity type is [Kind: Team](team).
  For example: cloud-team, person:sean
- **uri** (string) [optional]
  A component's URI / FQDN.
  For example: [https://lorem.lambda-url.uswest-1.on.aws](https://lorem.lambda-url.uswest-1.on.aws/)
- **service** (string) [optional]
  An [entity reference](entity-reference) to the [service](service) that the code component belongs to. Default entity type [Kind:Service](service).
- **datacenter** (string array) [optional]
  An array of [entity references](entity-reference) to the [datacenter](datacenter) that the code component belongs to. Default entity type [Kind:Datacenter](datacenter).
- **lifecycle** (string) [optional]
  The lifecycle state of the component.
  For example: experimental, staging, production, deprecated.
- **priority** (number) [optional]
  Priority of 1-5 to fix component with 1 being the highest.
- **sla** (string) [optional]
  The SLA of the component.
  For example: 24x7, 24x5
- **subcomponentOf** (string array) [optional]
  An array of [entity references](entity-reference) to the other components of which the component is a part of. Default entity type [Kind:CodeComponent](#).
- **dependsOn** (string array) [optional]
  An array of [entity references](entity-reference) to other entities that the code component depends on to function.

## Examples

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: CodeComponent
metadata:
  name: crates-erp
  description: Distribution Center ERP
  title: Crates ERP
  annotations:
    github.com/project-slug: scatterly/crates-erp
  tags:
    - java
  links:
    - url: https://cybersquirrel1.com/
      title: Cyber Squirrel
      icon: dashboard
    - url: https://example.com/user
      title: Examples Users
      icon: user
    - url: https://example.com/group
      title: Example Group
      icon: group
    - url: https://example.com/cloud
      title: Link with Cloud Icon
      icon: cloud
    - url: https://example.com/dashboard
      title: Dashboard
      icon: dashboard
    - url: https://example.com/help
      title: Support
      icon: help
    - url: https://example.com/web
      title: Website
      icon: web
    - url: https://example.com/alert
      title: Alerts
      icon: alert
spec:
  type: library
  owner: [eng-squirrel]
  dependsOn: [code-component:greenhouse-data]
  uri: https://example.com/erp
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: CodeComponent
metadata:
  name: crates-fe
  description: Crates frontend application
  title: Crates Frontend
  tags:
    - java
  links:
    - url: https://example.com/help
      title: Support
      icon: help
spec:
  type: package
  owner: [eng-squirrel]
  service: crates
  subcomponentOf: [code-component:crates-erp]
  uri: https://example.com/order
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: CodeComponent
metadata:
  name: dumpster-data
  description: Dumpster data backend
  title: Dumpster data
  tags:
    - csv
    - nosql
    - graphql
spec:
  type: repository
  owner: [eng-raccoon-aws, eng-raccoon-eco]
  uri: https://github.com/example/greenhouse-data
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: CodeComponent
metadata:
  name: log4j
  description: Log4j library
  title: Log4j
  tags:
    - logging
spec:
  type: library
  owner: [eng-raccoon-aws, eng-raccoon-eco]
  service: dumpster-prod
  uri: https://github.com/example/greenhouse-data
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: CodeComponent
metadata:
  name: greenhouse-dataset
  description: Greenhouse historical data
  title: Greenhouse data archive
spec:
  type: other
  otherType: dataset
  owner: [prod-squirrel]
  service: greenhouse
  uri: s3://greenhouse-dataset
  dependsOn: [code-component:greenhouse-data]
  datacenter: [aws]
```
