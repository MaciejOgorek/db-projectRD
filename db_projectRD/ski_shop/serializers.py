from rest_framework import serializers
from ski_shop.models import User, Transaction, Operation, Service, Equipment

class UserSerialiser(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('UserID','FirstName','Surname','UserType')

class TransactionSerialiser(serializers.ModelSerializer):
    class Meta:
        model=Transaction
        fields=('TransactionID','ClientID','EmployeeID','Amount','Payment_Method')

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
        
