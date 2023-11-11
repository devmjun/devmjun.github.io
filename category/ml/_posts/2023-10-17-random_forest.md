---
layout: post
title: 혼자공부하는 머신러닝 정리 11 (트리의 앙상블)
subtitle: Random Forest, ensemble learning
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

정형 데이터를 다루는 데 가장 뛰어난 성과를 내는 알고리즘인 앙상블 학습(ensemble learning)에 대해 알아봅니다.

<br>

## 랜덤 포레스트(Random Forest)

랜덤 포레스트는 앙상블 학습의 대표 주자 중 하나로 안정적인 성능 덕분에 널리 사용되고 있습니다. 
랜덤 포레스트는 결정 트리를 랜덤하게 마늘어 결정 트리(나무)의 숲을 만듭니다. 

그리고 각 결정 트리의 예측을 사용해 최종 예측을 만듭니다. 
그럼 랜덤 포레스트가 어떻게 숲을 구성하는지 관찰해 보죠. 

![result]({{ 'https://cdn2.picryl.com/photo/2020/12/21/random-forest-is-an-open-source-algorithm-that-functions-6cecd3-1024.jpg' | relative_url }}){: .mx-auto.d-block :}

예를 들어 1,000개의 샘플이 들어있는 가방에서 100개의 샘플을 뽑늗다면 먼저 1개를 뽑고, 뽑았던 1개를 다시 가방에 넣습니다. 
이런 식으로 계속해서 100개를 가방에서 뽑으면 `중복된 샘플`을 뽑을 수 있습니다. 
이렇게 만들어진 샘플을 `부트스트랩 샘플(bootstrap sample)`라고 부릅니다. 

기본적으로 부트스트랩 샘플은 훈련 세트의 크기와 같게 만듭니다. 

{: .box-note}
**Note:** 부트스트랩: 보통 데이터 세트에서 중복을 허용하여 데이터를 샘플링하는 방식을 의미합니다.

랜덤 포레스트는 랜덤하게 선택한 샘플과 특성을 사용하기 대문에 훈련 세트에 과대적합되는것을 막아주고 검증 세트와 테스트 세트에서 안정적인 성능을 얻을 수 있습니다. 


{% highlight python linenos %}
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

wine = pd.read_csv('https://bit.ly/wine_csv_data')

data = wine[['alcohol', 'sugar', 'pH']].to_numpy()
target = wine['class'].to_numpy()

train_input, test_input, train_target, test_target = train_test_split(data, target, test_size=0.2, random_state=42)
from sklearn.model_selection import cross_validate
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_jobs=-1, random_state=42)
scores = cross_validate(rf, train_input, train_target, return_train_score=True, n_jobs=-1)

print(np.mean(scores['train_score']), np.mean(scores['test_score']))
---
0.9973541965122431 0.8905151032797809
---
rf.fit(train_input, train_target)
print(rf.feature_importances_)
---
[0.23167441 0.50039841 0.26792718]
---
rf = RandomForestClassifier(oob_score=True, n_jobs=-1, random_state=42)

rf.fit(train_input, train_target)
print(rf.oob_score_)
---
0.8934000384837406
{% endhighlight %}

print(rf.feature_importances_) 값을 살펴보면 결정 트리에서 만든 특성 중요도와 비교 하였을때 값이 도드라지는게 적습니다. 이런 이유는 랜덤 포레스트가 특성의 일부를 랜덤하게 선택하여 결정 트리를 훈련하기 대문입니다. `그 결과 하나의 특성에 과도하게 집중하지 않고고 좀 더 많은 특성이 훈련에 기여할 기회를 얻습니다.` 

---

## 엑스트라 트리(Extra trees)

엑스트라 트리는 랜덤 포레스트와 매우 비슷하게 작동합니다. 차이점은 부트스트랩 샘플을 사용하지 않는다는 점 입니다. 각 결정 트리를 만들 때 전체 훈련 세트를 사용합니다. 대신 노드를 분할할 때 가장 좋은 분할알을 찾는 것이 아니라 무작위로 분할합니다. 

하나의 결정 트리에서 특성을 무작위로 분할한다면 성능이 낮아지겠지만 많은 트리를 앙상블 하기 때문에 과대적합을 막고 검증 세트의 점수를 높이는 효과가 있습니다. 

{% highlight python linenos %}
rom sklearn.ensemble import ExtraTreesClassifier

