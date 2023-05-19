from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from ski_shop.models import User, Transaction
from ski_shop.serializers import UserSerialiser, TranstactionSerialiser
# Create your views here.

@csrf_exempt
def UserApi (request, id=0):
    if request.method=='GET':
        user = User.objects.all()
        user_serialiser = UserSerialiser(user, many=True)
        return JsonResponse(user_serialiser.data, safe=False)
    elif request.method=='POST':
        user_data = JSONParser().parse(request)
        user_serialiser = UserSerialiser(data=user_data)
        if user_serialiser.is_valid():
            user_serialiser.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        user = User.objects.get(UserID = user_data['UserID'])
        user_serialiser = UserSerialiser(user, data=user_data)
        if user_serialiser.is_valid():
            user_serialiser.save()
            return JsonResponse ("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        user=User.objects.get(UserID = id)
        user.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    



        


def main(request):
    return HttpResponse("ski-shop")