from django.shortcuts import render

def catalogo_view(request):
    productos = [
        {"nombre": "margarita", "precio": 180, "categoria": "PIZZAS", "stock": 10},
        {"nombre": "peperoni", "precio": 195, "categoria": "PIZZAS", "stock": 5},
        {"nombre": "hawaiana", "precio": 200, "categoria": "PIZZAS", "stock": 5},
        {"nombre": "cuatro quesos", "precio": 220, "categoria": "PIZZAS", "stock": 5},
        {"nombre": "imperial suprema", "precio": 240, "categoria": "PIZZAS", "stock": 5},
        {"nombre": "pan de ajo", "precio": 65, "categoria": "ENTRADAS", "stock": 5},
        {"nombre": "alitas", "precio": 130, "categoria": "ENTRADAS", "stock": 5},
        {"nombre": "palitos de queso", "precio": 85, "categoria": "ENTRADAS", "stock": 5},
        {"nombre": "ensalada cesar", "precio": 95, "categoria": "ENTRADAS", "stock": 5},
        {"nombre": "calzone", "precio": 150, "categoria": "ENTRADAS", "stock": 5},
        {"nombre": "pizza de nutella", "precio": 150, "categoria": "POSTRES Y BEBIDAS", "stock": 5},
        {"nombre": "tiramisu", "precio": 80, "categoria": "POSTRES Y BEBIDAS", "stock": 5},
        {"nombre": "refresco 2lt", "precio": 55, "categoria": "POSTRES Y BEBIDAS", "stock": 5},
        {"nombre": "limonada", "precio": 40, "categoria": "POSTRES Y BEBIDAS", "stock": 5},
        {"nombre": "soda italiana", "precio": 50, "categoria": "POSTRES Y BEBIDAS", "stock": 5},
    ]
    return render(request, 'catalogo.html', {'productos': productos})