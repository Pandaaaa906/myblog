FROM tiangolo/uwsgi-nginx:python3.6

COPY . /myblog
COPY /nginx_blog.conf /app/nginx.conf
COPY /myblog/myblog_uwsgi.ini /app/uwsgi.ini
WORKDIR /myblog

ENV DJANGO_ENV=prod
ENV DOCKER_CONTAINER=1

RUN mkdir ~/.pip
RUN echo "[global]\nindex-url = https://pypi.tuna.tsinghua.edu.cn/simple" | tee ~/.pip/pip.conf
RUN pip install -r requirements
RUN python manage.py collectstatic

EXPOSE 8888