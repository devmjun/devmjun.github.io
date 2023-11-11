---
layout: post
title: 혼자공부하는 머신러닝 정리 3 (k-최근접 이웃)
subtitle: KNeghborsClassifier
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

k-최근접 이웃 알고리즘의 한계와 해결방법을 알아봅니다. 

---

## 데이터 준비하기

{% highlight python linenos %}
import numpy as np 
from sklearn.model_selection import train_test_split

fish_length = [25.4, 26.3, 26.5, 29.0, 29.0, 29.7, 29.7, 30.0, 30.0, 30.7, 31.0, 31.0,
                31.5, 32.0, 32.0, 32.0, 33.0, 33.0, 33.5, 33.5, 34.0, 34.0, 34.5, 35.0,
                35.0, 35.0, 35.0, 36.0, 36.0, 37.0, 38.5, 38.5, 39.5, 41.0, 41.0, 9.8,
                10.5, 10.6, 11.0, 11.2, 11.3, 11.8, 11.8, 12.0, 12.2, 12.4, 13.0, 14.3, 15.0]
fish_weight = [242.0, 290.0, 340.0, 363.0, 430.0, 450.0, 500.0, 390.0, 450.0, 500.0, 475.0, 500.0,
                500.0, 340.0, 600.0, 600.0, 700.0, 700.0, 610.0, 650.0, 575.0, 685.0, 620.0, 680.0,
                700.0, 725.0, 720.0, 714.0, 850.0, 1000.0, 920.0, 955.0, 925.0, 975.0, 950.0, 6.7,
                7.5, 7.0, 9.7, 9.8, 8.7, 10.0, 9.9, 9.8, 12.2, 13.4, 12.2, 19.7, 19.9]

fish_data = np.column_stack((fish_length, fish_weight))
fish_target = np.concatenate((np.ones(35), np.zeros(14)))
train_input, test_input, train_target, test_target = train_test_split(
    fish_data, fish_target, stratify=fish_target, random_state=42)
{% endhighlight %}

{:.box-note}
**Note:** random_state=42는 같은 Random Seed 값을 사용하기 위함입니다. 

---

## 수상한 도미 한마리

### 모델 생성 

{% highlight python linenos %}
from sklearn.neighbors import KNeighborsClassifier

kn = KNeighborsClassifier()
kn.fit(train_input, train_target)
print(kn.score(test_input, test_target), kn.predict([[25, 150]]))
> 1.0 [0.]
{% endhighlight %}

### 시각화

{% highlight python linenos %}
distances, indexes = kn.kneighbors([[25, 150]])
plt.scatter(train_input[:,0], train_input[:,1])
plt.scatter(25, 150, marker='^')
plt.scatter(train_input[indexes,0], train_input[indexes,1], marker='D')
plt.xlabel('length')
plt.ylabel('weight')
plt.show()
{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter2-0.png' | relative_url }}){: .mx-auto.d-block :}

전달된 샘플(25, 150)은 오른쪽 위쪽으로 뻗어있는 도미데이터에 더 가깝습니다. 하지만 이 모델은 왼쪽 아래에 낮게 깔린 빙어 데이터에 가깝다고 판단한 걸까요? 

k-최근접 이웃은 주변의 샘플 중에서 다수인 클래스를 예측으로 사용합니다. 

{% highlight python linenos %}
print(distances)
> [[ 92.00086956 130.48375378 130.73859415 138.32150953 138.39320793]]
{% endhighlight %}

이유인즉, x축은 범위가 좁고(10~40), y축은 범위가 넓습니다(0~1000) 따라서 y축으로 조금만 멀어져도 거리가 아주 큰 값으로 계산됩니다. 이 때문에 오른쪽 위의 도미 샘플이 이웃으로 선택되지 못했던 겁니다. 이를 두 특성의 `스케일(scale)`이 다르다고도 말합니다. 

데이터를 표현하는 기준이 다르면 알고리즘이 올바르게 예측할 수 없습니다. 거리 기반일때 특히 더 그렇습니다. 

{: .box-note}
**Note**: 트리 기반 알고리즘들은 특성의 스케일이 다르더라도 잘 동작합니다. 

---

## 데이터 전처리

{: .box-note}
**Note**: 표준점수(standard score)로 전처리 합니다.

표준점수는 각 특성값이 평균에서 표준편차의 몇 배만큼 떨어져 있는지를 나타냅니다. 이를 통해 실제 특성값의 크기와 상관없이 동일한 조건으로 비교할 수 있습니다. 

{% highlight python linenos %}
mean = np.mean(train_input, axis=0)
std = np.std(train_input, axis=0)

train_scaled = (train_input-mean) / std
new = ([25, 150] - mean) / std

plt.scatter(train_scaled[:,0], train_scaled[:,1])
plt.scatter(new[0], new[1], marker='^')
plt.xlabel('length')
plt.ylabel('weight')
plt.show()

{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter2-01.png' | relative_url }}){: .mx-auto.d-block :}

### 전처리 데이터로 모델 훈련하기

{% highlight python linenos %}
kn.fit(train_scaled, train_target)
test_scaled = (test_input - mean) / std
kn.score(test_scaled, test_target)
print(kn.predict([new]))
distances, indexes = kn.kneighbors([new])
>[1.0]
{% endhighlight %}

전처리 데이터로 모델 훈련 후 

{% highlight python linenos %}
plt.scatter(train_scaled[:,0], train_scaled[:,1])
plt.scatter(new[0], new[1], marker='^')
plt.scatter(train_scaled[indexes,0], train_scaled[indexes,1], marker='D')
plt.xlabel('length')
plt.ylabel('weight')
plt.show()
{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alon_ml_chapter2-02.png' | relative_url }}){: .mx-auto.d-block :}

특성값의 스케일에 민감하지 않고 안정적인 예측을 할 수 있는 모델을 만들었습니다. 

---

## Reference

- [<혼자 공부하는 머신러닝+딥러닝>](https://github.com/rickiepark/hg-mldl)
- [sklearn](https://scikit-learn.org)