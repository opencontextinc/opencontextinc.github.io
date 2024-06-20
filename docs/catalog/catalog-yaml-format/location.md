---
sidebar_position: 12
---

# Kind: Location

This is a special kind of entity that is a marker that references other places to look for OpenContext data. For the most part this is created automatically by the system. One would only create this kind of YAML definition if one wants to add supplementary data to OpenContext or entities that cannot be auto-discovered.

## Definition

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Location
spec:
  targets: string[]
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: Location [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to describe a Location to look for OpenContext data.

## Spec

- targets (string array) [required]
  A list of targets as strings. They can all be either absolute paths/URLs, or relative paths such as `./details/oc-catalog.yaml` which are resolved relative to the location of this Location entity itself.

## Examples

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

If you had the following directory structure in your GitHub repository

```bash
.
├── services
│   ├── it-service.yaml
│   ├── service-crates.yaml
│   ├── service-dumpster-prod.yaml
│   ├── service-greenhouse.yaml
│   ├── service-retail.yaml
│   └── service-wholesale.yaml
```

then to create a location file for all services you would create a location YAML (all-services.yaml) in the root of your GitHub repository and populate it like so.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Location
metadata:
  name: scatterly-services
  description: A collection of all Scatter.ly services
spec:
  targets:
    - ./services/service-greenhouse.yaml
    - ./services/service-crates.yaml
    - ./services/service-wholesale.yaml
    - ./services/service-retail.yaml
    - ./services/service-dumpster-prod.yaml
    - ./services/it-service.yaml
```

Now your directory structure should look something like the following.

```bash
.
├── all-services.yaml
├── services
│   ├── it-service.yaml
│   ├── service-crates.yaml
│   ├── service-dumpster-prod.yaml
│   ├── service-greenhouse.yaml
│   ├── service-retail.yaml
│   └── service-wholesale.yaml
```
