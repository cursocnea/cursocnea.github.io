var app = angular.module('CNEA', [
    'ngRoute',
    'ngAnimate',
    'ngTouch',
    'ui.sortable'
])

app.config(function ($routeProvider) {
    $routeProvider
        .when('/:nombreTemplate', {
            controller: 'cursoController',
            templateUrl: function ($routeParams) {
                return 'templates/paginas/' + $routeParams.nombreTemplate + '.html';
            }
        })
        .otherwise({
            redirectTo: '/portada'
        });
});

app.controller("sideBarController", function ($scope, $location) {

    //TODO: descomentar
    $location.path("/");


    $scope.clickItemIndice = function (seccion) {
        if ($scope.seccionActual() != seccion) {
            $('body').removeClass("offcanvas-active");
        }

        $scope.irA(seccion.paginas[0]);
    };

    $scope.clickSubitemIndice = function (pagina) {
        $('body').removeClass("offcanvas-active");
        $scope.irA(pagina);
    }

    $scope.mostrarSideMenu = function () {
        $('body').addClass("offcanvas-active");
    }

    $scope.ocultarSideMenu = function () {
        $('body').removeClass("offcanvas-active");
    }

})

app.controller("cursoController", function ($scope, $location, $routeParams, paginaService, $timeout, $anchorScroll, audio) {
    $scope.actividad1 = actividad1;
    $scope.actividad2 = actividad2;
    $scope.actividad3 = actividad3;
    $scope.actividad4 = actividad4;
    $scope.actividad5 = actividad5;

    $scope.paginas = paginaService.paginas;
    $scope.secciones = paginaService.secciones;

    $scope.irUltimaPaginaVisitada = function () {
        if ($scope.comenzoCurso()) {
            $scope.irA($scope.ultimaPaginaVisitada());
        }
    }

    $scope.comenzoCurso = function () {
        return $scope.ultimaPaginaVisitada() != null
    }

    $scope.ultimaPaginaVisitada = function () {
        return paginaService.getPagina(localStorage.getItem("ultimaPaginaVisitada"));
    }

    $scope.paginaActual = function () {
        return paginaService.getPagina($routeParams.nombreTemplate) || $scope.paginas[0];
    };

    $scope.seccionActual = function () {
        return paginaService.getSeccionByPagina($scope.paginaActual());
    };

    $scope.irA = function (pagina) {
        if ($scope.paginas.indexOf($scope.paginaActual()) > $scope.paginas.indexOf(pagina)) {
            $("#columnaCentral").removeClass("haciaDerecha");
            $("#columnaCentral").addClass("haciaIzquierda");
        } else {
            $("#columnaCentral").removeClass("haciaIzquierda");
            $("#columnaCentral").addClass("haciaDerecha");
        }
        $location.path("/" + pagina.nombreTemplate);
    };

    $scope.abrirPagina = function () {
        $("#botoneraInferior").fadeTo(0, 0);
        $anchorScroll('top');
        $timeout($scope.paginaActual().bootstap, 1000);
        $timeout(function () {
            $("#botoneraInferior").fadeTo(500, 1);
        }, 1200);

        var audioSrc = "audio/" + $scope.paginaActual().nombreTemplate + ".mp3";

        $timeout(audio.play(audioSrc), 2000);

        if ($scope.paginas.indexOf($scope.paginaActual()) != 0) {
            localStorage.setItem("ultimaPaginaVisitada", $scope.paginaActual().nombreTemplate);
        }
    };

    $scope.paginaSiguiente = function () {
        var indiceSiguiente = $scope.paginas.indexOf($scope.paginaActual()) + 1;

        if (indiceSiguiente > $scope.paginas.length - 1) {
            return;
        }

        $scope.irA($scope.paginas[indiceSiguiente]);
    };

    $scope.paginaAnterior = function () {
        var indiceAnterior = $scope.paginas.indexOf($scope.paginaActual()) - 1;

        if (indiceAnterior < 0) {
            return;
        }

        $scope.irA($scope.paginas[indiceAnterior]);
    };

    $scope.irAUltimaPagina = function () {
        var ultimaPagina = $scope.paginas[$scope.paginas.length - 1]
        $scope.irA(ultimaPagina)
    };

    $scope.irAPrimeraPagina = function () {
        var primeraPagina = $scope.paginas[0]
        $scope.irA(primeraPagina)
    }

    $scope.esPrimeraPagina = function () {
        return $scope.paginas.indexOf($scope.paginaActual()) == 0;
    };

    $scope.esUltimaPagina = function () {
        return $scope.paginas.indexOf($scope.paginaActual()) + 1 == $scope.paginas.length;
    };

    $scope.toggleSideMenu = function () {
        $("body").toggleClass("offcanvas-active");
    }

    $scope.paginasParaIndice = function (seccion) {
        return seccion.paginas.filter(function (pagina) {
            return !pagina.noMostrarEnIndice;
        });
    }

    $scope.abrirPagina();

});


app.service("paginaService", function () {

    this.secciones = appData.secciones;

    this.generarPaginas = function () {
        var paginas = [];

        this.secciones.forEach(function (seccion) {
            paginas = paginas.concat(seccion.paginas);
        });

        return paginas;
    };

    this.getSeccionByPagina = function (pagina) {
        return this.secciones.find(function (seccion) {
            return seccion.paginas.some(function (it) {
                return it == pagina;
            })
        })
    }

    this.paginas = this.generarPaginas();

    this.getPagina = function (nombreTemplate) {
        return this.paginas.find(function (pagina) {
            return pagina.nombreTemplate == nombreTemplate;
        })
    };

})

app.factory('audio', function ($document) {
    var audioElement = document.getElementById("audio"); // <-- Magic trick here
    return {
        audioElement: audioElement,

        play: function (filename) {
            audioElement.src = filename;
            audioElement.play();
        }
    }
});

