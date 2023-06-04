from rest_framework import serializers
from ski_shop.models import User, Operation, Service, Equipment, Payment

class UserSerialiser(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('UserID','FirstName','Surname','UserType')

class OperationSerialiser(serializers.ModelSerializer):
    class Meta:
        model=Operation
        fields=('OperationID', 'EmployeeID', 'ClientID', 'EquipmentID', 'OperationStart', 'OperationEnd', 'TransactionID')

class ServiceSerialiser(serializers.ModelSerializer):
    class Meta:
        model=Service
        fields=('ServiceID','ClientID','EmployeeID', 'TransactionID', 'ServiceType')

class EquipmentSerialiser(serializers.ModelSerializer):
    class Meta:
        model=Equipment
        fields=('EquipmentID', 'EquipmentDESC')
        
class PaymentSerialiser(serializers.ModelSerializer):
    class Meta:
        model=Payment
        fields=('PaymentID','ClientID','EmployeeID','Amount','PaymentType')