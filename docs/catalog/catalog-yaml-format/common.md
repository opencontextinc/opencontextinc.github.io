---
sidebar_position: 2
---

# Common to All Kinds

## Envelope

### apiVersion and kind (required)

This is the version of the specification format to be applied to the entity. `apiVersion` is used to allow the format to change over time, and the tuple of `apiVersion` and `kind` will tell the parser how to interpret the contents of the rest of the data.

OpenContext entities will have an `apiVersion` prefixed with `opencontext.com/` . Early versions of the catalog will be using alpha/beta version, e.g. `opencontext.com/v1alpha1` to signal that the format may still change. Later on we will be using `opencontext.com/v1` and up.

### metadata (required)

A structure that contains metadata about the entity, i.e. things that aren’t directly part of the entity specification itself. See below for more details.

### spec (varies)

The actual specification data that describes the entity.

The precise structure of the `spec` depends on the `apiVersion` and `kind` combination. See below for more details about the specification structure of specific kinds.

## Metadata

### name (required)

The name of the entity. This name is meant for humans and machines. It must conform to the following rules:

- Unique per kind. The uniqueness is case insensitive. Names may be re-used at a later time if an entity is deleted.
- Strings of length at least 1, and at most 63
- Must consist of sequences of `[a-z0-9A-Z]` possibly separated by one of `[-_.]`

### namespace (optional)

Currently not being used. It is reserved for future use. For now, it is recommended that this is left unset. This means that the entity belongs to the `default` namespace.

### title (optional)

:::info Only for display purposes.
:::

The display name for the entity to be used in place of name in the UI when available. This does not have a strict formatting requirement so can include special characters and be more explanatory. However, keep this short and try to avoid situations where the title can be confused with another entity.

### description (optional)

A human readable description of the entity to be shown in OpenContext.

### labels (optional)

These are optional key/value pairs that are attached to the entity. Their use is identical to [Kubernetes Object Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).

### annotations (optional)

An object with arbitrary non-identifying metadata attached to the entity, identical in use to [Kubernetes object annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).

Their purpose is mainly, but not limited, to reference into external systems. This could for example be a reference to the git ref the entity was ingested from, to monitoring and logging systems, to PagerDuty schedules, etc. Users may add these to descriptor YAML files, but in addition to this automated systems may also add annotations, either during ingestion into the catalog, or at a later time.

Both the key and the value are strings, subject to the following restrictions.

Keys have an optional prefix followed by a slash, and then the name part which is required. The prefix must be a valid lowercase domain name if specified, at most 253 characters in total. The name part must be sequences of `[a-zA-Z0-9]`separated by any of `[-_.]`, at most 63 characters in total.

The `opencontext.com` prefix is reserved for use by OpenContext core components.

Values can be of any length, but are limited to being strings.

#### Annotations in use

##### github.com/project-slug

```yaml
# Example:
metadata:
  annotations:
    github.com/project-slug: opencontextinc/sandbox
```

##### github.com/user-login

```yaml
# Example
metadata:
  annotations:
    github.com/user-login: jaxraccoon
```

##### google.com/email

```yaml
# Example
metadata:
  annotations:
    github.com/email: jax.raccoon@example.com
```

##### pagerduty.com/integration-key: 'PAGERDUTY_EVENTS_API_V2_INTEGRATION_KEY'

```yaml
# Example
metadata:
  annotations:
    pagerduty.com/integration-key: 'e0efde5a1somethingorother'
```

##### pagerduty.com/service-id: 'PAGERDUTY_SERVICE_ID'

:::info The feature to manually trigger an incident is not supported using this method.
:::

```yaml
# Example
metadata:
  annotations:
    pagerduty.com/service-id: 'TEST7XW'
```

### tags (optional)

A list of single-valued strings, for example to classify catalog entities in various ways. This is different to the labels in metadata, as labels are key-value pairs.

The values are user defined, for example the programming language used for the component, like `java` or `go`.

This field is optional, and currently has no special semantics.

Each tag must be sequences of `[a-z0-9]` separated by `-`, at most 63 characters in total.

### links (optional)

A list of external hyperlinks related to the entity. Links can provide additional contextual information that may be located outside of OpenContext itself. For example, an admin dashboard or external CMS page.

Users may add links to descriptor YAML files to provide additional reference information to external content & resources.

Fields of a link are:

| Field | Type   | Description                                                                         | Note                                                                                                                                                                                                                                                        |
| ----- | ------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url   | String | [Required] A url in standard uri format. For example, https://example.com/some/page |                                                                                                                                                                                                                                                             |
| title | String | [Optional] A user friendly display name for the link.                               |                                                                                                                                                                                                                                                             |
| icon  | String | [Optional] A key representing a visual icon to be displayed in the UI               | This is meant to be a semantic key that will map to a specific icon that may be provided by an icon library. These keys should be a sequence of `[a-z0-9A-Z]`, possibly separated by one of `[-_.]`. See list of [supported icons](#supported-icons) below. |

## Example with all metadata

```yaml
apiVersion: opencontext.com/v1alpha1
kind: CodeComponent
metadata:
  name: order-service
  namespace: order
  title: Order Service
  description: Order Service that does ordering
  labels:
    example.com/custom: some_custom_label
  annotations:
    github.com/project-slug: 'githubOrgName/order-service'
  tags:
    - java
  links:
    - url: https://example.com/help
      title: Support
spec:
  type: website
  lifecycle: production
  owner: order-team
  product: payment-orders
  isInternal: false
```

## Relationship Pairs

| OWNER_OF   | OWNED_BY      |
| ---------- | ------------- |
| HAS_PART   | PART_OF       |
| PARENT_OF  | CHILD_OF      |
| HAS_MEMBER | MEMBER_OF     |
| DEPENDS_ON | DEPENDENCY_OF |

## Supported Icons

This is a list of supported icons from [Material UI](https://v4.mui.com/components/material-icons/)

- language - Default if icon specified is not found
- catalog
- chat
- dashboard
- docs
- email
- github
- group
- help
- search
- techdocs
- user
- warning
