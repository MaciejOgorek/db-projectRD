from django.db import models

# Create your models here.
class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=500)
    Surname = models.CharField(max_length=500)
    UserType = models.CharField(max_length=500)

class Transaction(models.Model):
    TranstactionID = models.AutoField(primary_key=True)
    ClientID = models.CharField(max_length=12)
    EmployeeID = models.CharField(max_length=12)
    Amount = models.BigIntegerField
    Payment_Method = models.CharField(max_length=500)


