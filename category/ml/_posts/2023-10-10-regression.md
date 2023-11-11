---
layout: post
title: 혼자공부하는 머신러닝 정리 4 (k-최근접 이웃 회귀)
subtitle: KNeighborsRegressor
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
**Note:** [<혼자 공부하는 머신러닝+딥러닝>을 참고 했습니다.](https://github.com/rickiepark/hg-mldl)

<br>

앞 포스팅[혼자공부하는 머신러닝 정리 3 (k-최근접 이웃)](http://devmjun.github.io/category/ml/2023/11/09/k_kneighborsclassifier.html)에서 k-최근접 이웃 알고리즘으로 분류문제를 다뤘습니다. 
class를 분류하는게 아닌, 특정 값을 예측해야할때 어떻게 해야할까요?

k-최근접 이웃 회귀 알고리즘에 대해서 알아봅니다.

---

회귀는 클래스 중 하나로 분류하는 것이 아니라 임의의 어떤 숫자를 예측하는 문제 입니다. 에를들어 내년도 경제성장률, 배달 도착 시간을 예측하는 것이 회귀 문제 입니다. 

{: .box-note}
**Note,** 회귀: [두 변수 사이의 상관 관계를 분석하는 방법](https://ko.wikipedia.org/wiki/%ED%9A%8C%EA%B7%80_%EB%B6%84%EC%84%9D)

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter3-01.png' | relative_url }}){: .mx-auto.d-block :} 

source: https://ko.wikipedia.org/wiki/%ED%9A%8C%EA%B7%80_%EB%B6%84%EC%84%9D
![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter3-02.png' | relative_url }}){: .mx-auto.d-block :}  

source: https://wikidocs.net/30806

---

## K-최근접 이웃 회귀

KNN(k-nearest neighbor) 는 샘플 주위의 거리를 계산하여 예측합니다.
K-최근접 이웃 회귀(k-nearest neighbor regression)은 어떤 클래스가 아니라 임의의 수치 입니다. 

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter3-05.png' | relative_url }}){: .mx-auto.d-block :} 

{: .box-note}
**source:** https://www.jeremyjordan.me/k-nearest-neighbors/

---

## 데이터 준비

{% highlight python linenos %}
## 데이터 준비
import numpy as np
perch_length = np.array(
    [8.4, 13.7, 15.0, 16.2, 17.4, 18.0, 18.7, 19.0, 19.6, 20.0,
     21.0, 21.0, 21.0, 21.3, 22.0, 22.0, 22.0, 22.0, 22.0, 22.5,
     22.5, 22.7, 23.0, 23.5, 24.0, 24.0, 24.6, 25.0, 25.6, 26.5,
     27.3, 27.5, 27.5, 27.5, 28.0, 28.7, 30.0, 32.8, 34.5, 35.0,
     36.5, 36.0, 37.0, 37.0, 39.0, 39.0, 39.0, 40.0, 40.0, 40.0,
     40.0, 42.0, 43.0, 43.0, 43.5, 44.0]
     )
perch_weight = np.array(
    [5.9, 32.0, 40.0, 51.5, 70.0, 100.0, 78.0, 80.0, 85.0, 85.0,
     110.0, 115.0, 125.0, 130.0, 120.0, 120.0, 130.0, 135.0, 110.0,
     130.0, 150.0, 145.0, 150.0, 170.0, 225.0, 145.0, 188.0, 180.0,
     197.0, 218.0, 300.0, 260.0, 265.0, 250.0, 250.0, 300.0, 320.0,
     514.0, 556.0, 840.0, 685.0, 700.0, 700.0, 690.0, 900.0, 650.0,
     820.0, 850.0, 900.0, 1015.0, 820.0, 1100.0, 1000.0, 1100.0,
     1000.0, 1000.0]
     )

import matplotlib.pyplot as plt
plt.scatter(perch_length, perch_weight)
plt.xlabel('length')
plt.ylabel('weight')
plt.show()
{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter3-04.png' | relative_url }}){: .mx-auto.d-block :} 

데이터를 시각화하여 확인합니다. 

---

## 훈련 데이터와 테스트 데이터 생성

{% highlight python linenos %}
from sklearn.model_selection import train_test_split
train_input, test_input, train_target, test_target = train_test_split(
    perch_length, perch_weight, random_state=42)

train_input = train_input.reshape(-1, 1)
test_input = test_input.reshape(-1, 1)
{% endhighlight %}

---

## 결정계수(R<sup>2</sup>)

사이킷런에서 k-최근접 이웃 회귀 알고리즘을 구현한 클래스는 KNeighborsRegressor 입니다. 

{% highlight python linenos %}
from sklearn.neighbors import KNeighborsRegressor

knr = KNeighborsRegressor()

## k-최근접 이웃 회귀 모델을 훈련합니다
knr.fit(train_input, train_target)

knr.score(test_input, test_target)

> 0.992809406101064
{% endhighlight %}

분류의 경우 테스트 세트에 있는 샘플을 정확하게 분류한 개수의 비율 입니다. 
회귀의 경우 조금 다른 값으로 평가하는데 `이 점수를 결정계수(coefficient of determination)` 이라고 부릅니다.

계산식 = R<sup>2</sup> = 1 - (타깃-예측)<sup>2</sup> 의 합 / (타깃-평균)<sup>2</sup> 의 합

knr.score 점수가 높습니다. 하지만 정확도처럼 R<sup>2</sup>가 직감적으로 얼마나 좋은지 이해하기 어렵습니다. 대신 다른값을 계산해 보죠. 
타깃과 예측한 값 사이의 차이를 구해보면 어느 정도 예측이 벗어났는지 가늠하기 좋습니다. 

{% highlight python linenos %}
from sklearn.metrics import mean_absolute_error
# 테스트 세트에 대한 예측을 만듭니다
test_prediction = knr.predict(test_input)
# 테스트 세트에 대한 평균 절댓값 오차를 계산합니다
mae = mean_absolute_error(test_target, test_prediction)
print(mae)
> 19.157142857142862
{% endhighlight %}

결과에서 예측이 평균적으로 19g 정도 타깃값과 다르다는 것을 알 수 있습니다. 

---

## 과대적합 vs 과소적합

만약 훈련 세트에서 점수가 굉장히 좋았는데 테스트 세트에서는 점수가 굉장히 나쁘다면 모델이 훈련 세트에 `과대적합(overfitting)` 되었다고 말합니다. 즉 훈련 세트에만 잘 맞는 모델이라 테스트 세트와 나중에 실전에 투입하여 새로운 샘플에 대한 예측을 만들 때 잘 동작하지 않을 것 입니다. 

반대로 훈련 세트보다 테스트 세트의 점수가 높거나 두 점수가 모두 낮은 경우는 `과소적합(underfitting)` 되었다고 말합니다. 모델이 너무 단순한여 훈련 세트에 적절히 훈련되지 않은 경우 입니다. 훈련 세트가 전체 데이터를 대표한다고 가정하기 때문에 훈련 세트를 잘 학스하는 것이 중요 합니다. 

{: .box-note}
**Note:** 훈련 세트와 테스트 세트의 크기 매우 작으면 과소 적합이 발생할 수 있습니다. 

앞서 k-최근저 이웃 회귀로 평가한 모델은 테스트 세트의 점수가 높으니 과소적합 입니다. 이를 해결하는 방법은 모델을 더 복잡하게 만들어 이웃의 개수 k-를 줄이는 것 입니다.

이웃의 개수를 줄이면 훈련 세트에 있는 국지적인 패턴에 민감해지고, 
이웃의 개수를 늘리면 데이터 전반에 있는 일반적인 패턴을 따를것 입니다. 

---

### 과대적합 및 과소적합 해결

k-최근접 이웃 회귀 모델의 k 값을 변경하여 
모델이 단순해져 과대적합 과소적합이 해소 되는지 시각화 하여 확인해봅니다.

{% highlight python linenos %}
import matplotlib.pyplot as plt
import numpy as np
from sklearn.neighbors import KNeighborsRegressor

# k-최근접 이웃 회귀 객체를 만듭니다
knr = KNeighborsRegressor()

x = np.arange(5, 45).reshape(-1, 1)
fig, axes = plt.subplots(3, 2, figsize=(16, 16))

for i, n in enumerate([1, 3, 5, 10, 15, 20]):
    # 모델 훈련
    knr.n_neighbors = n
    knr.fit(train_input, train_target)
    # 지정한 범위 x에 대한 예측 구하기
    prediction = knr.predict(x)
    
    # 각각의 그래프 영역에 그래프 그리기
    row, col = i // 2, i % 2
    ax = axes[row, col]
    
    ax.scatter(train_input, train_target)
    ax.plot(x, prediction)
    ax.set_title('n_neighbors = {}'.format(n))
    ax.set_xlabel('length')
    ax.set_ylabel('weight')

# 그래프 레이아웃 조정
plt.tight_layout()
plt.show()

{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter3-06.png' | relative_url }}){: .mx-auto.d-block :} 

---


## Reference

- [<혼자 공부하는 머신러닝+딥러닝>](https://github.com/rickiepark/hg-mldl)
- [sklearn](https://scikit-learn.org)