---
sidebar_position: 3
---

# How to Solve Problems

Here are some sample use cases that show how OpenContext can solve problems within your organization.

## S3 Buckets

If you are interested in identifying all your `S3` buckets across your Schema, you would select PlatformComponents from the Home/Catalog page.

![Fig 1 - Platform Components Catalog Page](img/solve-problems/Fig_1_PlatformComponents_All.jpg)

Then, you could filter by the type `S3`:

![Fig 2 - Platform Components Catalog Page filtered by S3 type](img/solve-problems/Fig_2_PlatformComponents_S3.jpg)

## Incident

Another **UseCase**: Let’s say Team Squirrel is experiencing an incident, but can’t identify any change to the squirrel code base. In researching via OpenContext, they select the Relations graph view:

![Fig 3 - Context Graph of eng-squirrel team](img/solve-problems/Fig_3_Graph_Squirrel.jpg)

Team Squirrel then notices a cluster toward the bottom of the graph; zooming in, they see that Dumpster Config connects to Crates. This previously-hidden Infrastructure connection allows them to investigate if there was a change to Dumpster Config that might have impacted the Squirrel team. Voilà!

![Fig 4 - Context Graph zoomed into Dumpster Config](img/solve-problems/Fig_4_Graph_Dumpster_Config.jpg)

---

## On Call

The Scatter.ly on call SRE, Jamie, is paged that `Retail App` is down. It’s 2am on a Saturday and Jamie is not as familiar with this code path as they would like. Jamie starts with the OpenContext Catalog Page

![Fig 5 - Code Components Catalog Page](img/solve-problems/Fig_5_All_Code_Components.jpg)

Being it’s 2am, Jamie finds it easier to start typing in Retail in the Filter

![Fig 6 - Code Components Catalog Page filtered by retail](img/solve-problems/Fig_6_Retail_Filter.jpg)

Seeing Retail App, Jamie clicks on it to see the Context Page

![Fig 7 - Code Component Retail App Context Page](img/solve-problems/Fig_7_Retail_App_Context.jpg)

As Jamie scans to the Context Graph, they see the `Retail App Maintenance` Clicking on this, Jamie sees the link to the Notion Document

![Fig 8 - Code Component Retail App Maintenance Context Page](img/solve-problems/Fig_8_Retail_App_Maintenance_Context.jpg)

Clicking on the Notion Document Jamie is able to find the information needed to resolve the incident.

![Fig 9 - Retail App Maintenance Notion Page](img/solve-problems/Fig_9_Retail_App_Notion_Link.png)
