from django.urls import path,re_path
from .views import main
from ski_shop import views 

urlpatterns = [
    path('', main),
    re_path(r'^user$', views.UserApi),
    re_path(r'^user/([0-9]+)$', views.UserApi)
]
