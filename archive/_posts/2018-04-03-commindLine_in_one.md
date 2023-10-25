---
layout:     post
title:      "Git, 커맨드라인에서 Add-Commit-push 한번에 하는방법"
subtitle:   "꿀팁.."
date:       2018-04-03 17:22:00
author:     "MinJun"
comments: true 
tags: [Git]
categories: archive
permalink: /archive/:title
cover-img: /assets/post_img/background/search-bg_sub.jpg
thumbnail-img: /assets/post_img/background/search-bg_sub.jpg
share-img: /assets/post_img/background/search-bg_sub.jpg
toc: true
---

커맨드라인에서 git add .... git commit -m .... git push orign ....을 사용했던 방법을 한번의 명령어를 통해서 수행할수 있게 만들어봅니다. 

alias에 일종의 명령어 함수(?)처럼 등록해놓고 해당 함수를 호출하며 사용하는 방법입니다.입니다. 

- [git-scm](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-Git-Alias)<br>
- [참조 링크 입니다](https://stackoverflow.com/questions/19595067/git-add-commit-and-push-commands-in-one)

---

커맨드라인에서 아래의 코드를 작성합니다.

```
git config --global alias.cmp '!f() { git add -A && git commit -m "$@" && git push; }; f'
```

alias 에 `cmp` 라는 명령을 등록하여 사용할수 있습니다. 

---

## Usage 

```
git cmp "커밋 메시지"
```

