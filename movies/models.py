from django.db import models

# Create your models here.

class Movie(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    poster = models.CharField(max_length=255)
    directors = models.TextField()
    name = models.CharField(max_length=255)
    cast = models.TextField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    ratingCategory = models.CharField(max_length=5, blank=True, null=True)
    genre = models.TextField()
    description = models.TextField()
    availableFrom = models.DateField()
    availableTo = models.DateField()
    timings = models.TextField()
    availableLocations = models.TextField()
    availableScreens = models.TextField()
    releaseDate = models.DateField()
    duration = models.TimeField()
    language = models.TextField()
    trailer = models.URLField(max_length=255)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    dimensional = models.CharField(max_length=5)

    def __str__(self):
        return self.name



class Ticket(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    movie = models.ForeignKey('Movie', on_delete=models.CASCADE)
    show_date = models.DateField()
    show_time = models.TimeField()
    movie_language = models.CharField(max_length=50)
    location_selected = models.CharField(max_length=100)
    seats_selected = models.CharField(max_length=255)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Ticket for {self.movie.name} on {self.show_date} at {self.show_time}'
