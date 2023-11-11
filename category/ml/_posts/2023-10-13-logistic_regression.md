---
layout: post
title: 혼자공부하는 머신러닝 정리 7 (로지스틱회귀)
subtitle: Logistic regression
author: MinJun Ju
comments: true 
toc: true
tags: [ml, ai, deep learning, supervised training]
categories: ml
cover-img: /assets/post_img/background/hintersee-3601004.jpg
thumbnail-img: /assets/post_img/background/hintersee-3601004.jpg
share-img: /assets/post_img/background/hintersee-3601004.jpg
---

{: .box-note}
**Note:** [<혼자 공부하는 머신러닝+딥러닝>을 참고 했습니다.](https://github.com/rickiepark/hg-mldl)

<br> 

## 로지스틱 회귀

`로지스틱 회귀(logistic regression)`는 이름은 회귀이지만 분류 모델 입니다. 이 알고리즘은 선형 회귀와 동일하게 선형 방정식을 학습합니다. 
예를들면

z= a * (features 1)+ b * (feature 2) + c * (feature 3) .. + d 
여기서 a, b, c는 가중치 혹은 계수 입니다. z는 어떤값도 가능합니다. 하지만 확률이 되려면 0~1(0~100%) 사이 값이 되어야 합니다. 

z가 아주 큰 음수일 때 0이되고, z가 아주 큰 양수일때 1이 되도록 바꾸는 방법은 시그모이드 함수(sigmoide function)또는 로지스틱 함수(logistic function)을 사용하면 가능 합니다. 

{% highlight python linenos %}
import numpy as np
import matplotlib.pyplot as plt

z = np.arange(-5, 5, 0.1)
phi = 1 / (1 + np.exp(-z))

plt.plot(z, phi)
plt.xlabel('z')
plt.ylabel('phi')
plt.show()
{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter4-0.png' | relative_url }}){: .mx-auto.d-block :}

{: .box-note}
정확히 0.5일땐 라이브러리마다 다릅니다. 사이킷런은 0.5일 때 음성 클래스로 판단합니다.


---

## 로지스틱 회귀로 이진 분류 수행하기

### 데이터 준비하기

```python
import pandas as pd

fish = pd.read_csv('https://bit.ly/fish_csv_data')
fish.head()
fish_input = fish[['Weight','Length','Diagonal','Height','Width']].to_numpy()
fish_target = fish['Species'].to_numpy()
from sklearn.model_selection import train_test_split

train_input, test_input, train_target, test_target = train_test_split(
    fish_input, fish_target, random_state=42)

from sklearn.preprocessing import StandardScaler

ss = StandardScaler()
ss.fit(train_input)
train_scaled = ss.transform(train_input)
test_scaled = ss.transform(test_input)
```

### 학습하기

```python
bream_smelt_indexes = (train_target == 'Bream') | (train_target == 'Smelt')
train_bream_smelt = train_scaled[bream_smelt_indexes]
target_bream_smelt = train_target[bream_smelt_indexes]

from sklearn.linear_model import LogisticRegression

lr = LogisticRegression()
lr.fit(train_bream_smelt, target_bream_smelt)
```

### 예측확률 출력하기

```python
print(lr.predict_proba(train_bream_smelt[:5]))

>[[0.99759855 0.00240145]
 [0.02735183 0.97264817]
 [0.99486072 0.00513928]
 [0.98584202 0.01415798]
 [0.99767269 0.00232731]]
```

샘플마다 2개의 확률이 출력되었습니다. 첫 번째 열이 음성 클래스(0)에 대한 확률이고 두 번째 열이 양성 클래스(1)에 대한 확률 입니다. 

```python
print(lr.classes_)
> ['Bream' 'Smelt']
```

타깃값은 알파벳순으로 정렬하여 사용합니다. Smelt가 양성 클래스 입니다. 

### 결과 확인하기

```python
print(lr.coef_, lr.intercept_)
> [[-0.4037798  -0.57620209 -0.66280298 -1.01290277 -0.73168947]] [-2.16155132]

decisions = lr.decision_function(train_bream_smelt[:5])
print(decisions)
> [-6.02927744  3.57123907 -5.26568906 -4.24321775 -6.0607117 ]
```

---

## 로지스틱 회귀로 다중 분류 수행하기

다중 분류도 크게 다르지 않습니다. LogisticRegression 클래스를 사용하여 7종류의 생선을 분류해 차이점을 알아봅니다.

{% highlight python linenos %}
lr = LogisticRegression(C=20, max_iter=1000)
lr.fit(train_scaled, train_target)

print(lr.score(train_scaled, train_target))
print(lr.score(test_scaled, test_target))

> 0.9327731092436975
> 0.925
{% endhighlight %}

{% highlight python linenos %}
print(lr.predict(test_scaled[:5]))

proba = lr.predict_proba(test_scaled[:5])
print(np.round(proba, decimals=3))
print(lr.classes_)

> ['Perch' 'Smelt' 'Pike' 'Roach' 'Perch']
> [[0.    0.014 0.841 0.    0.136 0.007 0.003]
 [0.    0.003 0.044 0.    0.007 0.946 0.   ]
 [0.    0.    0.034 0.935 0.015 0.016 0.   ]
 [0.011 0.034 0.306 0.007 0.567 0.    0.076]
 [0.    0.    0.904 0.002 0.089 0.002 0.001]]
> ['Bream' 'Parkki' 'Perch' 'Pike' 'Roach' 'Smelt' 'Whitefish']
{% endhighlight %}

LogisticRegression은 기본적으로 릿지 회귀와 같이 계수의 제곱을 규제합니다. 이런 규제를 L2규제라고 불브니다. LogisticRegression에서 규제를 제어하는 매개변수는 C 입니다. C는 alpha와 반대로 작을수록 규제가 커집니다. C의 기본값은 1 입니다. 

이진분류일경우 probar의 결과값이 두개의 열이었습니다. 다중분류는 샘플 종류만큼 늘어납니다. 

다중분류에서는 소프트맥스(softmax)함수를 사용하여 7개의 z값을 확률로 반환합니다. 

![result]({{ 'https://www.researchgate.net/publication/368623837/figure/fig3/AS:11431281120959629@1676731357872/A-simplified-diagram-of-the-model.png' | relative_url }}){: .mx-auto.d-block :}

{: .box-note}
**Source:** https://www.researchgate.net/publication/368623837/figure/fig3/AS:11431281120959629@1676731357872/A-simplified-diagram-of-the-model.png 

[소프트맥스 관련 레퍼런스](https://velog.io/@francomoon7/%EC%98%88%EC%B8%A1%EC%97%90-Softmax%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)

---


## Reference

- [<혼자 공부하는 머신러닝+딥러닝>](https://github.com/rickiepark/hg-mldl)
- [sklearn](https://scikit-learn.org)
- [소프트맥스 관련 레퍼런스]([소프트맥스 관련 레퍼런스](https://velog.io/@francomoon7/%EC%98%88%EC%B8%A1%EC%97%90-Softmax%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0))
