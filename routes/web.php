<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Admin\AdminController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// --- Catálogo de productos ---
// Route::get('products', function () {
//     return Inertia::render('products'); 
// })->name('products');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('products', function () {
        return Inertia::render('products');
    })->name('products');
});

// --- Carrito de compras ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('cart', function () {
        return Inertia::render('cart');
    })->name('cart');
});


// --- Cotizaciones ---
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('quotations', function () {
        return Inertia::render('quotations');
    })->name('quotations');
});
require __DIR__.'/settings.php';


// --- Rutas de administrador ---
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('admin.dashboard');
    });