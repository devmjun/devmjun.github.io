---
layout: post
title: 혼자공부하는 머신러닝 정리 2 (훈련 세트와 테스트 세트)
subtitle: 훈련세트, 테스트 세트, 지도 학습(supervised learning), 비지도 학습(unsupervised learnings) 
author: MinJun Ju
comments: true
toc: true 
tags: [ml, ai, deep learning, supervised training]
categories: ml
cover-img: /assets/post_img/background/architecture-3119812.jpg
thumbnail-img: /assets/post_img/background/architecture-3119812.jpg
share-img: /assets/post_img/background/architecture-3119812.jpg
---

{: .box-note}
**Note**: [<혼자 공부하는 머신러닝+딥러닝>을 참고 했습니다.](https://github.com/rickiepark/hg-mldl)

<br>

## 지도 학습과 비지도 학습

머신러닝 알고리즘은 크게 `지도 학습(supervised learnings)`, `비지도 학습(unsupervised learnings)`로 나뉩니다. 지도 학습 알고리즘은 훈련하기 위한 데이터와 정답이 필요합니다. 

{: .box-note}
**Note**: 지도 학습, 비지도 학습 외에 강화 학습(reinforcement learnings)을 또 다른 종류로 크게 분류 합니다. 강화 학습 알고리즘은 타깃이 아니라 알고리즘이 행동한 결과로 얻은 보상을 사용해 학습됩니다. 

지도 학습에서는 데이터와 정답을 **입력(input)**과 **타깃(target)**이라고 하고, 이 둘을 합쳐 훈련 데이터(training data)라고 부릅니다. 그리고 전편의 [혼자공부하는 머신러닝 정리 1](http://devmjun.github.io/category/ml/2023/11/07/k_kneighborsclassifier.html) 길이와 무게를 **특성(feature)**라고 합니다.

---

## 훈련 세트와 테스트 세트

이미 준비된 데이터 중에서 일부를 떼어 훈련 세트(train set) 테스트 세트(test set)를 나누거나, 테스트 세트를 따로 준비하여 사용합니다.

{: .box-note}

---

## 셈플링 편향

훈련 세트와 테스트 세트에 샘플이 골고루 섞여 있지 않으면 샘플링이 한쪽으로 치우쳤다는 의미로 샘플링 편향(sampling bias)라고 부릅니다. 

---

## sklearn 으로 훈련 세트와 테스트 세트 나누기

[Reference: sklearn.model_selection.train_test_split](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html#sklearn.model_selection.train_test_split)

{% highlight python linenos %}
from sklearn.model_selection import train_test_split
train_input, test_input, train_target, test_target = train_test_split(data, target)
{% endhighlight %}

---

## Reference

- [<혼자 공부하는 머신러닝+딥러닝>](https://github.com/rickiepark/hg-mldl)
- [sklearn](https://scikit-learn.org)