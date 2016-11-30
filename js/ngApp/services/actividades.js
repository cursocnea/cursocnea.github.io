function ActividadOrdenarOpciones(params) {

    this.opciones = params.opciones || [];
    this.ordenCorrecto = params.ordenCorrecto || [];
    this.ordenSeleccionado = [];
    this.cantidadIntentos = 0;

    this.correcta = function () {
        return arraysSonIguales(this.ordenCorrecto, this.ordenSeleccionado);
    };

    this.ordenActual = function () {
        return this.opciones.map(function (opcion) {
            return opcion.orden;
        });
    };

    this.contestar = function () {
        this.ordenSeleccionado = this.ordenActual()
        if (!this.correcta()) {
            this.cantidadIntentos++;
        }
    };

    this.contestada = function () {
        return this.ordenSeleccionado.length > 0;
    }

    this.puedeContestar = function () {
        return true;
    }
}

function ActividadCompletarFrase(opciones, enunciadoParte1, enunciadoParte2) {

    this.opciones = opciones || [];
    this.opcionSeleccionada = "";
    this.opcionContestada = "";
    this.enunciadoParte1 = enunciadoParte1 || "";
    this.enunciadoParte2 = enunciadoParte2 || "";
    this.cantidadIntentos = 0;

    this.puedeContestar = function () {
        return this.opcionSeleccionada ? true : false;
    }

    this.contestar = function () {
        if (this.puedeContestar()) {
            this.opcionContestada = this.opcionSeleccionada;
            if (!this.correcta()) {
                this.cantidadIntentos++
            }
        }
    }

    this.correcta = function () {
        return this.getOpcionCorrecta().valor === this.opcionContestada;
    }

    this.getOpcionCorrecta = function () {
        return this.opciones.find(function (opcion) {
            return opcion.correcta;
        })
    }

    this.contestada = function () {
        return this.opcionContestada ? true : false;
    }

}

function ActividadMultipleChoice(opciones, enunciado) {

    this.opciones = opciones || [];
    this.opcionSeleccionada = "";
    this.opcionContestada = "";
    this.enunciado = enunciado || "";
    this.cantidadIntentos = 0;

    this.puedeContestar = function () {
        return this.opcionSeleccionada ? true : false;
    }

    this.contestar = function () {
        if (this.puedeContestar()) {
            this.opcionContestada = this.opcionSeleccionada;
            if(!this.correcta()){
                this.cantidadIntentos++
            }
        }
    }

    this.correcta = function () {
        return this.getOpcionCorrecta().valor === this.opcionContestada;
    }

    this.getOpcionCorrecta = function () {
        return this.opciones.find(function (opcion) {
            return opcion.correcta;
        })
    }

    this.contestada = function () {
        return this.opcionContestada ? true : false;
    }

}

function ActividadMcMa(opciones) {

    this.opciones = opciones || [];
    this.cantidadIntentos = 0;


    this.contestar = function () {
        if (this.puedeContestar()) {
            this.opciones.forEach(function (it) {
                it.seleccionada = it.marcada;
            });

            if (!this.correcta()) {
                this.cantidadIntentos++
            }
        }
    }

    this.correcta = function () {
        return this.opciones.every(function (opcion) {
            return (opcion.correcta && opcion.seleccionada) || (!opcion.correcta && !opcion.seleccionada);
        });
    }

    this.contestada = function () {
        return this.opciones.some(function (it) {
            return it.seleccionada;
        });
    }

    this.puedeContestar = function () {
        return this.opciones.some(function (it) {
            return it.marcada;
        });
    }

}

var actividad1 = new ActividadCompletarFrase(
    [
        {valor: "trabajar"},
        {valor: "capacitarse", correcta: true},
        {valor: "prestar servicio"}
    ]
);

var actividad2 = new ActividadMultipleChoice(
    [
        {valor: "A- Los postulantes QUE CUMPLEN los requisitos de la beca."},
        {valor: "B- Los postulantes QUE NO CUMPLEN los requisitos de la beca."},
        {valor: "C- Los postulantes A DEFINIR POR EL DIRECTOR si cumplen con los requisitos de la beca."},
        {valor: "D- Todos los listados."},
        {
            valor: "E- Los postulantes QUE CUMPLEN los requisitos de la beca y los postulantes A DEFINIR POR EL DIRECTOR si cumplen con los requisitos de la beca.",
            correcta: true
        }
    ]
);

var actividad3 = new ActividadOrdenarOpciones({
    opciones: [
        {valor: "Acta de Selección", orden: 1},
        {valor: "Acta de Preselección con la Tabla de Ponderación.", orden: 2},
        {valor: "Plan de capacitación.", orden: 3},
        {
            valor: "Nota de giro del Jefe de Organismo Principal a la Gerencia de " +
            "Planificación, Coordinación y Control con expreso aval a la selección realizada.", orden: 4
        },
        {valor: "Nota de Conformación del Comité de Preselección y Selección.", orden: 5}
    ],

    ordenCorrecto: [5, 2, 1, 3, 4]
});

