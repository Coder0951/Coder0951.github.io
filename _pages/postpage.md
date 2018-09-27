---
layout: categories
title: "Archives"
permalink: /postpage/
author_profile: true
---
{% for post in site.test.posts %}
  {% include archive-single.html %}
{% endfor %}


{% for category in site.categories %}
  <h3>{{ category[0] }}</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}
