from django.shortcuts import render,HttpResponse,redirect
from django.http import JsonResponse
import json
from .models import Movie,Ticket
import urllib.parse
from datetime import datetime

# Create your views here.

def index(request):
    return render(request, "index.html")

def preferences(request):
    return render(request, "preferences.html")

def seats(request):
    tickets=Ticket.objects.all()

    show_date_str = request.GET.get('show_date')
    show_time = request.GET.get('show_time')
    language = request.GET.get('show_language')
    location = request.GET.get('show_location')

    if request.method == "POST":
        # Retrieve selected seats from POST request
        seats = request.POST.getlist('seat_grid')
        show_time = request.POST.get('show_time')
        show_date = request.POST.get('show_date')
        language =  request.POST.get('show_language')
        location =  request.POST.get('show_location')

        
        params = {
            'show_date': show_date,
            'show_time': show_time,
            'language': language,
            'location': location,
            'seats': ','.join(seats)  # Convert list to comma-separated string
        }
        query_string = urllib.parse.urlencode(params)
        return redirect(f'/payment/?{query_string}')

    try:
        show_date = datetime.strptime(show_date_str, '%d/%m/%Y').date()
    except ValueError:
        return HttpResponse("Error in date format")
        


    if show_date and show_time and language and location:
        ticket = tickets.filter(
            show_date=show_date,
            show_time=show_time,
            movie_language=language,
            location_selected=location
        )
    
    # Prepare the context dictionary
    context = {
        'tickets': ticket,  
        'show_date': show_date,
        'show_time': show_time,
        'language': language,
        'location': location
    }
    return render(request, 'seats.html',context)
    
def payment(request):
    
    if request.method == "POST":
        # Retrieve GET parameters from hidden form inputs (now sent via POST)
        show_date_str = request.POST.get('show_date')
        show_time = request.POST.get('show_time')
        language = request.POST.get('language')
        location = request.POST.get('location')
        seats = request.POST.get('seats').split(',')  # Split seats back into a list

        # Retrieve card details from POST request
        card_number = request.POST.get('payment_card_number')
        name = request.POST.get('payment_card_name')

        
        # Convert the show date to a datetime object with the correct format
        try:
            show_date = datetime.strptime(show_date_str, '%b. %d, %Y').date()  # e.g., 'Oct. 6, 2024'
        except ValueError:
            return HttpResponse("error at converting date format")

        
        
        # Ticket.objects.create(
        #     movie_id=1234,  
        #     show_date=show_date,
        #     show_time=show_time,
        #     movie_language=language,
        #     location_selected=location,
        #     seats_selected=seats,  
        #     ticket_price=100,  
        #     name=name,
        #     card_number=card_number
        # )
        return redirect('/ticket/')

    return render(request, 'payment.html')



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
    
def ticket(request):
    return render(request,'ticket.html')