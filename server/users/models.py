from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class CustomUserManager(BaseUserManager):

    def _create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


# ----------------------------------------------------------
from django.contrib.auth.base_user import BaseUserManager


class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email, first name,
        last name and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

#    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, first name,
        last name and password.
        """
       # user = self.create_user(
      #      email,
     #       password=password,
    #        **extra_fields,
   #     )
  #      user.is_admin = True
 #       user.save(using=self._db)
#        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        user = self.create_user(
            email,
            password=password,
            **extra_fields,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

#        return self._create_user(email, password, **extra_fields)
# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(max_length=34)
    last_name = models.CharField(max_length=35)
    email = models.EmailField(unique=True, null=False, blank=False)
    password = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/', default='images/logo.png')
    country = models.CharField(max_length=15, null=True, blank=True)
    city = models.CharField(max_length=20, null=True, blank=True)
    study = models.CharField(max_length=500, null=True, blank=True)
    work = models.CharField(max_length=500, null=True, blank=True)
    research = models.CharField(max_length=500, null=True, blank=True)
    bio = models.CharField(max_length=500, null=True, blank=True)
    objects = MyUserManager()

    # username = models.CharField(max_length=50, default=None)

    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        if self.first_name:
            return self.first_name + " " + self.last_name
        else:
            return self.email
