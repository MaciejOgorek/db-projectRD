from rest_framework import serializers
from ski_shop.models import User, Transaction

class UserSerialiser(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('UserID','FirstName','Surname','UserType')

class TranstactionSerialiser(serializers.ModelSerializer):
    class Meta:
        model=Transaction
        fields=('TransactionID','ClientID','EmployeeID','Amount','Payment_Method')
