FROM --platform=linux/amd64 python:3.11-buster

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
# RUN apt-get -y update
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub |  apt-key add -
# RUN sh -c 'echo "deb [arch=arm64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN sh -c "echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >>   /etc/apt/sources.list"
RUN apt-get update 
RUN apt-get install -y google-chrome-stable

# install chromedriver
RUN apt-get install -yqq unzip
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

# set display port to avoid crash
ENV DISPLAY=:99
# FROM markadams/chromium-xvfb-py3
# FROM selenium/standalone-firefox

# RUN curl http://repo.ros2.org/repos.key | apt-key add -
# RUN apt-get update
#     firefox-esr \
#     chromium \
#     git-core \
#     xvfb \
#     xsel \
#     unzip \
#     python-pytest \
#     libgconf-2-4 \
#     libncurses5 \
#     libxml2-dev \
#     libxslt-dev \
#     libz-dev \
#     xclip
# # GeckoDriver v0.19.1
# RUN wget -q "https://github.com/mozilla/geckodriver/releases/download/v0.19.1/geckodriver-v0.19.1-linux64.tar.gz" -O /tmp/geckodriver.tgz \
#     && tar zxf /tmp/geckodriver.tgz -C /usr/bin/ \
#     && rm /tmp/geckodriver.tgz

# # chromeDriver v2.35
# RUN wget -q "https://chromedriver.storage.googleapis.com/2.35/chromedriver_linux64.zip" -O /tmp/chromedriver.zip \
#     && unzip /tmp/chromedriver.zip -d /usr/bin/ \
#     && rm /tmp/chromedriver.zip

# # xvfb - X server display
# # RUN find /* -iname "xvfb-chromium" 
# # COPY xvfb-chromium /usr/bin/xvfb-chromium
# RUN ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome \
#     && chmod 777 /usr/bin/xvfb-chromium

# # create symlinks to chromedriver and geckodriver (to the PATH)
# RUN ln -s /usr/bin/geckodriver /usr/bin/chromium-browser \
#     && chmod 777 /usr/bin/geckodriver \
#     && chmod 777 /usr/bin/chromium-browser

# RUN python3 -m pip install --upgrade pip
# FROM selenium/standalone-chrome
# RUN whoami
RUN mkdir /usr/src/diploma/
# RUN mkdir /usr/src/api/
# ENV FLASK_APP=blog_api.create_app:create_app
COPY . /usr/src/diploma/
WORKDIR /usr/src/diploma/
RUN pip install -r requirements.txt
CMD python -m api
# RUN chmod +x ./wait-for-it.sh
# CMD chmod +x ./init.sh && ./init.sh