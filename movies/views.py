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
    show_date = request.GET.get('show_date')
    show_time = request.GET.get('show_time')
    language = request.GET.get('language')
    location = request.GET.get('location')
    print(show_date)
    print(show_time)
    print(language)
    print(location)
    
    
    return render(request,'seats.html')

def payment(request):
    return render(request,'payment.html')

def ticket(request):
    return render(request,'ticket.html')

def get_movies(request):
    movies = Movie.objects.all().values()  
    formatted_movies = []

    for movie in movies:
        
        formatted_movie = {
            "id": movie["id"],
            "poster": movie["poster"],
            "directors": json.loads(movie["directors"]), 
            "name": movie["name"],
            "cast": json.loads(movie["cast"]), 
            "rating": movie["rating"],
            "ratingCategory": movie["ratingCategory"],
            "genre": json.loads(movie["genre"]), 
            "description": movie["description"],
            "availableFrom": movie["availableFrom"],
            "availableTo": movie["availableTo"],
            "timings": json.loads(movie["timings"]), 
            "availableLocations": json.loads(movie["availableLocations"]), 
            "availableScreens": json.loads(movie["availableScreens"]), 
            "releaseDate": movie["releaseDate"],
            "duration": movie["duration"],
            "language": json.loads(movie["language"]), 
            "trailer": movie["trailer"],
            "price": movie["price"],
            "dimensional": movie["dimensional"],
        }
        formatted_movies.append(formatted_movie)

    return JsonResponse(formatted_movies, safe=False)
    