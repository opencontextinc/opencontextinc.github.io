---
sidebar_position: 10
---

# Kind: Team

This kind of entity describes an organization entity such as a team, business unit, virtual team, or a loose collection of people in an interest group. Members of these teams are modeled as [Kind: Person](person) in OpenContext.

## Definition

:::tip A key that ends with a question mark is optional.
For example, `spec.parent`
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Team
spec:
  type: string
  profile?:
    displayName?: string
    email?: string
    picture?: string
    timezone?: string
    slackHandle?: string
    pagerHandle?: string
  parent?: string
  children: string[]
  members?: string[]
```

- **apiVersion**: opencontext.com/v1alpha1 [required]
- **kind**: Team [required]
- **metadata**: ([ObjectMeta](common#metadata)) [optional]
  Standard object’s metadata. For more information see the [Common to All Kinds](common) doc
- **spec**: ([Spec](#spec)) [required]
  Specification to describe an organization entity such as a team, business unit, virtual team, or a loose collection of people in an interest group.

## Spec

- **type** (string) [required]
  The type of team.
  For example, organization, virt-org, business-unit, department, team.
- **profile** [optional]
  Optional profile information about the team. Mainly for display purposes. All fields of this structure are also optional.
  - **displayEmail** would be a team email of some form, that the team may wish to be used for contacting them.
  - **picture** is expected to be a URL pointing to an image that's representative of the team, and that a browser could fetch and render on a team page or similar.
  - **timezone** should be in the form of [TZ database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
  - **slackHandle** is the team’s handle name in Slack.
  - **pagerHandle** is the team’s handle name in the paging service of choice.
- **parent** (string) [optional]
  The immediate parent team in the hierarchy, if any. Not all teams must have a parent. OpenContext supports multi-root hierarchies. Teams may however not have more than one parent. This field is an [entity reference](entity-reference).
  For example: ops, cloud-security
- **children** (string array) [required]
  The immediate child teams of this team in the hierarchy (whose parent field points to this team). The list must be present, but may be empty if there are no child teams. The items are not guaranteed to be ordered in any particular way. The entries of this array are [entity references](entity-reference).
  For example: engineering, product
- **members** (string array) [optional]
  The people that are members of this team. The entries of this array are [entity references](entity-reference).
  For example: jdoe

## Examples

These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Team
metadata:
  name: scatterly-inc
  description: The Scatter.ly organization
  links:
    - url: https://www.scatter.ly/
      title: Website
    - url: https://meta.wikimedia.org/wiki/
      title: Intranet
spec:
  type: organization
  profile:
    displayName: Scatter.ly
    email: info@scatter.ly
    picture: https://avatars.dicebear.com/api/identicon/info@example.com.svg?background=%23fff&margin=25
  children: [engineering, product]
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Team
metadata:
  name: engineering
  description: Engineering Team
spec:
  type: virt-org
  profile:
    displayName: Engineering Team
    email: engineering@example.com
    picture: https://avatars.dicebear.com/api/identicon/engineering@example.com.svg?background=%23fff&margin=2
  parent: scatterly-inc
  children:
    [eng-squirrel, eng-raccoon, reviewers, docs-core, dev-core, maintainers]
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Team
metadata:
  name: product
  description: Product team
spec:
  type: virt-org
  profile:
    displayName: Product Team
    email: product@example.com
    picture: https://avatars.dicebear.com/api/identicon/product@example.com.svg?background=%23fff&margin=2
  parent: scatterly-inc
  children: [prod-squirrel, prod-raccoon]
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Team
metadata:
  name: prod-raccoon
  description: Raccoon Product Team
spec:
  type: business-unit
  profile:
    displayName: Raccoon Product Team
    email: prod-raccoon@example.com
    picture: https://avatars.dicebear.com/api/identicon/prod-raccoon@example.com.svg?background=%23fff&margin=2
  parent: team-raccoon
  children: [prod-raccoon-ent, prod-raccoon-oss]
  members: [nancy, thomas, mark, steph, joel, beth, melissa]
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Team
metadata:
  name: prod-raccoon-ent
  description: Raccoon Enterprise Product Team
spec:
  type: department
  profile:
    displayName: Raccoon Enterprise
    email: prod-raccoon-ent@example.com
    picture: https://avatars.dicebear.com/api/identicon/prod-raccoon-ent@example.com.svg?background=%23fff&margin=2
  parent: prod-raccoon
  children: []
  members: [nancy]
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Team
metadata:
  name: team-raccoon
  description: Raccoon Team
spec:
  type: department
  profile:
    displayName: Team Raccoon
    email: team-racoon@scatter.ly
    picture: https://avatars.dicebear.com/api/identicon/catalog-eng@example.com.svg?background=%23fff&margin=25
    timezone: America/Los_Angeles
    slackHandle: team-racoon
    pagerHandle: team-racoon
  parent: scatterly-inc
  children: [eng-raccoon, prod-raccoon]
  members: [audrey, beth, melissa]
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Team
metadata:
  name: eng-raccoon
  description: Raccoon Engineering Team
spec:
  type: department
  profile:
    displayName: Raccoon Engineering
    email: eng-raccoon@example.com
    picture: https://avatars.dicebear.com/api/identicon/eng-raccoon@example.com.svg?background=%23fff&margin=25
  parent: team-raccoon
  children: [eng-raccoon-cloud, eng-raccoon-onprem, eng-raccoon-eco]
  members: [jax, fernando, daniel, brit, billy, josh, audrey]
```

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Team
metadata:
  name: eng-raccoon-cloud
  description: Raccoon Cloud
spec:
  type: business-unit
  profile:
    displayName: Raccoon Cloud Engineering
    email: eng-raccoon-cloud@example.com
    picture: https://avatars.dicebear.com/api/identicon/eng-raccoon-cloud@example.com.svg?background=%23fff&margin=25
  parent: eng-raccoon
  children: [eng-raccoon-aws]
  members: [jax, fernando, paul]
```
