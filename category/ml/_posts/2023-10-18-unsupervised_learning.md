---
layout: post
title: 혼자공부하는 머신러닝 정리 12 (비지도 학습)
subtitle: unsupervised learning, clustering, cluster, KMeans
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

타깃이 없을때 사용하는 머신러닝 알고리즘인 비지도 학습(unsupervised learning)에 대해서 알아봅니다. 

<br>

## 군집 알고리즘 

### 데이터 준비

{: .box-note}
**Note:** !wget https://bit.ly/fruits_300_Data -O fruits_300.npy

```python
import numpy as np
import matplotlib.pyplot as plt
fruits = np.load('fruits_300.npy')
print(fruits.shape)
---
(300, 100, 100)
```

데이터는 사과, 바나나, 파인애플을 담고 있는 흑백 사진 입니다. 

```python
apple = fruits[0:100].reshape(-1, 100*100)
pineapple = fruits[100:200].reshape(-1, 100*100)
banana = fruits[200:300].reshape(-1, 100*100)

plt.hist(np.mean(apple, axis=1), alpha=0.8)
plt.hist(np.mean(pineapple, axis=1), alpha=0.8)
plt.hist(np.mean(banana, axis=1), alpha=0.8)
plt.legend(['apple', 'pineapple', 'banana'])
plt.show()
```

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter6-01.png' | relative_url }}){: .mx-auto.d-block :}


```python
fig, axs = plt.subplots(1, 3, figsize=(20, 5))
axs[0].bar(range(10000), np.mean(apple, axis=0))
axs[1].bar(range(10000), np.mean(pineapple, axis=0))
axs[2].bar(range(10000), np.mean(banana, axis=0))
plt.show()
```

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter6-02.png' | relative_url }}){: .mx-auto.d-block :}

---

## 평균값과 가까운 사진 고르기

가져온 데이터들을 확인 했습니다. 사과 사진의 평균값과 가까운 사진들을 골라서 분석해봅시다.

{% highlight python linenos %}
apple_mean = np.mean(apple, axis=0).reshape(100, 100)
pineapple_mean = np.mean(pineapple, axis=0).reshape(100, 100)
banana_mean = np.mean(banana, axis=0).reshape(100, 100)
abs_diff = np.abs(fruits - apple_mean)
abs_mean = np.mean(abs_diff, axis=(1,2))
print(abs_mean.shape)
---
(300, )
---

apple_index = np.argsort(abs_mean)[:100]
fig, axs = plt.subplots(10, 10, figsize=(10,10))
for i in range(10):
    for j in range(10):
        axs[i, j].imshow(fruits[apple_index[i*10 + j]], cmap='gray_r')
        axs[i, j].axis('off')
plt.show()
{% endhighlight %}

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter6-03.png' | relative_url }}){: .mx-auto.d-block :}

흑백 사진에 있는 픽셀값을 사용해 과일 사진을 모으는 작업을 해 보았습니다. 
이렇게 비슷한 샘플끼리 그룹으로 모으는 작업을 `군집(clustering)`이라고 합니다. 
군집은 대표적인 비지도 학습 작업 중 하나 입니다. 
군집 알고리즘에서 만든 그룹을 `클러스터(cluster)`라고 부릅니다.

---

## k-평균

그런데 지금은 데이터의 종류를 정확히 알고 있기 떄문에 각 과일의 평균값을 구할 수 있었습니다. 
데이터가 무엇인지 모를땐 어떻게 해야 할까요?

`k-평균(k-means)` 군집 알고리즘이 평균값을 자동으로 찾아줍니다. 
이 평균값이 클러스터의 중심에 위치하기 때문에 `클러스터 중심(cluster center)`또는 `센트로이드(centroid)` 라고 부릅니다.

{: .box-note}
**Note:** https://scikit-learn.org/stable/modules/clustering.html#k-means

$$\sum_{i=0}^{n}\min_{\mu_j \in C}(||x_i - \mu_j||^2)$$

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter6-04.png' | relative_url }}){: .mx-auto.d-block :}

작동방식은 다음과 같습니다

1. 무작위로 k 개의 클러스터 중심을 정합니다
2. 각 샘플에서 가장 가까운 클러스터 중심을 찾아 해당 클러스터 중심을 변경합니다
3. 클러스터 중심에 변화가 없을 때까지 반복합니다. 

