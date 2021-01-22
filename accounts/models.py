# from django.db import models
# from django.contrib.auth.models import (
#     BaseUserManager, AbstractBaseUser
# )


# class User(AbstractBaseUser):
#     email = models.EmailField(
#         verbose_name='email address',
#         max_length=255,
#         unique=True,
#     )
#     username = models.CharField(unique=True, max_length=50)
#     first_name = models.CharField(max_length=255)
#     last_name = models.CharField(max_length=255)
#     active = models.BooleanField(default=True)
#     staff = models.BooleanField(default=False) # a admin user; non super-user
#     admin = models.BooleanField(default=False) # a superuser
#     # notice the absence of a "Password field", that is built in.

#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = ['first_name', 'last_name'] # Email & Password are required by default.

#     # class Meta:
#     #     db_table = 'auth_user'