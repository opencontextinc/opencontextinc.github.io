---
sidebar_position: 9
---

# Kind: Platform

This kind of entity groups platforms and components that share terminology, domain models, business purpose, or documentation together, i.e. for a bounded context.

## Definition

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Platform
spec:
  owner: string[];
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: Platform [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to an entity that groups platforms and components that share terminology, domain models, business purpose, or documentation together, i.e. for a bounded context.

## Spec

- **owner** (string array) [required]
  An array of [entity references](entity-reference) to the owner of the platform. Default entity type is [Kind: Team](team).
  For example: team-racoon, person:sean

## Examples

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

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

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Platform
metadata:
  name: orchard
  description: Everything related to the squirrel orchard project
  links:
    - url: https://orchard.example.com
      title: Orchard here
    - url: http://example.com/platforms/orchard/dashboard
      title: Orchard Metrics Dashboard
      icon: dashboard
spec:
  owner: [person:sean]
```
