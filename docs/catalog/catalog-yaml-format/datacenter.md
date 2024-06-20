---
sidebar_position: 6
---

# Kind: Datacenter

This kind of entity groups code components and platform components together to indicate where those components are located, such as in AWS, GCP, or a local datacenter.

## Definition

:::tip A key that ends with a question mark is optional.
For example, `spec.region`
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Datacenter
spec:
  type: 'cloud' | 'on-premise' | 'other'
  otherType?: string
  owner: string[]
  region?: string
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: Datacenter [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to describe an entity that groups code components and platform components together to indicate where those components are located. For instance, AWS, GCP, local datacenter.

## Spec

- **type** (string) [required]
  The type of datacenter. Must be one of the following: `cloud` ,`on-premise`, `other` . If this is other then `spec.otherType` is also required.
- **otherType** (string) [optional]
  Required if `spec.type` is set to other.
  For example: dc1
- **owner** (string array) [required]
  An array of [entity references](entity-reference) to the owner of the datacenter. Default entity type is [Kind: Team](team).
  For example: cloud-team, person:sean
- **region** (string) [optional]
  Region where the datacenter is located.
  For example: us-east-1, us-central1

## Example

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Datacenter
metadata:
  name: aws
  title: AWS
  description: Amazon Web Services
  annotations:
    pagerduty.com/service-id: 'TEST7XW'
spec:
  type: cloud
  owner: [cloud-team]
  region: us-east-1
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Datacenter
metadata:
  name: aws-us-east-1
  title: AWS us-east-1
  description: Amazon Web Services in us-east-1
  annotations:
    pagerduty.com/service-id: 'TEST7XW'
spec:
  type: cloud
  owner: [cloud-team]
  region: us-east-1
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Datacenter
metadata:
  name: dc1
  title: Datacenter 1
  description: Datacenter 1
  annotations:
    pagerduty.com/service-id: 'TEST8XW'
spec:
  type: other
  otherType: dc1
  owner: [it-team]
  region: us-east
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Datacenter
metadata:
  name: gcp
  title: GCP
  description: Google Cloud Platform
  annotations:
    pagerduty.com/integration-key: 'e0efde5a1somethingorother'
spec:
  type: cloud
  owner: [cloud-team]
  region: us-central1-c
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Datacenter
metadata:
  name: vendor
  title: Vendor 1
  description: Vendor 1's Datacenter
spec:
  type: other
  otherType: vendor
  owner: [it-team]
  region: us-east
```
