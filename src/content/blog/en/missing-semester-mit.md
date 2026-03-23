---
title: 'The MIT "Missing Semester": the tools your university never taught you'
description: 'MIT offers a free course on the everyday tools of the developer. A condensed set of best practices too often overlooked in traditional curricula.'
date: 2026-03-19
updatedDate: 2026-03-23
slug: 'missing-semester-computer-science-mit'
tags: ['Tools', 'Terminal', 'Git', 'Productivity', 'Learning']
image: '../img/missing-semester-mit.png'
lang: en-US
---

CS curricula train engineers capable of designing complex algorithms, modelling distributed architectures, or reasoning about language theory. But they systematically miss a topic that is nonetheless fundamental: mastering everyday tools.

This is exactly the observation made by MIT instructors who created the [Missing Semester of Your CS Education](https://missing.csail.mit.edu/). A free course, available online, that fills this gap with remarkable effectiveness. After the 2019 and 2020 editions that I followed with interest, a 2026 edition has just been published. Its content has been updated to reflect the evolution of practices and tools, marked by the strong progression of AI.

## A training gap on key topics

A computer science student spends hundreds of hours using a terminal, a text editor, or a version control system. Yet, in the vast majority of curricula, no one really teaches these tools. They cobble things together, copy commands from Stack Overflow or ChatGPT, accumulate bad habits without ever understanding what they're doing.

The result: graduate engineers who can't write a clean shell script, who do `git add .` without thinking, or who freeze at the idea of rebasing a branch. I've seen this personally: a significant number of developers have absolutely no understanding of Git's internal workings, and don't really know what such basic concepts as a commit, a branch, or a tag actually mean.

## The curriculum

The 2026 program is structured around nine sessions (videos available on [this YouTube playlist](https://www.youtube.com/playlist?list=PLyzOVJj3bHQunmnnTXrNbZnBaCA-ieK4L)):

- **[The Shell and Command Line](https://missing.csail.mit.edu/2026/course-shell/)**: navigation, redirection, pipes, Bash scripting. The foundations on which everything else rests.
- **[The Command-Line Environment](https://missing.csail.mit.edu/2026/command-line-environment/)**: setting up a consistent environment, managing dotfiles, customizing the terminal.
- **[Development Environment and Tooling](https://missing.csail.mit.edu/2026/development-environment/)**: editors, LSP, snippets — getting the most out of your development environment.
- **[Debugging and Profiling](https://missing.csail.mit.edu/2026/debugging-profiling/)**: using the right tools to identify and fix problems, rather than blindly adding `print` statements.
- **[Version Control with Git](https://missing.csail.mit.edu/2026/version-control/)**: beyond the simple `commit/push`, understanding Git's data model to use it with confidence. A must-watch for anyone still hesitant.
- **[Packaging and Distribution](https://missing.csail.mit.edu/2026/shipping-code/)**: how to package and deliver code in a reproducible way.
- **[Agentic Coding](https://missing.csail.mit.edu/2026/agentic-coding/)**: integrating AI tools into the development workflow, treated as a skill in its own right rather than a gimmick.
- **[Beyond the Code](https://missing.csail.mit.edu/2026/beyond-code/)**: security, privacy, and best practices beyond the code itself.
- **[Code Quality](https://missing.csail.mit.edu/2026/code-quality/)**: linters, formatters, code review — the practices that make the difference between a maintainable project and one you dread opening.

## What I like about this approach

The course doesn't try to be exhaustive. It aims to spark a realization: showing that there is a more efficient, more deliberate way to work with your tools. Once that realization clicks, everyone can go deeper at their own pace.

I also appreciate that the 2026 edition natively integrates _agentic coding_, illustrating it with Claude Code on a few basic use cases. The subject is treated as a skill in its own right, on the same level as Git or the shell.

Finally, the fairly intensive use of the terminal fits perfectly with my own personal preferences!

## Conclusion

This course is useful for several profiles:

- **Students or junior engineers** who have never really taken the time to understand their tools.
- **Experienced developers** who have accumulated habits without ever questioning them.
- **CTOs and tech leads** who want to share a solid common foundation with their teams.
- Anyone who wants to be able to do an interactive rebase while _truly_ understanding what they're doing!

The content is in English and perfectly accessible. Each session is accompanied by detailed course notes and practical exercises that I warmly recommend.
