function mostrarProgresivamente(selector, tiempoInicial, tiempoEntre){

    var selector = selector || ".animado";
    var tiempoInicial = tiempoInicial || 1000;
    var tiempoEntre = tiempoEntre || 1500;

    $(selector).css( "opacity", 0);

    var tiempo = tiempoInicial;
    $(selector).each(function() {
        $(this).delay(tiempo).fadeTo(tiempoEntre, 1);
        tiempo += tiempoEntre;
    });

    return tiempo;
}
