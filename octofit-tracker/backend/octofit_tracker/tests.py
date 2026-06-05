from django.test import TestCase
from django.contrib.auth.models import User
from .models import Team, Activity, Leaderboard, Workout

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Test Team")
        self.assertEqual(str(team), "Test Team")

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        activity = Activity.objects.create(user="testuser", team="Test Team", type="run", duration=30)
        self.assertEqual(str(activity), "testuser - run")

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        leaderboard = Leaderboard.objects.create(team="Test Team", points=100)
        self.assertEqual(str(leaderboard), "Test Team: 100")

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Pushups", description="Do 20 pushups")
        self.assertEqual(str(workout), "Pushups")

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(username="testuser", email="test@example.com", password="testpass")
        self.assertEqual(user.username, "testuser")
        self.assertEqual(user.email, "test@example.com")
