from django.shortcuts import render,redirect
from django.http import JsonResponse
from .models import Product
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# HOME VIEW (IMPORTANT)
def home(request):
    return render(request, 'index.html')


# CHATBOT VIEW
def chatbot(request):
    msg = request.GET.get('message', '').lower().strip()

    products = Product.objects.all()

    # 🔥 SPLIT MESSAGE INTO WORDS
    words = msg.split()

    query = Q()
    for word in words:
        query |= Q(name__icontains=word)

    filtered = products.filter(query)

    # 🔁 FALLBACK LOGIC
    if not filtered.exists():
        if "cheap" in msg or "low" in msg:
            filtered = products.filter(price__lt=1000)
        elif "expensive" in msg:
            filtered = products.filter(price__gt=1000)
        else:
            filtered = products

    # 📦 RESPONSE
    if filtered.exists():
        result = "\n".join([f"{p.name} - ₹{p.price}" for p in filtered[:5]])
    else:
        result = "No products found"

    return JsonResponse({"response": result})

def about(request):
    return render(request, 'about.html')

def contact(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        print(name, email, message)  # you can save later

        return render(request, 'contact.html', {'success': True})

    return render(request, 'contact.html')

# SIGNUP
def signup_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        User.objects.create_user(username=username, password=password)
        return redirect('login')

    return render(request, 'signup.html')


# LOGIN
def login_view(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            return redirect('home')

    return render(request, 'login.html')


# LOGOUT
def logout_view(request):
    logout(request)
    return redirect('home')


# ORDERS (TEMP)
def orders(request):
    return render(request, 'orders.html')