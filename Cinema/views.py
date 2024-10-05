from django.shortcuts import render, redirect


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