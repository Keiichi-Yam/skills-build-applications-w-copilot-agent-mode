from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from django.conf import settings

# Define models inline for demonstration (in real app, use models.py)
from django.db import models as dj_models

class Team(dj_models.Model):
    name = dj_models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(dj_models.Model):
    user = dj_models.CharField(max_length=100)
    team = dj_models.CharField(max_length=100)
    type = dj_models.CharField(max_length=100)
    duration = dj_models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(dj_models.Model):
    team = dj_models.CharField(max_length=100)
    points = dj_models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(dj_models.Model):
    name = dj_models.CharField(max_length=100)
    description = dj_models.TextField()
    class Meta:
        app_label = 'octofit_tracker'

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete all data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users (super heroes)
        users = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': marvel},
            {'username': 'captainamerica', 'email': 'cap@marvel.com', 'team': marvel},
            {'username': 'batman', 'email': 'batman@dc.com', 'team': dc},
            {'username': 'superman', 'email': 'superman@dc.com', 'team': dc},
        ]
        user_objs = []
        for u in users:
            user = User.objects.create_user(username=u['username'], email=u['email'], password='password')
            user_objs.append(user)

        # Create Activities
        Activity.objects.create(user='ironman', team='Marvel', type='run', duration=30)
        Activity.objects.create(user='batman', team='DC', type='cycle', duration=45)

        # Create Leaderboard
        Leaderboard.objects.create(team='Marvel', points=100)
        Leaderboard.objects.create(team='DC', points=80)

        # Create Workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups')
        Workout.objects.create(name='Situps', description='Do 30 situps')

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data!'))
