---
sidebar_position: 4
---

# Map your Organization

OpenContext automatically maps out the people and teams in your GitHub organization. Here's how you can add other organizational groupings.

## Gather information

To add this additional data, we will need the following things.

### Person's namespaced entity name in OpenContext

:::tip The namespace the person is in is usually the GitHub organization the person is located in
:::
:::tip The person's name is usually the first part of their email address or their GitHub username
:::

To find your person's entity name, head to the Persons Catalog page by going to your URL `/catalog` and then picking "Persons" from the dropdown.

- Hover your cursor over the person's name to see the URL.
- The URL will end with something like `default/person/jane.doe` or `scatterly/person/jane.doe`. In this case `jane.doe` is the Person's name in the system and `default` or `scatterly` is the namespace for the person. Make note of the name and namespace (especially if it is not equal to default) since it will be needed to create a relationship.

### GitHub namespaced team name in OpenContext

Similarly, head to the Teams Catalog page by picking "Teams" from the dropdown.

- Hover your cursor over the team's name to see the URL.
- The URL will end with something like `default/team/cloud` or `scatterly/team/cloud`. In this case `cloud` is the Team name in the system and `default` or `scatterly` is the namespace for the team. Make note of the name and namespace (especially if it is not equal to default) since it will be needed to create a relationship.

### Organization name in OpenContext

On that same Teams Catalog page, sort by the `TYPE` column.

- Find the entry that has a type set to `organization` and hover your cursor over the name.
- The URL will end with something like the following `default/team/scatterly-inc`. In this case, `scatterly-inc` is the Team name in the system. Make note of this, since it will be needed to create a relationship.

### Organizational spreadsheet of your teams and people

After you have all of this information, create a [Team YAML](../catalog/catalog-yaml-format/team) file for the organizational groupings missing.

## Match people and teams in OpenContext to your Organization spreadsheet (optional)

To make things easier, it is best if you map the teams and people in your organizational spreadsheet with their corresponding OpenContext entity name. This will ensure you don't create duplicates, and makes it easier to figure out how to create the [Team YAML](../catalog/catalog-yaml-format/team) file.

To demonstrate this, let's build out the Scatter.ly organization.

### Before

Here's an example of the Scatter.ly organization in a spreadsheet.

| Org/Team name            | Members             |
| ------------------------ | ------------------- |
| Engineering Team         |                     |
| Product Team             |                     |
| Team Raccoon             | Beth                |
| Raccoon Product Team     | Nancy, Mark         |
| Raccoon Engineering Team | Jax, Brit, Fernando |
| Raccoon Cloud            | Jax, Fernando, Paul |
| Raccoon AWS Team         | Fernando, Daniel    |

#### Mapping

First, we'll need to map the org, teams and persons that already exist in OpenContext to the corresponding entry in your organizational spreadsheet.

:::tip The organization was added into the spreadsheet to make it easier to map teams back to the organization level.
:::

After mapping, the spreadsheet should look something like the following.

| Org/Team name            | Org/Team type | OC Entity         | OC Parent         | OC Children     | OC Members/Persons  | Members             |
| ------------------------ | ------------- | ----------------- | ----------------- | --------------- | ------------------- | ------------------- |
| Scatter.ly               | organization  | scatterly-inc     |                   |                 |                     |                     |
| Engineering Team         |               |                   |                   |                 |                     |                     |
| Product Team             |               |                   |                   |                 |                     |                     |
| Team Raccoon             |               |                   |                   |                 | beth                | Beth                |
| Raccoon Product Team     |               |                   |                   |                 | nancy, mark         | Nancy, Mark         |
| Raccoon Engineering Team |               |                   |                   |                 | jax, brit, fernando | Jax, Brit, Fernando |
| Raccoon Cloud            | team          | eng-raccoon-cloud |                   | eng-raccoon-aws | jax, fernando, paul | Jax, Fernando, Paul |
| Raccoon AWS Team         | team          | eng-raccoon-aws   | eng-raccoon-cloud |                 | fernando, daniel    | Fernando, Daniel    |

You should now know what teams will need to be created with YAML. In the following example we will need to create a YAML for Engineering, Product, Raccoon Team, Raccoon Product Team, and Raccoon Engineering Team.

#### Fill in your details

The last step is to fill in the parts that are missing with data for the teams you are creating in your YAML.

