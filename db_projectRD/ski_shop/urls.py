from django.urls import path,re_path
from .views import main
from ski_shop import views 
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', main),
    re_path(r'^user$', views.UserApi),
    re_path(r'^user/([0-9]+)$', views.UserApi),

    re_path(r'^operation$', views.OperationApi),
    re_path(r'^operation/([0-9]+)$', views.OperationApi),

    re_path(r'^service$', views.ServiceApi),
    re_path(r'^service/([0-9]+)$', views.ServiceApi),

    re_path(r'^equipment$', views.EquipmentApi),
    re_path(r'^equipment/([0-9]+)$', views.EquipmentApi),

    re_path(r'^payment$', views.PaymentApi),
    re_path(r'^payment/([0-9]+)$', views.PaymentApi),


    
]