var actividad4 = new ActividadMultipleChoice(
    [
        {valor: "Expediente 1"},
        {valor: "Expediente 2", correcta: true},
        {valor: "Expediente 3"},
    ]
);

var actividad5 = new ActividadOrdenarOpciones({
    opciones: [
        {valor: "Confeccionar listado final de postulantes desestimados", orden: 2},
        {valor: "Armar un acta de Preselección", orden: 5},
        {valor: "Controlar cuidadosamente los listados recibidos y la documentación sobre los tipos de beca", orden: 1},
        {valor: "Seleccionar los tres primeros candidatos según el orden de mérito", orden: 4},
        {
            valor: "Realizar el análisis de los Cvs de los que cumplen con los requisitos usando la tabla de ponderación",
            orden: 3
        }
    ],

    ordenCorrecto: [1, 2, 3, 4, 5]
});

//Incluir (a- la Nota de conformación b- Acta de preselección) del Comité de selección
//firmada por el Jefe de Organismo Principal.
var actividadI1 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "la Nota de conformación", correcta: true},
            {valor: "el Acta de preselección"}
        ],
        "Incluir", "del Comité de selección firmada por el Jefe de Organismo Principal."
    );
};


//En el Acta de preselección se debe (a-explicitar y enumerar a los postulantes que no
//cumplen con los requisitos   b-explicitar y enumerar a los postulantes que cumplen con los
//requisitos), en vistas de que se ha chequeado cada una de las tablas que integran el
//expediente.
var actividadI2 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "que cumplen"},
            {valor: "que no cumplen", correcta: true}
        ],
        "En el Acta de preselección se debe explicitar y enumerar a los postulantes ",
        "con los requisitos, en vistas de que se ha chequeado cada una de las tablas que integran el expediente."
    );
};

//La edad, el  género y ubicación geográfica (a- deben formar parte  b-no pueden formar
//parte) de los indicadores, a la hora de  puntuar a los candidatos.
var actividadI3 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "deben"},
            {valor: "no pueden", correcta: true}
        ],
        "La edad, el  género y ubicación geográfica",
        "formar parte de los indicadores, a la hora de  puntuar a los candidatos."
    );
};

//El Director debe chequear los tres listados elaborados por la Subgerencia Capital
//Intelectual.  Para el listado de postulantes “A definir por el director si cumplen con los
//requisitos de la beca”, (a-debe  aclararse qué candidatos serán tenidos en cuenta para la
//preselección y cuáles quedan desestimados, explicitando los motivos.  b- no debe
//aclararse qué candidatos serán tenidos en cuenta para la preselección y cuáles quedan
//desestimados, explicitando los motivos.)
var actividadI4 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "debe", correcta: true},
            {valor: "no debe"}
        ],

        'El Director debe chequear los tres listados elaborados por la Subgerencia Capital Intelectual.' +
        ' Para el listado de postulantes “A definir por el director si cumplen con los requisitos de la beca”,',

        'aclararse qué candidatos serán tenidos en cuenta para la preselección y cuáles quedan ' +
        'desestimados, explicitando los motivos.'
    );
};

//En la Tabla de Ponderación (a- sólo deben incluirse b- no deben incluirse) aquellos
//candidatos que cumplen con los requisitos de la Beca.
var actividadI5 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "sólo deben", correcta: true},
            {valor: "no deben"}
        ],
        "En la Tabla de Ponderación",
        "incluirse aquellos candidatos que cumplen con los requisitos de la Beca."
    );
};

//La totalidad de los postulantes contemplados para la beca en concurso (a- deben coincidir
//con la información provista a través del expediente  b- no es necesario que coincidan con
//la información que proviene del expediente). En caso de hallar inconsistencias, éstas
//deben ser transmitidas a la Subgerencia y deben ser resueltas antes de elaborar las actas
//de preselección y selección.
var actividadI6 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "deben coincidir", correcta: true},
            {valor: "no es necesario que coincidan"}
        ],

        "La totalidad de los postulantes contemplados para la beca en concurso",

        "con la información que proviene del expediente. En caso de hallar inconsistencias, éstas deben ser transmitidas " +
        "a la Subgerencia y deben ser resueltas antes de elaborar las actas de preselección y selección."
    );
};


//(a- no se debe enviar b-se debe enviar) en el expediente de Concurso el mail impreso,
//donde el candidato informa su decisión de desistir de la Beca y sin adjuntar
//documentación respaldatoria.
var actividadI7 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "No se debe"},
            {valor: "Se debe", correcta: true}
        ],
        "",
        "enviar en el expediente de Concurso el mail impreso, donde el candidato informa su decisión de " +
        "desistir de la Beca y sin adjuntar documentación respaldatoria."
    );
};