Remember: the OC Entity must be a unique name and cannot have special characters except for hyphens and underscores. See the [Team YAML reference](../catalog/catalog-yaml-format/team).

Also note that the OC Parent and OC Children are mapped to the OC Entity of the Org/Team name.

| Org/Team name            | Org/Team type | OC Entity         | OC Parent         | OC Children                           | OC Members/Persons  | Members             |
| ------------------------ | ------------- | ----------------- | ----------------- | ------------------------------------- | ------------------- | ------------------- |
| Scatter.ly               | organization  | scatterly-inc     |                   |                                       |                     |                     |
| Engineering Team         | virt-org      | engineering       | scatterly-inc     | eng-raccoon                           |                     |                     |
| Product Team             | virt-org      | product           | scatterly-inc     | prod-raccoon                          |                     |                     |
| Team Raccoon             | department    | team-raccoon      | scatterly-inc     | eng-raccoon, prod-raccoon             | beth                | Beth                |
| Raccoon Product Team     | business-unit | prod-raccoon      | team-raccoon      |                                       | nancy, mark         | Nancy, Mark         |
| Raccoon Engineering Team | department    | eng-raccoon       | team-raccoon      | eng-raccoon-cloud, eng-raccoon-onprem | jax, brit, fernando | Jax, Brit, Fernando |
| Raccoon Cloud            | team          | eng-raccoon-cloud | eng-raccoon       | eng-raccoon-aws                       | jax, fernando, paul | Jax, Fernando, Paul |
| Raccoon AWS Team         | team          | eng-raccoon-aws   | eng-raccoon-cloud |                                       | fernando, daniel    | Fernando, Daniel    |

## Create YAML for the missing teams

Now that we have the basic information we need, we can create the YAML for the missing teams.

In this example we will create a YAML for Product, Raccoon Team, Raccoon Product Team, and Raccoon Engineering Team.

Some important notes:

- OC Entity name is mapped to `metadata.name`
- Org/Team type is mapped to `spec.type`
- OC Parent is mapped to `spec.parent`
- OC Children is mapped to `spec.children`, in a comma separated format
- OC Members/Persons is mapped to `spec.members`, in a comma separated format.

See the [Team YAML reference](../catalog/catalog-yaml-format/team) for more details about each field. And the [Entity Reference](../catalog/catalog-yaml-format/entity-reference) page for more details on how to specify a reference to another entity.

:::tip These example YAML configurations are all shown as if they were in their own file. They can be concatenated into a single file by separating the contents with a triple dash `---` like in Kubernetes.
:::

:::caution The field `metadata.name` must be unique!
:::

:::note Team `eng-raccoon` can also be written as `default/eng-raccoon` or `team:default/eng-raccoon` depending on whether a namespace is needed or if a full reference to the entity (including the namespace) is needed
:::

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
    email: engineering@scatterly.com
    picture: https://avatars.dicebear.com/api/identicon/engineering@scatterly.com.svg?background=%23fff&margin=2
  parent: scatterly-inc
  children: [eng-raccoon]
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
    email: product@scatterly.com
    picture: https://avatars.dicebear.com/api/identicon/product@scatterly.com.svg?background=%23fff&margin=2
  parent: scatterly-inc
  children: [prod-raccoon]
```

:::note Person `beth` can also be written as `default/beth` or `person:default/beth` depending on whether a namespace is needed or if a full reference to the entity (including the namespace) is needed
:::

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
    email: team-raccoon@scatter.ly
    picture: https://avatars.dicebear.com/api/identicon/catalog-eng@scatterly.com.svg?background=%23fff&margin=25
    timezone: America/Los_Angeles
    slackHandle: team-raccoon
    pagerHandle: team-raccoon
  parent: scatterly-inc
  children: [eng-raccoon, prod-raccoon]
  members: [beth]
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
    email: prod-raccoon@scatterly.com
    picture: https://avatars.dicebear.com/api/identicon/prod-raccoon@scatterly.com.svg?background=%23fff&margin=2
  parent: team-raccoon
  children: [prod-raccoon-ent, prod-raccoon-oss]
  members: [nancy, mark]
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
    email: eng-raccoon@scatterly.com
    picture: https://avatars.dicebear.com/api/identicon/eng-raccoon@scatterly.com.svg?background=%23fff&margin=25
  parent: team-raccoon
  children: [eng-raccoon-cloud, eng-raccoon-onprem]
  members: [jax, brit, fernando]
```
