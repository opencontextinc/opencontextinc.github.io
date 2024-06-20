---
sidebar_position: 11
---

# Kind: Person

A Person describes an individual such as an employee, contractor, or similar. Person are mapped to [Kind: Team](team) entities in the catalog and can be owned by a [Kind: User](user) entity.

## Definition

:::tip A key that ends with a question mark is optional.
For example, `spec.profile.displayName`
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Person
spec:
  profile?:
    displayName?: string
    displayEmail?: string
    picture?: string
    role?: string
  memberOf: string[]
  ownedBy?: string;
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: Person [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to describe an individual such as an employee, contractor, or similar. Person are mapped to [Kind: Team](team) entities in the catalog and can be owned by a [Kind: User](user) entity in OpenContext.

## Spec

- **profile** [optional]
  Optional profile information about the user. Mainly for display purposes.
  All fields of this structure are also optional. The displayName would be what is presented to users in the system. The displayEmail would be a user email of some form, that the user may wish to be used for contacting them. The picture is expected to be a URL pointing to an image that's representative of the user, and that a browser could fetch and render on a group page or similar. The role would indicate the user’s role.
- **memberOf** (string array) [required]
  An array of [entity references](entity-reference) to [Team](team) entities that the person is a member of.
- **ownedBy** (string) [optional]
  An [entity reference](entity-reference) to the [User](user) that this person is attached to.

## Examples

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Person
metadata:
  name: paul
spec:
  profile:
    displayName: Paul
    displayEmail: paul@example.com
    picture: https://avatars.dicebear.com/api/avataaars/paul@example.com.svg?background=%23fff&topChance=100&eyes=default&mouth=default&top[]=shortFlat
    role: Engineer
  memberOf: [contract-crow, eng-raccoon-cloud]
  ownedBy: paul
```