//Se debe utilizar la Tabla de Ponderación Modelo provista por la Subgerencia Capital
//Intelectual y (a- sin necesidad de definir un indicador b- una vez definido un indicador),
//completar en todos los casos. Por ejemplo, si fuera el promedio académico, no puede
//omitirse este dato en alguno de los candidatos y en caso de no tenerlo, se deberá
//consultar al postulante para poder completar en todos los casos el valor del indicador.
var actividadI8 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "sin necesidad de definir"},
            {valor: "una vez definido", correcta: true}
        ],
        "Se debe utilizar la Tabla de Ponderación Modelo provista por la Subgerencia Capital Intelectual y",

        "un indicador, completar en todos los casos. Por ejemplo, si fuera el promedio académico, no puede" +
        "omitirse este dato en alguno de los candidatos y en caso de no tenerlo, se deberá" +
        "consultar al postulante para poder completar en todos los casos el valor del indicador."
    );
};

//Una vez realizada la ponderación, es muy frecuente que el Comité determine un criterio
//por el cual entrevista a los primeros, tres, cuatro o cinco postulantes. Es (a- es necesario
//b- no es necesario) explicitarlo, por ejemplo: “se decidió entrevistar a los postulantes cuya
//ponderación resultó mayor o igual a 1”.
var actividadI9 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "Es necesario", correcta: true},
            {valor: "No es necesario"}
        ],
        "Una vez realizada la ponderación, es muy frecuente que el Comité determine un criterio " +
        "por el cual entrevista a los primeros, tres, cuatro o cinco postulantes. ",

        'explicitarlo, por ejemplo: “se decidió entrevistar a los postulantes cuya ponderación resultó mayor o igual a 1”.'
    );
};

//La  beca es una oportunidad de capacitación y no un puesto de trabajo. A fin de evitar
//confusiones, se recomienda tener especial cuidado con los términos utilizados en las
//actas.
var actividadI10 = function () {
    return new ActividadMcMa(
        [
            {valor: "Beca", correcta: true},
            {valor: "Puesto de trabajo"},
            {valor: "Estipendio", correcta: true},
            {valor: "Sueldo"},
            {valor: "Horario de desarrollo de la beca", correcta: true},
            {valor: "Jornada laboral"},
            {valor: "Licencia anual por descanso", correcta: true},
            {valor: "Vacaciones"}
        ],

        "La  beca es una oportunidad de capacitación y no un puesto de trabajo. A fin de evitar" +
        "confusiones, se recomienda tener especial cuidado con los términos utilizados en las actas."
    );
};

//La ponderación de cada indicador debe estar entre 0 y 1. La suma total de todas las
//ponderaciones (a- debe dar 1    b- debe dar menos de 1)
var actividadI11 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "debe dar 1", correcta: true},
            {valor: "debe dar menos de 1"}
        ],

        "La ponderación de cada indicador debe estar entre 0 y 1. La suma total de todas las ponderaciones"
    );
};

//Elegir el nombre correcto del indicador en la Tabla de Ponderación:
var actividadI12 = function () {
    return new ActividadMultipleChoice(
        [
            {valor: "a- Experiencia laboral"},
            {valor: "b- Experiencia afín a la beca o actividades afines a la beca", correcta: true}
        ],
        "Elegir el nombre correcto del indicador en la Tabla de Ponderación: "
    );
};

//Sólo son válidos aquellos postulantes que cumplen con los tiempos y formas establecidos
//por la Gerencia Planificación, Coordinación y Control.  Los podrán encontrar detallados en
//(a- los tres listados enviados a cada director por esta Gerencia b-el listado de postulantes
//con formación académica afín a la beca). En caso de que se detectara algún postulante no
//incluido, primero se deberá informar a la Subgerencia Capital Intelectual a fin de aclarar la
//situación antes de hacer inclusiones que no correspondan.
var actividadI13 = function () {
    return new ActividadCompletarFrase(
        [
            {valor: "los tres listados enviados a cada director por esta Gerencia", correcta: true},
            {valor: "el listado de postulantes con formación académica afín a la beca"}
        ],
        "Sólo son válidos aquellos postulantes que cumplen con los tiempos y formas establecidos " +
        "por la Gerencia Planificación, Coordinación y Control.  Los podrán encontrar detallados en",

        ". En caso de que se detectara algún postulante no incluido, primero se deberá informar a la Subgerencia Capital " +
        "Intelectual a fin de aclarar la situación antes de hacer inclusiones que no correspondan."
    );
};

//En el resumen de las entrevistas se espera que:
var actividadI14 = function () {
    return new ActividadMultipleChoice(
        [
            {
                valor: "a- Cualquier persona que lo lea sea capaz de comprender por qué una persona quedó mejor " +
                "posicionada que otra una vez finalizada la etapa de las entrevistas.",
                correcta: true
            },
            {valor: "b- Sea sintético y que no se detalle por qué eligen a un postulante por sobre otro."}
        ],

        "En el resumen de las entrevistas se espera que: "
    );
};

var generarActividadesAi = function () {
    return [
        actividadI1(),
        actividadI2(),
        actividadI3(),
        actividadI4(),
        actividadI5(),
        actividadI6(),
        actividadI7(),
        actividadI8(),
        actividadI9(),
        actividadI10(),
        actividadI11(),
        actividadI12(),
        actividadI13(),
        actividadI14(),
    ];
};

