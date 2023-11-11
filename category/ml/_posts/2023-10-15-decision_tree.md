---
layout: post
title: 혼자공부하는 머신러닝 정리 9 (결정트리)
subtitle: Decision tree
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

로지스틱 회귀로 와인을 분류해보고, 결정 트리 알고리즘을 사용해 차이점은 무엇인지 알아봅니다.

<br>

## 로지스틱 회귀로 와인 분류하기 

{: .box-note}
**Note:** 와인 데이터는 [이 데이터](https://www.kaggle.com/datasets/uciml/red-wine-quality-cortez-et-al-2009)를 사용 했습니다. 

{% highlight javascript linenos %}
## 데이터 준비
import pandas as pd

wine = pd.read_csv('https://bit.ly/wine_csv_data')
data = wine[['alcohol', 'sugar', 'pH']].to_numpy()
target = wine['class'].to_numpy()
from sklearn.model_selection import train_test_split

train_input, test_input, train_target, test_target = train_test_split(
    data, target, test_size=0.2, random_state=42)

## 전처리

from sklearn.preprocessing import StandardScaler

ss = StandardScaler()
ss.fit(train_input)

train_scaled = ss.transform(train_input)
test_scaled = ss.transform(test_input)

from sklearn.linear_model import LogisticRegression

lr = LogisticRegression()
lr.fit(train_scaled, train_target)

print(lr.score(train_scaled, train_target))
print(lr.score(test_scaled, test_target))
---
0.7808350971714451
0.7776923076923077
{% endhighlight %}

훈련 점수와 테스트 점수가 높지 않습니다. 

```python
print(lr.coef_, lr.intercept_)
---
[[ 0.51270274  1.6733911  -0.68767781]] [1.81777902]
```

모델이 왜 저런 계수값을 학습했느닞 정확히 이해하기 어렵습니다. 추측할 뿐이죠. 
아마도 알코올 도수와 당도가 높을수록 화이트 와인일 가능성이 높고, pH가 높을수록 레드 와인일 가능성이 높은 것 같습니다. 

하지만 정확히 이 숫자가 어떤 의미인지 설명하긴 어렵습니다. 더군다나 다항 특성을 추가한다면 설명하기가 더 어려울 것 입니다. 
이렇듯 대부분 머신러닝 모델은 학습의 결과를 설명하기 어렵습니다. 

---

## 결정트리(Decision Tree)


{% highlight javascript linenos %}
from sklearn.tree import DecisionTreeClassifier

dt = DecisionTreeClassifier(random_state=42)
dt.fit(train_scaled, train_target)

print(dt.score(train_scaled, train_target))
print(dt.score(test_scaled, test_target))
---
0.996921300750433
0.8592307692307692
{% endhighlight %}

결과를 그래프로 출력해봅니다

{% highlight javascript linenos %}
import matplotlib.pyplot as plt
from sklearn.tree import plot_tree

plt.figure(figsize=(10,7))
plot_tree(dt)
plt.show()
{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter5-01.png' | relative_url }}){: .mx-auto.d-block :}

복잡합니다. 자세히 보기 위해 트리의 깊이를 제한하여 확인해봅니다.

{% highlight javascript linenos %}
plt.figure(figsize=(10,7))
plot_tree(dt, max_depth=1, filled=True, feature_names=['alcohol', 'sugar', 'pH'])
plt.show()
{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter5-02.png' | relative_url }}){: .mx-auto.d-block :}

결정 트리에서 예측하는 방법은 간단합니다. 리프 노드에서 갖아 많은 클래스가 예측 클래스가 됩니다. 

---

## 불순도(Gini impurity)

DecisionTreeClassifier 클래스의 criterion 매개변수의 기본값이 gini 입니다. 
criterion 매개변수의 용도는 노드에서 데이터를 분할할 기준을 정하는 것 입니다. 

앞의 그린 트리에서 루트 노드는 어떻게 당도 -0.239를 기준으로 왼쪽과 오른쪽 노드로 나누었을까요? 
바로 criterion 매개변수에 지정한 지니 불순도를 사용합니다. 

<center>$\text{지니 불순도} = 1 - \left( (\text{음성 클래스 비율})^2 + (\text{양성 클래스 비율})^2 \right)$ 로 계산합니다. </center>

위의식을 계산해보면 $1 - \left( \left( \frac{1258}{5197} \right)^2 + \left( \frac{3939}{5197} \right)^2 \right) = 0.367$ 입니다. 

`결정 트리 모델은 부모 노드와 자식 노드의 불순도 차이가 가능한 크도록 트리를 성장시킵니다.`

이런 부모와 자식 노드 사이의 불순도 차이를 `정보 이득(information gain)` 이라고 부릅니다. 좋습니다. 이제 결정 트리의 노드를 어떻게 나누는지 이해했습니다. 

{: .box-note}
**Note:** DecisionTreeClassifier 클래스에서 criterion='entropy'를 지정하여 사용하는것도 가능합니다. 

불순도는 클래스별 비율을 가지고 계산했습니다. 
샘플을 어떤 클래스 비율로 나누는지 계산할 때 특성값의 스케일이 계산에 미치지 않습니다. 
따라서, 표준화 전처리를 할 필요가 없습니다. 

이것이 결정 트리 알고리즘의 도 다른 장점 중 하나 입니다.

표준점수로 스케일한것을 제거 하여 다시 출력해봅니다.

{% highlight javascript linenos %}
dt = DecisionTreeClassifier(max_depth=3, random_state=42)
dt.fit(train_input, train_target)

print(dt.score(train_input, train_target))
print(dt.score(test_input, test_target))

plt.figure(figsize=(20,15))
plot_tree(dt, filled=True, feature_names=['alcohol', 'sugar', 'pH'])
plt.show()
{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter5-03.png' | relative_url }}){: .mx-auto.d-block :}

결정트리의 결과를 보면 어떻게 나뉘었는지 표준점수를 사용하기전보다 이해하기 쉽습니다. 

{: .box-note}
**Note:** `특성중요도`: 결정 트리에 사용된 특성이 불순도를 감소하는데 기여한 정도를 나타내는값 입니다. 


---

## Reference

- [<혼자 공부하는 머신러닝+딥러닝>](https://github.com/rickiepark/hg-mldl)
- [sklearn](https://scikit-learn.org)
