app.controller("actividadIntegradoraController", function ($scope, $location) {

    this.limiteIntentosPorPregunta = 5;
    this.limiteErroresTotales = 5;

    this.avanzarActividad = function() {
        var indiceActual = this.actividades.indexOf(this.actividadActual);
        this.actividadActual = this.actividades[indiceActual + 1];
    };

    this.getTemplate = function(actividad) {
        if(actividad instanceof ActividadCompletarFrase) {
            return 'actividadCompletarFrase'
        } else if (actividad instanceof ActividadMcMa) {
            return 'actividadMcMa'
        } else if (actividad instanceof ActividadMultipleChoice) {
            return 'actividadMultipleChoice'
        }
    };

    this.cantidadRespuestasCorrectas = function() {
        var correctas = 0;
        this.actividades.forEach(function (it) {
            if(it.correcta()) correctas++
        });
        return correctas;
    }

    this.cantidadRespuestasIncorrectas = function() {
        var incorrectas = 0;
        this.actividades.forEach(function (it) {
            if((!it.correcta()) && it.contestada()) incorrectas++
        });
        return incorrectas;
    }

    this.totalErrores = function() {
        var errores = 0;
        this.actividades.forEach(function (it) {
            errores += it.cantidadIntentos;
        });
        return errores;
    }

    this.puedeResponder = function(actividad) {
        return !actividad.correcta() && !this.limiteReintentosAlcanzado(actividad) && !this.debeReintentar(actividad)
    }

    this.puedeContinuar = function(actividad) {
        return actividad.correcta();
    }

    this.debeReintentar = function(actividad) {
        return this.limiteReintentosAlcanzado(actividad) ||  this.limiteErroresAlcanzado();
    }

    this.limiteReintentosAlcanzado = function(actividad) {
        return actividad.cantidadIntentos >= this.limiteIntentosPorPregunta;
    }

    this.limiteErroresAlcanzado = function() {
        return this.totalErrores() >= this.limiteErroresTotales;
    }

    this.init = function() {
        this.actividades = generarActividadesAi();
        this.actividadActual = this.actividades[0];
    }

    this.reintentar = function () {
        this.init();
        $("#myCarousel").fadeTo(0,0);
        $("#myCarousel").delay(1000).fadeTo(1000,1);
    }

    this.mensajeReintentar = function(actividad) {
        if(this.limiteReintentosAlcanzado(actividad)) {
            return "Ha alcanzado el límite de reintentos para esta actividad, por favor reinicie la autoevaluación";
        }

        if(this.limiteErroresAlcanzado()) {
            return "Ha alcanzado el total de errores permitidos, por favor reinicie la autoevaluación";
        }

        return "Deberá volver a intentarlo (Intentos: " + actividad.cantidadIntentos + ")";
    };

    this.ultimaPregunta = function(actividad) {
        return actividad == this.actividades[this.actividades.length - 1];
    };

    this.init();
});