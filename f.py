import math

# --- Funciones de Derivación (Basadas en el documento) ---

def f(x):
    """Función: f(x) = e^x"""
    return math.exp(x)

def primera_derivada_adelante(x, h):
    # f'(x) ≈ [f(x+h) - f(x)] / h
    return (f(x + h) - f(x)) / h

def primera_derivada_atras(x, h):
    # f'(x) ≈ [f(x) - f(x-h)] / h
    return (f(x) - f(x - h)) / h

def primera_derivada_central(x, h):
    # f'(x) ≈ [f(x+h) - f(x-h)] / (2h)
    return (f(x + h) - f(x - h)) / (2 * h)

# --- Función de Segunda Derivada Central ---

def segunda_derivada_central(x, h):
    # f''(x) ≈ [f(x+h) - 2f(x) + f(x-h)] / h^2
    f_x = f(x)
    f_x_mas_h = f(x + h)
    f_x_menos_h = f(x - h)
    h_cuadrado = h * h
    return (f_x_mas_h - 2 * f_x + f_x_menos_h) / h_cuadrado

# --- Resolución ---
x2 = 0.025
h = 0.025
exacto2 = f(x2) # Valor Exacto

d2_central = segunda_derivada_central(x2, h)

print("\n--- Ejercicio 2: Segunda Derivada f''(0.025) ---")
print(f"Central:  {d2_central:.6f} (Error: {abs((d2_central - exacto2)/exacto2)*100:.3f}%)")
print(f"Valor Exacto: {exacto2:.6f}")