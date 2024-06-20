---
sidebar_position: 2
---

# Add additional data to auto-discovered CodeComponents

Additional data can be added to discovered CodeComponents by using a dotfile (also known as a [hidden file](https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory)). This file should be added to the root of the repository to be imported, and have the name `.opencontext`.

Several fields can be added through this file. All are optional.

The dotfile uses this format:

```yaml
codecomponent:
  datacenter?: string[]
  lifecycle?: string
  priority?: number
  service?: string
  sla?: string
  subcomponentOf?: string[]
  dependsOn?: string[]
  annotations?: Record<string, string>;
  links?: EntityLink[];
```

Here's an example:

```yaml
codecomponent:
  lifecycle: experimental
  service: greenhouse
  datacenter: aws-us
  priority: 5
  sla: 2x2
  annotations:
    - pagerduty.com/service-id: 'ABC123'
  dependsOn: ['platformcomponent:retail-vm']
```

If you're adding links to the CodeComponent's Links card, you'll need to use the EntityLink format.

```typescript
export type EntityLink = {
  /**
   * The url to the external site, document, etc.
   */
  url: string;

  /**
   * An optional descriptive title for the link.
   */
  title?: string;

  /**
   * An optional semantic key that represents a visual icon.
   */
  icon?: string;
};
```

You can choose from a few of [MUI's Material Icons][material-icons] to for your links. OpenContext includes the following:

- catalog
- chat
- code
- dashboard
- docs
- email
- github
- help
- search
- team
- website

Link example:

```yaml
links:
  - url: https://cybersquirrel1.com/
    title: Cyber Squirrel
    icon: dashboard
```

You can also find [additional information on the CodeComponent format](../catalog-yaml-format/code-component.md).

[material-icons]: https://mui.com/material-ui/material-icons/
