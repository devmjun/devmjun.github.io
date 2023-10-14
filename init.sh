#!/bin/bash

# Jekyll 및 Bundler 설치
gem install jekyll bundler

# 현재 디렉토리에 있는 Gemfile을 이용하여 의존성 설치
bundle install

echo "Jekyll과 Bundler 설치가 완료되었습니다."
