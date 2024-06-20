---
sidebar_position: 7
---

# Group components into Services and Platforms

OpenContext allows you to group various components (Service, Code, Aux, etc.) together into Services. This grouping can be added by creating a [Service YAML](../catalog/catalog-yaml-format/service) file describing the components that should be part of the Service.

OpenContext also allows you to group Services together into Platforms. This grouping can be added by creating a [Platform YAML](../catalog/catalog-yaml-format/platform) file and linking the services to the platform.

See the [OpenContext Catalog Schema](../catalog/schema) for more details about (and a diagram showing) how the entities relate to one another.

## Gather information

To add this additional data, you'll need to:

- **Figure out who is responsible for the Service or Platform.**

  You'll need the OpenContext entity name for the responsible person or team. See [Map your Organization](map-org) on how to find this information.

- **Check which components are associated with the Service.**

  You'll need the OpenContext [entity reference](../catalog/catalog-yaml-format/entity-reference) for each component.

## Example / How-to

The following is an example of how you would group various components into a Service which will be part of a Platform.

:::tip These YAML configuration examples are all shown as if they were in their own file. They also can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.
:::

**First: define your platform. **

In this example, we are defining a platform called `blue-sky` for _everything related to the raccoon Blue Sky Buffet project_.

The `metadata.name` we picked, `blue-sky`, is unique.

Since `team-raccoon` is responsible, we map them to the `owner` field.

:::caution Remember: the field `metadata.name` must be unique!
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Platform
metadata:
  name: blue-sky
  description: Everything related to the raccoon Blue Sky Buffet project
  links:
    - url: https://buffet.example.com
      title: Project diagrams
    - url: http://example.com/platforms/orchard/dashboard
      title: Buffet Metrics Dashboard
      icon: dashboard
spec:
  owner: [team-raccoon]
```

**Next: define the service.**

Here, let's define a service called `retail` to group together the `User experience` components.

The `metadata.name` we picked, `retail`, is unique.

The groups responsible are `eng-raccoon-eco` and `prod-raccoon`, so we map those groups to the `owner` field.

The components that should be grouped together and mapped to the `hasComponent` field are as follows:

- CodeComponent - `code-component:retail-app`
- PlatformComponents - `platform-component:retail-vm`, `platform-component:retail-dns`
- AuxComponent - `aux-component:retail-app-maintenance-doc`

:::caution Again: be sure to make the field `metadata.name` unique!
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Service
metadata:
  name: retail
  description: User experience service
spec:
  owner: [eng-raccoon-eco, prod-raccoon]
  platform: blue-sky
  hasComponent:
    [
      code-component:retail-app,
      platform-component:retail-vm,
      platform-component:retail-dns,
      aux-component:retail-app-maintenance-doc,
    ]
```