et = ExtraTreesClassifier(n_jobs=-1, random_state=42)
scores = cross_validate(et, train_input, train_target, return_train_score=True, n_jobs=-1)

print(np.mean(scores['train_score']), np.mean(scores['test_score']))
et.fit(train_input, train_target)
print(et.feature_importances_)
---
0.9974503966084433 0.8887848893166506
[0.20183568 0.52242907 0.27573525]
{% endhighlight %}

---

## 그레이디언트 부스팅(Gradient boosting) 

그레이디언트 부스팅은 깊이가 얕은 결정 트리를 사용하여 이전 트리의 오차를 보완하는 방식으로 앙상블 하는 방법입니다. 깊이가 3인 결정 트리를 100개 사용합니다. 깊이가 얕은 결정 트리를 사용하기 때문에 과대적합에 강하고 일반적으로 높은 일반화 성능을 기대할 수 있습니다. 

{% highlight python linenos %}
from sklearn.ensemble import GradientBoostingClassifier

gb = GradientBoostingClassifier(random_state=42)
scores = cross_validate(gb, train_input, train_target, return_train_score=True, n_jobs=-1)

print(np.mean(scores['train_score']), np.mean(scores['test_score']))
gb = GradientBoostingClassifier(n_estimators=500, learning_rate=0.2, random_state=42)
scores = cross_validate(gb, train_input, train_target, return_train_score=True, n_jobs=-1)

print(np.mean(scores['train_score']), np.mean(scores['test_score']))
---
0.8881086892152563 0.8720430147331015
0.9464595437171814 0.8780082549788999
{% endhighlight %}

훈련세트에서 과대적합이 거의 보이지 않습니다. 학습률을 증가시키고 트리의 개수를 늘리면 조금 더 성능이 향상될 수 있습니다. 

---

## 히스토그램 기반 그레이디언트 부스팅(Histogram-based Gradient Bossting)

히스토그램 기반 그레이디언트 부스팅은 정형 데이터를 다루는 머신러닝 알고리즘 중에 가장 인기가 높은 알고리즘 입니다. 
히스토그램 기반 그레이디언트 부스팅은 먼저 입력 특성을 256개의 구간으로 나눕니다. 
따라서 노드를 분할할 때 최적의 분할을 매우 빠르게 찾을 수 있습니다. 

히스토그램 기반 그레이디언트 부스팅은 256개의 구간 중에서 하나를 떼어 놓고 누락된 값을 위해서 사용합니다. 

{% highlight python linenos %}
from sklearn.ensemble import HistGradientBoostingClassifier
## 모델설정 
hgb = HistGradientBoostingClassifier(random_state=42)
scores = cross_validate(hgb, train_input, train_target, return_train_score=True, n_jobs=-1)

print(np.mean(scores['train_score']), np.mean(scores['test_score']))

## permutation_importance 정의
from sklearn.inspection import permutation_importance

hgb.fit(train_input, train_target)
result = permutation_importance(hgb, train_input, train_target, n_repeats=10,
                                random_state=42, n_jobs=-1)
print(result.importances_mean)
result = permutation_importance(hgb, test_input, test_target, n_repeats=10,
                                random_state=42, n_jobs=-1)
print(result.importances_mean)
hgb.score(test_input, test_target)

{% endhighlight %}

히스토그램 기반 그레이디언트 부스팅의 특성 중요도를 계산하기 위해 permutation_importance() 함수를 사용합니다. 

이 함수는 특성을 하나씩 랜덤하게 섞어 모델의 성능이 변화하는지를 관찰하여 어떤 특성이 중요한지를 계산합니다. 훈련 세트뿐만 아니라 테스트 세트에도 적용할 수 있고 사이킷런에서 제공하는 추정기 모델에 모두 사용할 수 있습니다. 

{: .box-note}
**Note:** 사이킷런 말고도 그레이디언트 부스팅 알고리즘을 구현한 라이브러리가 여럿 있습니다. [XGBoost](https://xgboost.ai), 또는 마이크로소프트에서 만든 [LightGBM](https://github.com/microsoft/LightGBM) 이 있습니다.


---

## Reference

- [<혼자 공부하는 머신러닝+딥러닝>](https://github.com/rickiepark/hg-mldl)
- [sklearn](https://scikit-learn.org)
- [XGBoost](https://xgboost.ai)
- [LightGBM](https://github.com/microsoft/LightGBM)