---
sidebar_position: 11
---

# Kind: User

:::caution SaaS users should only use this to create entities for people outside of their company.
People inside your company are automatically created by the system once they have logged into the [Client Portal](https://portal.app.opencontext.com).
The system will not behave correctly if multiple records are created for the same individual.
:::

A user describes a person such as an employee, a contractor, or similar. User can be associated with [Kind: Person](person) entities in OpenContext. User entities integrate with the authentication system, and the record will be required to be able to log in.

## Definition

:::tip A key that ends with a question mark is optional.
For example, `spec.profile.displayName`
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: User
metadata:
  name: string
spec:
  primaryEmail: string
  profile?:
    displayName?: string
    displayEmail?: string
    picture?: string
    role?: string
    timezone?: string
    slackHandle?: string
    pagerHandle?: string
  ownerOf: string[]
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: User [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to describe a person such as an employee, a contractor, or similar. User can be associated with [Kind: Person](person) entities in OpenContext.

## Spec

- **primaryEmail** (string) [required]
  The email address for user authentication.
- **profile** [optional]
  Optional profile information about the user. Mainly for display purposes.
  All fields of this structure are also optional. The displayName would be what is presented to users in the system. The displayEmail would be a user email of some form, that the user may wish to be used for contacting them. The picture is expected to be a URL pointing to an image that's representative of the user, and that a browser could fetch and render on a group page or similar. The role would indicate the user’s role. The timezone should be in the form of [TZ database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). The slackHandle and pagerHandle are the user’s handle name in Slack and the paging service of choice respectively.
- **ownerOf** (string array) [optional]
  An array of [entity references](entity-reference) to [Person](person) entities that the user is associated with.

## Examples

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: User
metadata:
  name: paul
spec:
  primaryEmail: paul@example.com
  profile:
    displayName: Paul
    displayEmail: paul@example.com
    picture: https://avatars.dicebear.com/api/avataaars/paul@example.com.svg?background=%23fff&topChance=100&eyes=default&mouth=default&top[]=shortFlat
    timezone: Australia/Perth
    slackHandle: paul
    pagerHandle: paul
    role: Engineer
  ownerOf: [paul-github, paul]
```
