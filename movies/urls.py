from django.urls import path
from .views import *


urlpatterns = [
    path('',index,name='index'),
    path('preferences/', preferences, name='preferences'),
    path('seats/', seats, name='seats'),
    path('payment/', payment, name='payment'),
    path('ticket/', ticket, name='ticket'),
    path('api/movies/', get_movies, name='get_movies'),

]
