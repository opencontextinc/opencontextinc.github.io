---
sidebar_position: 3
---

# Add additional data to the auto-discovered Teams

To add additional data to an auto-discovered Team, we will need to create an `infocard` type of [AuxComponent YAML](../catalog-yaml-format/aux-component) file.

To do so we need to find out the Team's entity name in OpenContext.

To get their entity name, start at the main OpenContext catalog.

- Once in the catalog, use the dropdown on the top left to select `Teams`.
- Find your team that needs additional data.
- Click the team name to view their team page.
- Next, check the URL for their page. Each team URL ends with something like `team/eng-raccoon`.
- In this case, `eng-raccoon` is the Team's entity name in OpenContext. You'll use this team name to create your new YAML file (see below).

Let's say we want to add the following information:

- A link to Slack
- A link to Jira

To do this, you'll create the following [AuxComponent YAML](../catalog-yaml-format/aux-component) file.

:::tip The `metadata.name` should be something short and meaningful
:::

```yaml
apiVersion: opencontext.com/v1alpha1
kind: AuxComponent
metadata:
  name: eng-raccoon-info
  title: Eng Raccoon Info
  description: Additional links for Eng Raccoon
  links:
    - url: https://slack.com
      title: Slack
      icon: chat
    - url: https://jira.com
      title: Jira
      icon: dashboard
spec:
  type: infocard
  lifecycle: production
  owner: [eng-raccoon]
```

_ Please note: A list of supported icons can be found [here](../catalog-yaml-format/common#supported-icons)._
