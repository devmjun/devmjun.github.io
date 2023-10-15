---
layout:     post
title:      "Mac. zip파일에 암호 거는 방법"
subtitle:   "터미널에서 하는 방법!"
date:       2018-02-28 14:44:00
author:     "MinJun"
header-img: "img/tags/Mac-bg.jpg"
comments: true 
tags: [Mac]
categories: archive
permalink: /archive/:title
---

아래와 같이 zip 파일에 암호를걸어서 간단하게 보호해야할 파일에 암호를 걸수 있습니다. 일반적인 경우가 아닌 좀더 복잡한 암호 과정이 필요한 경우 `openssl`과 같은 명령어를 사용해 암호화 하는것이 적절합니다. <br>

<center><img src="/img/posts/password_Zip.png" width="500" height="300"></center> <br> 

---

## .zip 파일에 암호 걸기 

`.zip`파일에 암호를 넣을시 `-e` 옵션을 이용하면 됩니다. 파일이 여러개이거나 폴더를 한꺼번에 압축할때는 `-r` 옵션을 추가합니다.

```
zip -er [압축파일 이름] [압축될 파일 이름]
* [] <- 는 사용하지 않습니다. 
```

아래의 경우에는 *(wildcards)를 사용해서 폴더 내의 모든 파일을 선택했지만, 본인이 원하는 파일을 그냥 적어넣기만 해도 가능합니다. 

- all.txt
- *.txt(.txt를 포함하는 모든파일)
- all[0-1].txt(all0.txt, all1.txt)

```vi
* command line
~/Desktop  // 압축할 폴더가 있는곳으로 갑니다.
$ zip -er targetfolder.zip *

Enter password:
Verify password:

adding: aaa.txt (stored 0%) .....
adding: bbb.txt (stored 0%) .....
adding: ccc.txt (stored 0%) .....
```

압축 해제를 할시, `unzip` 커맨드만 사용해주면됩니다. 혹은 `GUI`환경에서는 더블클릭 -> 압축 해제 하셔도 됩니다.(이때 암호를 입력 창이 뜨게됩니다)

zip -er [압축파일 이름] [압축될 파일 이름]
아래 경우엔 *(wildcards)를 써서 폴더 내의 모든 파일을 지칭했지만, 본인이 원하는 파일을 그냥 적어주시기만 하면 됩니다. 예를 들면 아래와 같습니다.

```vi
~/Desktop (528) $unzip targetfolder.zip
Archive: targetfolder.zip
[archive.zip] aaa.txt password:
```

---

## openssl를 이용하여 암호화/복호화하기

[OpenSSL 이란?](https://en.wikipedia.org/wiki/OpenSSL) WWW 브라우저와 웹 서버 간에 데이터를 안전하게 주고 받기 위한 업계 표준 프로토콜을 의미합니다. 모든 버전의 Unix 기반 운영체제와 윈도우 등에서 이용가능합니다. <br>

OpenSSL is a software library for applications that secure communications over computer networks against eavesdropping or need to identify the party at the other end. It is widely used in internet web servers, serving a majority of all web sites. – 위키피디아 <br>

<center><img src="/img/posts/password_Zip-1.png" width="500" height="300"></center> <br> 

위 그림은 openssl을 이용하여 암호화한 모습입니다. 터미널에서 암호 및 복호화하는 방법은 아래와 같습니다.

* 암호화 형식 : `openssl des3 -salt -in [암호화할 파일] -out [암호화 후 생성될 파일]`

```vi
openssl des3 -salt -in a.txt -out encrypted.txt
```

* 복호화 형식 : `openssl des3 -d -salt -in [복호화할 파일] -out [복호화 후 생성될 파일]`

```vi
openssl des3 -d -salt -in encrypted.txt -out a.txt
```

---

## Reference 

[https://macinjune.com/mac/tip/%EB%A7%A5%EB%B6%81-macos-zip%ED%8C%8C%EC%9D%BC%EC%97%90-%EC%95%94%ED%98%B8-%EA%B1%B0%EB%8A%94-%EB%B0%A9%EB%B2%95/](https://macinjune.com/mac/tip/%EB%A7%A5%EB%B6%81-macos-zip%ED%8C%8C%EC%9D%BC%EC%97%90-%EC%95%94%ED%98%B8-%EA%B1%B0%EB%8A%94-%EB%B0%A9%EB%B2%95/)

---