{% highlight python linenos %}
print(km.labels_)
print(np.unique(km.labels_, return_counts=True))
---
[2 2 2 2 2 0 2 2 2 2 2 2 2 2 2 2 2 2 0 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
 2 2 2 2 2 0 2 0 2 2 2 2 2 2 2 0 2 2 2 2 2 2 2 2 2 0 0 2 2 2 2 2 2 2 2 0 2
 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 0 2 2 2 2 2 2 2 2 0 0 0 0 0 0 0 0 0 0 0
 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
 1 1 1 1]
(array([0, 1, 2], dtype=int32), array([111,  98,  91]))
{% endhighlight %}

km.labels_를 출력한 레이블값과 순서는 의미가 없습니다. 
어떤 과일 사진을 모았는지 알아보려면 직접 출력해보아야 합니다. 

{% highlight python linenos %}
import matplotlib.pyplot as plt

def draw_fruits(arr, ratio=1):
    n = len(arr)    # n은 샘플 개수입니다
    # 한 줄에 10개씩 이미지를 그립니다. 샘플 개수를 10으로 나누어 전체 행 개수를 계산합니다.
    rows = int(np.ceil(n/10))
    # 행이 1개 이면 열 개수는 샘플 개수입니다. 그렇지 않으면 10개입니다.
    cols = n if rows < 2 else 10
    fig, axs = plt.subplots(rows, cols,
                            figsize=(cols*ratio, rows*ratio), squeeze=False)
    for i in range(rows):
        for j in range(cols):
            if i*10 + j < n:    # n 개까지만 그립니다.
                axs[i, j].imshow(arr[i*10 + j], cmap='gray_r')
            axs[i, j].axis('off')
    plt.show()
{% endhighlight %}

```python
draw_fruits(fruits[km.labels_==0])
```

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter6-05.png' | relative_url }}){: .mx-auto.d-block :}

```python
draw_fruits(fruits[km.labels_==1])
```
![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter6-06.png' | relative_url }}){: .mx-auto.d-block :}

```python
draw_fruits(fruits[km.labels_==2])
```
![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter6-07.png' | relative_url }}){: .mx-auto.d-block :}

---

## 클러스터 중심

KMeans 클래스가 최종적으로 찾은 클러스터 중심은 cluster_centers_ 속성에 저장되어 있습니다. 

```python
draw_fruits(km.cluster_centers_.reshape(-1, 100, 100), ratio=3)
```

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter6-08.png' | relative_url }}){: .mx-auto.d-block :}

또한 KMeans 클래스는 훈련 데이터 샘플에서 클러스터 중심까지 거리로 변환해주는 `transform()` 메소드를 가지고 있습니다. 

---

## 최적의 k 찾기 

k-평균 알고리즘의 단점 중 하나는 클러스터 개수를 사전에 지정해야 한다는 것 입니다.. 실전에서는 몇개의 클러스터가 있는지 알 수 없습니다. 어떻게 하면 적절한 k값을 찾을 수 있는지 알아보겠습니다. 

군집 알고리즘에서 적절한 k 값을 찾기 위한 완벽한 방법은 없습니다. 몇가지 도구가 있지만 저마다 장단점이 있습니다. 
여기서는 적절한 클러스터 개수를 찾기 위한 대표적인 방법인 엘보우(elbow)방법에 대해 알아보겠습니다. 

k-평균 알고리즘은 클러스터 중심과 클러스터에 속한 샘플 사이의 거리를 잴 수 있습니다. 이 거리의 제곱 합을 `이너셔(inertia)`라고 부릅니다.

엘보우 방법은 클러스터 개수를 늘려가면서 이너셔의 변화를 관찰하여 최적의 클러스터 개수를 찾는 방법 입니다. 

클러스터 개수를 증가시키면서 이너셔를 그래프로 그리면 감소하는 속도가 꺽이는 지점이 있습니다. 이 지점부터 클러스터 개수를 늘려도 클러스터에 잘 밀집된 정도가 크게 개선되지 않습니다. 

![result]({{ '/assets/post_img/posts/01_alone_ml/alone_ml_chapter6-09.png' | relative_url }}){: .mx-auto.d-block :}

엘보우 지점보다 클러스터 개수가 많아지면 이너셔의 변화가 줄어들면서 군집 효과도 줄어듭니다. 
하지만 이 그래프에서는 이런 지점이 명확하지는 않습니다. 

---

## Reference

- [<혼자 공부하는 머신러닝+딥러닝>](https://github.com/rickiepark/hg-mldl)
- [sklearn](https://scikit-learn.org)
