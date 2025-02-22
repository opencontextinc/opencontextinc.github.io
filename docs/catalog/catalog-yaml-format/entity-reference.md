---
sidebar_position: 3
---

# Entity Reference

Entities commonly have a need to reference other entities. For example, a CodeComponent entity may want to declare who its owner is by mentioning a Team or Person entity, and a Person entity may want to declare what Team entities it is a member of. This describes how to write those references in your yaml entity declaration files.

Each entity in OpenContext is uniquely identified by the triplet of its [kind, namespace, and name](common). But that's a lot to type out manually, and in a lot of circumstances, both the kind and the namespace are fixed, or possible to deduce, or could have sane default values.

Each reference can be expressed in one of two ways: as a compact string, or as a compound reference structure.

## **String References**

This is the most common alternative, that should be used in almost all circumstances.

The string is on the form `[<kind>:][<namespace>/]<name>`, that is, it is composed of between one and three parts in this specific order, without any additional encoding:

- Optionally, the kind, followed by a colon
- Optionally, the namespace, followed by a forward slash. This is only required when the namespace is not `default`
- The name

The name is always required. Depending on the context, you may be able to leave out the kind and/or namespace. If you do, it is contextual what values will be used, and the relevant documentation should specify which rule applies where. All strings are case insensitive.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: AuxComponent
metadata:
  name: crates-docs
  title: Crates docs
  description: Crates documentation
  tags:
    - java
spec:
  type: document
  lifecycle: production
  owner: [person:sean]
  service: crates
  uri: https://example.com/docs
```

The field `spec.owner` is a reference. In this case, the string `person:sean` was given by the user. That means that the kind is `Person`, the namespace is left out, and the name is `sean`. In this context, the namespace was chosen to fall back to the value `default` by the code that parsed the reference, so the end result is that we expect to find another entity in the catalog that is of kind `Person`, namespace `default` (which, actually, also can be left out in its own yaml file because that's the default value there too), and name `sean`.

The entry in `spec.service` is also a reference. In this case, it doesn’t need to specify a kind since we know from the context that that's the only kind that's supported here. If namespace was to be specified then the value would change to `default/crates`.

## **Compound References**

This is a more verbose version of a reference, where each part of the kind-namespace-name triplet is expressed as a field in a structure. This format can be used where necessary, such as if either of the three elements contains colons or forward slashes. Avoid using it where possible, since it is harder to read and write for humans.

```yaml
apiVersion: opencontext.com/v1alpha1
kind: Service
metadata:
  name: it-service
  description: IT operations
spec:
  owner:
    kind: Team
    name: contractor-group/it-ops
```

In this example, the `spec.owner` has been broken apart since the name was complex. The kind happened to be written with an uppercase letter T, which also works. The namespace was left out just like in the string version above, which is handled identically.

## **Figuring out an entity reference based on its catalog URL**

In OpenContext the catalog URL of an entity contains the parts used for an entity reference. For instance, if a catalog entity's URL ends with `catalog/contractor-group/team/it-ops` then:

- Kind = `Team`
- Namespace = `contractor-group`
- Name = `it-ops`
- String reference = `team:contractor-group/it-ops`
- Compound reference = See above in the [Compound References section](#compound-references)
