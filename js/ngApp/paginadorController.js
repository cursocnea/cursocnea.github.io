app.controller("paginadorController", function ($scope) {

    var self = this;
    this.cantidadPaginasAMostrar = Math.min(5, $scope.paginas.length);
    this.paginas = $scope.paginas;

    this.paginasAMostrar = function() {
        return self.paginas.slice(self.getIndiceDesde(), self.getIndiceDesde() + self.cantidadPaginasAMostrar);
    }

    this.getEstaEntreLasPrimeras = function() {
        return self.getIndicePaginaActual() < (self.getCantidadPaginasAlrededor() +1 )
    }

    this.getEstaEntreLasUltimas = function() {
        return (self.getIndicePaginaActual() + (self.getCantidadPaginasAlrededor()) + 1 ) > (self.paginas.length -1)
    }

    this.getIndiceDesde = function() {
        var indiceDesde = this.getIndicePaginaActual() - this.getCantidadPaginasAlrededor();

        if(indiceDesde < 0) {
            indiceDesde = 0;
        }

        if(self.getEstaEntreLasUltimas()) {
            indiceDesde = self.paginas.length - self.cantidadPaginasAMostrar;
        }

        return indiceDesde;
    }

    this.getCantidadPaginasAlrededor = function() {
        return Math.floor(this.cantidadPaginasAMostrar/2);
    }

    this.getIndicePaginaActual = function() {
        return self.paginas.indexOf($scope.paginaActual())
    }

});