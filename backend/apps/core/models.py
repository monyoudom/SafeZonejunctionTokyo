from django.db import models

# Create your models here.



class AuthenModel(models.Model):

    pass_code = models.CharField(max_length = 20)
    face_key  = models.CharField(max_length = 20)
    key       = models.CharField(max_length =30)

class UserAccount(models.Model):
    passcode = models.IntegerField()
    timeone = models.FloatField()
    timetwo = models.FloatField()
    timethree = models.FloatField()
    class_name = models.IntegerField()
    person_id = models.CharField(max_length=60)

    pressure_1 = models.FloatField(default = 0)
    pressure_2 = models.FloatField(default = 0)
    pressure_3 = models.FloatField(default = 0)
    pressure_4 = models.FloatField(default = 0)
    def __str__(self):
        return str(self.class_name)
