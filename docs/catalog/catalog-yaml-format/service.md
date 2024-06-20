---
sidebar_position: 7
---

# Kind: Service

This kind of entity groups Code Components, Platform Components, and Aux Components together. A Service is viewed as an abstraction layer that provides insights into exposed features, but doesn't require too many details about the structure of all components.

## Definition

:::tip A key that ends with a question mark is optional.
For example, `spec.platform`
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Service
spec:
  owner: string[]
  platform?: string
  hasComponent?: string[]
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: Service [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to describe an entity that groups code and platform components together. It is viewed as an abstraction layer that provides insights into exposed features without needing a too detailed view into the details of all components.

## Spec

- **owner** (string array) [required]
  An array of [entity references](entity-reference) to the owner of the platform. Default entity type is [Kind: Team](team).
  For example: team-racoon, person:sean
- **platform** (string) [optional]
  An entity reference to the platform that the service belongs to.
  For example: orchard
- **hasComponent** (string array) [optional]
  An array of [entity references](entity-reference) to other component entities that belongs to this service.

## Examples

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Service
metadata:
  name: crates
  description: Shipping & receiving platform
spec:
  owner: [eng-squirrel, prod-squirrel]
  platform: orchard
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Service
metadata:
  name: it-service
  description: IT operations
spec:
  owner: [it-ops]
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Service
metadata:
  name: it-service
  description: IT operations
spec:
  owner: [it-ops]
  platform: it
  hasComponent:
    [
      aux-component:servicedesk,
      platform-component:jira-server,
      code-component:sandbox,
    ]
```
