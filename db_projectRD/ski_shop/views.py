from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from ski_shop.models import User, Operation, Service, Equipment, Payment
from ski_shop.serializers import UserSerialiser, OperationSerialiser, ServiceSerialiser, EquipmentSerialiser,PaymentSerialiser
from django.core.files.storage import default_storage
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
        return JsonResponse("Failed to Update", safe = False)
    elif request.method=='DELETE':
        user=User.objects.get(UserID = id)
        user.delete()
        return JsonResponse("Deleted Successfully", safe=False)

    
@csrf_exempt
def OperationApi (request, id=0):
    if request.method=='GET':
        operation = Operation.objects.all()
        operation_serialiser = OperationSerialiser(operation, many=True)
        return JsonResponse(operation_serialiser.data, safe=False)
    elif request.method=='POST':
        operation_data = JSONParser().parse(request)
        operation_serialiser = OperationSerialiser(data=operation_data)
        if operation_serialiser.is_valid():
            operation_serialiser.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method=='PUT':
        operation_data = JSONParser().parse(request)
        operation = Operation.objects.get(OperationID = operation_data['OperationID'])
        operation_serialiser = OperationSerialiser(operation, data=operation_data)
        if operation_serialiser.is_valid():
            operation_serialiser.save()
            return JsonResponse ("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe = False)
    elif request.method=='DELETE':
        operation=Operation.objects.get(OperationID = id)
        operation.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
@csrf_exempt
def ServiceApi (request, id=0):
    if request.method=='GET':
        service = Service.objects.all()
        service_serialiser = ServiceSerialiser(service, many=True)
        return JsonResponse(service_serialiser.data, safe=False)
    elif request.method=='POST':
        service_data = JSONParser().parse(request)
        service_serialiser = ServiceSerialiser(data=service_data)
        if service_serialiser.is_valid():
            service_serialiser.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method=='PUT':
        service_data = JSONParser().parse(request)
        service = Service.objects.get(ServiceID = service_data['ServiceID'])
        service_serialiser = ServiceSerialiser(service, data=service_data)
        if service_serialiser.is_valid():
            service_serialiser.save()
            return JsonResponse ("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe = False)
    elif request.method=='DELETE':
        service=Service.objects.get(ServiceID = id)
        service.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
@csrf_exempt    
def EquipmentApi (request, id=0):
    if request.method=='GET':
        equipment = Equipment.objects.all()
        equipment_serialiser = EquipmentSerialiser(equipment, many=True)
        return JsonResponse(equipment_serialiser.data, safe=False)
    elif request.method=='POST':
        equipment_data = JSONParser().parse(request)
        equipment_serialiser = EquipmentSerialiser(data=equipment_data)
        if equipment_serialiser.is_valid():
            equipment_serialiser.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method=='PUT':
        equipment_data = JSONParser().parse(request)
        equipment = Equipment.objects.get(EquipmentID = equipment_data['EquipmentID'])
        equipment_serialiser = EquipmentSerialiser(equipment, data=equipment_data)
        if equipment_serialiser.is_valid():
            equipment_serialiser.save()
            return JsonResponse ("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe = False)
    elif request.method=='DELETE':
        equipment=Equipment.objects.get(EquipmentID = id)
        equipment.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
@csrf_exempt    
def PaymentApi (request, id=0):
    if request.method=='GET':
        payment = Payment.objects.all()
        payment_serialiser = PaymentSerialiser(payment, many=True)
        return JsonResponse(payment_serialiser.data, safe=False)
    elif request.method=='POST':
        payment_data = JSONParser().parse(request)
        payment_serialiser = PaymentSerialiser(data=payment_data)
        if payment_serialiser.is_valid():
            payment_serialiser.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method=='PUT':
        payment_data = JSONParser().parse(request)
        payment = Payment.objects.get(PaymentID = payment_data['PaymentID'])
        payment_serialiser = PaymentSerialiser(payment, data=payment_data)
        if payment_serialiser.is_valid():
            payment_serialiser.save()
            return JsonResponse ("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe = False)
    elif request.method=='DELETE':
        payment=Payment.objects.get(PaymentID = id)
        payment.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def SaveFile(request):
    file= request.FILES['file']
    file_name=default_storage.save(file.name, file)
    return JsonResponse(file_name, safe =False)



def main(request):
    return HttpResponse("ski-shop")