from django.shortcuts import render

def catalogo_view(request):
    productos = [
        {"nombre": "margarita", "precio": 180, "categoria": "PIZZAS"},
        {"nombre": "peperoni", "precio": 195, "categoria": "PIZZAS"},
        {"nombre": "hawaiana", "precio": 200, "categoria": "PIZZAS"},
        {"nombre": "cuatro quesos", "precio": 220, "categoria": "PIZZAS"},
        {"nombre": "imperial suprema", "precio": 240, "categoria": "PIZZAS"},
        {"nombre": "pan de ajo", "precio": 65, "categoria": "ENTRADAS"},
        {"nombre": "alitas", "precio": 130, "categoria": "ENTRADAS"},
        {"nombre": "palitos de queso", "precio": 85, "categoria": "ENTRADAS"},
        {"nombre": "ensalada cesar", "precio": 95, "categoria": "ENTRADAS"},
        {"nombre": "calzone", "precio": 150, "categoria": "ENTRADAS"},
        {"nombre": "pizza de nutella", "precio": 150, "categoria": "POSTRES Y BEBIDAS"},
        {"nombre": "tiramisu", "precio": 80, "categoria": "POSTRES Y BEBIDAS"},
        {"nombre": "refresco 2lt", "precio": 55, "categoria": "POSTRES Y BEBIDAS"},
        {"nombre": "limonada", "precio": 40, "categoria": "POSTRES Y BEBIDAS"},
        {"nombre": "soda italiana", "precio": 50, "categoria": "POSTRES Y BEBIDAS"},
    ]
    return render(request, 'catalogo.html', {'productos': productos})