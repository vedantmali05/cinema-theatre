from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
import json
from .models import Movie

# Create your views here.

def index(request):
    return render(request, "index.html")

def preferences(request):
    return render(request, "preferences.html")

def seats(request):
    return render(request,'seats.html')

def payment(request):
    return render(request,'payment.html')

def ticket(request):
    return render(request,'ticket.html')

def get_movies(request):
    movies = Movie.objects.all().values()  # Get all movie records as dictionaries
    formatted_movies = []

    for movie in movies:
        # Convert string representations of lists into actual lists
        formatted_movie = {
            "id": movie["id"],
            "poster": movie["poster"],
            "directors": json.loads(movie["directors"]),  # Convert string to list
            "name": movie["name"],
            "cast": json.loads(movie["cast"]),  # Convert string to list
            "rating": movie["rating"],
            "ratingCategory": movie["ratingCategory"],
            "genre": json.loads(movie["genre"]),  # Convert string to list
            "description": movie["description"],
            "availableFrom": movie["availableFrom"],
            "availableTo": movie["availableTo"],
            "timings": json.loads(movie["timings"]),  # Convert string to list
            "availableLocations": json.loads(movie["availableLocations"]),  # Convert string to list
            "availableScreens": json.loads(movie["availableScreens"]),  # Convert string to list
            "releaseDate": movie["releaseDate"],
            "duration": movie["duration"],
            "language": json.loads(movie["language"]),  # Convert string to list
            "trailer": movie["trailer"],
            "price": movie["price"],
            "dimensional": movie["dimensional"],
        }
        formatted_movies.append(formatted_movie)

    return JsonResponse(formatted_movies, safe=False)
    