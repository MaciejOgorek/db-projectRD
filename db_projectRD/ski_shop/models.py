from django.db import models

# Create your models here.
class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=500)
    Surname = models.CharField(max_length=500)
    UserType = models.CharField(max_length=500)

class Transaction(models.Model):
    TransactionID = models.AutoField(primary_key=True)
    ClientID = models.CharField(max_length=12)
    EmployeeID = models.CharField(max_length=12)
    Amount = models.CharField(max_length=12)
    Payment_Method = models.CharField(max_length=500)

class Operation(models.Model):
    OperationID = models.AutoField(primary_key=True)
    EmployeeID = models.CharField(max_length=512)
    ClientID = models.CharField(max_length=512)
    EquipmentID = models.CharField(max_length=512)
    OperationStart = models.CharField(max_length=10)
    OperationEnd = models.CharField(max_length=10)
    TransactionID=models.CharField(max_length=512)
    
class Service(models.Model):
    ServiceID = models.AutoField(primary_key=True)
    ClientID = models.CharField(max_length=512)
    EmployeeID = models.CharField(max_length=512)
    TransactionID = models.CharField(max_length=512)
    ServiceType = models.CharField(max_length=512)

class Equipment (models.Model):
    EquipmentID = models.AutoField(primary_key=True)
    EquipmentDESC = models.JSONField



