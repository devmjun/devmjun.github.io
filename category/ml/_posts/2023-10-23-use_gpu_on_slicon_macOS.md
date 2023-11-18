---
layout: post
title: Apple silicon 맥북에서 GPU 가속 사용하는(Tensorflow, Keras)
subtitle: tensorflow-metal
author: MinJun Ju
comments: true 
toc: true
tags: [ml, ai, deep learning, supervised training]
categories: ml
cover-img: /assets/post_img/background/CocoaPod-bg.png
thumbnail-img: /assets/post_img/background/CocoaPod-bg.png
share-img: /assets/post_img/background/CocoaPod-bg.png
---

## Requirements

1. Mac computers with Apple silicon or AMD GPUs
2. macOS 12.0 or later (Get the latest beta)
3. Python 3.8 or later
4. **Xcode command-line tools: xcode-select --install**

---

## Get started 


### 1. 파이썬 가상환경 실행
### 2. TensorFlow 설치 

For TensorFlow version 2.13 or later:

```sh
python -m pip install tensorflow
```

For TensorFlow version 2.12 or earlier:

```sh
python -m pip install tensorflow-macos
```

### 3. tensorflow-metal plug-in 설치

```sh
python -m pip install tensorflow-metal
```

### 4. 코드 실행하여 GPU 사용유무 확인 

```python
import tensorflow as tf

cifar = tf.keras.datasets.cifar100
(x_train, y_train), (x_test, y_test) = cifar.load_data()
model = tf.keras.applications.ResNet50(
    include_top=True,
    weights=None,
    input_shape=(32, 32, 3),
    classes=100,)

loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False)
model.compile(optimizer="adam", loss=loss_fn, metrics=["accuracy"])
model.fit(x_train, y_train, epochs=5, batch_size=64)
```

### 5. 결과

집에서 사용하는 mac-mini-m1 서버에 환경에 실행하여 확인한 결과 훈련시 Epoch당 3~5배 정도 훈련속도 차이가 있었습니다. 
Nvidia의 GPU와 비교하면 가격 대비 만족할만한 성능은 아니지만 macOS에서 개발시 시간을 조금 줄일 수 있습니다. 

#### CPU

![result]({{ '/assets/post_img/posts/02_ml_basic/mac-mini-no-gpu-01.png' | relative_url }}){: .mx-auto.d-block :} 

#### GPU 

![result]({{ '/assets/post_img/posts/02_ml_basic/mac-mini-gpu-02.png' | relative_url }}){: .mx-auto.d-block :} 

### 6. GPU 사용량 확인방법


1. Activity Monitor 에서 GPU 사용량 확인 

or 

2. 터미널에서 powermetrics 사용하여 스냅샷 확인 

```zsh
sudo powermetrics --samplers gpu_power -i500 -n1
```


---

## Reference

- [tensorflow-plugin](https://developer.apple.com/metal/tensorflow-plugin/ )
