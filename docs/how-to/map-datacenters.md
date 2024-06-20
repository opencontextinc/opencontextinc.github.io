---
sidebar_position: 5
---

# Map your Datacenters

OpenContext allows you to group code components and platform components by location. These locations can be added by creating a [Datacenter YAML](../catalog/catalog-yaml-format/datacenter) file describing the location.

## Gather information

To add this additional data, we will need a few things about the datacenter.

### Required information

- Team or person responsible. This must be an OpenContext entity name. See [Map your Organization](map-org) to learn how to find this information.
- Type of datacenter (cloud, on-premise, other).

### Optional information

- What region is the datacenter in?
- Is there a PagerDuty service-id or integration-key associated with it? If so, you'll need to add a [PagerDuty annotation](../catalog/catalog-yaml-format/common#annotations-optional).

## Examples

The following are examples of how you would define various types of datacenters.

:::tip For cloud datacenters it is recommended that you create at least one datacenter, per cloud, per region.
:::

:::tip Example YAML configurations are shown as if they were in their own file. They can also be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.
:::

:::caution The field `metadata.name` must be unique!
:::

For our first example, we are defining a datacenter for AWS us-east-1. The `cloud-team` is responsible, and so they are mapped to the `owner` field.

The datacenter's optional PagerDuty `service-id` is mapped to the `metadata.annotations`.

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

---

In the next example, we are defining a datacenter for GCP us-central1-c. Again, the responsible `cloud-team` is mapped to the `owner` field.

The optional PagerDuty integration-key is mapped to the `metadata.annotations`.

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

---

In this example we are defining an on-premise datacenter called Datacenter 1. We've mapped the `it-team` that's responsible to the `owner` field.

Their optional PagerDuty integration-key is mapped to the `metadata.annotations`.

_Note: The default type of oncall is a team._

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Datacenter
metadata:
  name: dc1
  title: Datacenter 1
  description: Datacenter 1
  annotations:
    pagerduty.com/integration-key: 'e0efde5a1somethingorother2'
spec:
  type: other
  otherType: dc1
  owner: [it-team]
  region: us-east
```

---

Here, we are defining a vendor's datacenter called Vendor 1. The `it-team` responsible is mapped to the `owner` field.

Since they are not on-call for this datacenter, no PagerDuty annotation is added.

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
