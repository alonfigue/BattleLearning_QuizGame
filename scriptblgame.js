const botonInicio = document.getElementById('boton-inicio')
const botonInstruc = document.getElementById('boton-instruc')
const botonSiguiente = document.getElementById('boton-siguiente')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const tiempoRestanteDisplay = document.getElementById('tiempo-restante')
var musica = new Audio("background_music.mp3");
var next = new Audio("next_sound.mp3");
var finish = new Audio("end_noise.mp3");

let arreglo, posArreglo, i = 0, segundosRestantes = 30, c = -10


botonInstruc.addEventListener('click', inst)
botonInicio.addEventListener('click', cuentaRegresiva)
botonInicio.addEventListener('click', startGame)


botonSiguiente.addEventListener('click', () => {
    segundosRestantes = 30
    i = i + 8
    posArreglo = Math.floor(Math.random() * 8) + i
    next.play();
    setNextQuestion()
})

function inst() {
    alert('                                  *Bienvenido a BattleLearning*'
        + '\n                  Listo para poner poner a prueba tus conocimientos?'
        + '\n->Instrucciones:'
        + '\n- Presiona Jugar para comenzar el juego'
        + '\n- Refresca la pagina para volver a la pantalla principal'
        + '\n- En cada nivel tendras una pregunta de un tema en especifico y cinco respuestas posibles'
        + '\n- Si la respuesta es correcta, el fondo se pondra verde, de lo contrario se pondra rojo'
        + '\n- Al finalizar el juego, se reiniciara al NIVEL 1'
        + '\n**Tiempo para permanecer en un nivel:'
        + '\n- El rango es de 30seg para permanecer en un nivel, de llegar a 0seg volveras al NIVEL 1'
        + '\n**Puntaje:'
        + '\n- El puntaje se mide por aciertos'
        + '\n- Al finalizar el juego, se le mostrara el puntaje final obtenido'
        +'\n- El puntaje final minimo (novatos) es de 0 puntos y el maximo (genios) es de 10 puntos'


        +'\n**TEMAS POR NIVEL:'

        +'\nNivel 1: Deportes... Nivel 2: Arte... Nivel 3: Cine'
        +'\nNivel 4: Musica... Nivel 5: Historia... Nivel 6: Geografia'
        +'\nNivel 7: Quimica... Nivel 8: Fisica'
        + '\nNivel 9: Matematicas'
        + '\nNivel 10: Computacion ')
}

function pauseAudio() {
    musica.pause();
    musica.currentTime = 0;
}

function playAudio() {
     musica.play();
}

function cuentaRegresiva() {


    setInterval(function () {
        
        if (segundosRestantes == 0) {

            alert('Su tiempo de respuesta ha culminado!\n- Obtuvo 0 puntos por no completar los 10 niveles del juego -\n Presione OK para volver a empezar')
            c=-10
            segundosRestantes=30
            startGame() 

        }

        if (segundosRestantes <= 0) {
            clearInterval(segundosRestantes = 0)

        }
        

        tiempoRestanteDisplay.innerHTML = segundosRestantes
        segundosRestantes -= 1
    }, 1000)

}


function startGame() {


    botonInicio.classList.add('hide')
    botonInstruc.classList.add('hide')
    arreglo = niveles
    posArreglo = Math.floor(Math.random() * 8) //Posicion de 0 a 7...  
    questionContainerElement.classList.remove('hide')

    setNextQuestion()
}

function setNextQuestion() {
    
    if (i > 79) {
        finish.play();
        alert('Se ha terminado el juego! \n- Puntaje acumulado: ' + c + '/10 puntos (aciertos) -\nPresione el boton OK para comenzar de nuevo el juego');
        i = 0         
        c = -10
        startGame()

    }

    resetState()
    showQuestion(arreglo[posArreglo])
 
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            
            button.dataset.correct = answer.correct
         
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    botonSiguiente.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (arreglo.length > posArreglo + 1) {
        botonSiguiente.classList.remove('hide')
    } else {
       
        botonSiguiente.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)

    if (correct) {
        
         element.classList.add('correct')
        c++
    } else {

        element.classList.add('wrong')

    }

  
}



function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const niveles = [

    // 10 Niveles, 8 preguntas al azar por cada nivel, 1 respuesta de 5 posibles 


    /********************************** PREGUNTAS NIVEL 1 Deport **********************************************/


    {

        question: '* NIVEL #1: DEPORTE *\n\n - Cuantas medallas olimpicas tiene Michael Phelps? (tiene el record de ser el mas condecorado)',
        answers: [
            { text: '15', correct: false },
            { text: '22', correct: false },
            { text: '28', correct: true },
            { text: '30', correct: false },
            { text: '26', correct: false }
        ]
    },
    {
        question: '* NIVEL #1: DEPORTE *\n\n - Que jugador de futbol ha ganado mas copas del mundo? (con 3 ganadas)',
        answers: [
            { text: 'Maradona', correct: false },
            { text: 'Johan Cruyff', correct: false },
            { text: 'Michel Platini', correct: false },
            { text: 'Pele', correct: true },
            { text: 'Ronaldo', correct: false }
        ]
    },

    {
        question: '* NIVEL #1: DEPORTE *\n\n - Quien es el futbolistas con mas goles en la liga de Espania?',
        answers: [
            { text: 'Lionel Messi', correct: true },
            { text: 'Cristiano Ronaldo', correct: false },
            { text: 'David Villa', correct: false },
            { text: 'Ferenc Puskas', correct: false },
            { text: 'Telmo Zarra', correct: false }
        ]
    },
    {
        question: '* NIVEL #1: DEPORTE * \n\n - Cuantas veces Michael Jordan fue campeon de la NBA?',
        answers: [
            { text: 'Cuatro', correct: false },
            { text: 'Ocho', correct: false },
            { text: 'Cinco', correct: false },
            { text: 'Nueve', correct: false },
            { text: 'Seis', correct: true }
        ]
    },
    {
        question: '* NIVEL #1: DEPORTE * \n\n - Que pais posee la mayor cantidad de ciclistas en el salon de la fama del ciclismo?',
        answers: [
            { text: 'Espana', correct: false },
            { text: 'Italia', correct: true },
            { text: 'Colombia', correct: false },
            { text: 'Francia', correct: false },
            { text: 'Alemania', correct: false }
        ]
    },

    {
        question: '* NIVEL #1: DEPORTE * \n\n - Que pais ha ganado mas veces el mundial de futbol? (Con 5 campeonatos ganados)',
        answers: [
            { text: 'Italia', correct: false },
            { text: 'Ururguay', correct: false },
            { text: 'Brasil', correct: true },
            { text: 'Francia', correct: false },
            { text: 'Alemania', correct: false }
        ]
    },
    {
        question: '* NIVEL #1: DEPORTE * \n\n - Quien ha sido el unico tenista de la historia en ganar doce torneos del mismo Grand Slam?',
        answers: [
            { text: 'Andy Murray', correct: false },
            { text: 'Roger Federer', correct: false },
            { text: 'Novak Djokovic', correct: false },
            { text: 'Boris Becker', correct: false },
            { text: 'Rafael Nadal', correct: true }
        ]
    },
    {
        question: '* NIVEL #1: DEPORTE * \n\n - A quien se le otorga el balon de oro? (futbolista)',
        answers: [
            { text: 'Al jugador con mas goles del anio', correct: false },
            { text: 'Al mejor jugador mundial del anio', correct: true },
            { text: 'Al que tenga mas asistencias del anio', correct: false },
            { text: 'Aquel con el mejor gol del anio', correct: false },
            { text: 'Al mejor jugador mundial de los ultimos cuatro anios', correct: false }
        ]
    },


    /********************************** PREGUNTAS NIVEL 2 Arte **********************************************/
    {
        question: '* NIVEL #2: ARTE * \n\n - Quien pinto La Gioconda (La Mona Lisa)?',
        answers: [
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Claude Monet', correct: false },
            { text: 'Rembrandt', correct: false },
            { text: 'Frida Kahlo', correct: false }
        ]
    },
    {
        question: '* NIVEL #2: ARTE * \n\n - Quien pinto La noche estrellada?',
        answers: [
            { text: 'Edvard Munch', correct: false },
            { text: 'Vincent van Gogh', correct: true },
            { text: 'Caravaggio', correct: false },
            { text: 'Tiziano', correct: false },
            { text: 'Pablo Picasso', correct: false }
        ]
    },
    {
        question: '* NIVEL #2: ARTE * \n\n - En que siglo se inicio el Renacimiento?',
        answers: [
            { text: 'XVI', correct: false },
            { text: 'XX', correct: false },
            { text: 'XIX', correct: false },
            { text: 'XV', correct: true },
            { text: 'XIV', correct: false }
        ]
    },

    {
        question: '* NIVEL #2: ARTE * \n\n - En que anio nacio Goya?',
        answers: [
            { text: '1746', correct: true },
            { text: '1700', correct: false },
            { text: '1756', correct: false },
            { text: '1760', correct: false },
            { text: '2016', correct: false }
        ]
    },
    {
        question: '* NIVEL #2: ARTE * \n\n - En que anio pinto Picasso el Guarnica?',
        answers: [
            { text: '2000', correct: false },
            { text: '1937', correct: true },
            { text: '1926', correct: false },
            { text: '1902', correct: false },
            { text: '1899', correct: false }
        ]
    },
    {
        question: '* NIVEL #2: ARTE * \n\n - En que siglo nacio Van Gogh?',
        answers: [
            { text: 'XV', correct: false },
            { text: 'XVII', correct: false },
            { text: 'X', correct: false },
            { text: 'XXI', correct: false },
            { text: 'XIX', correct: true }
        ]
    },

    {
        question: '* NIVEL #2: ARTE * \n\n - En que museo esta la Mona Lisa?',
        answers: [
            { text: 'Museo del Prado', correct: false },
            { text: 'British Museum', correct: false },
            { text: 'Louvre', correct: true },
            { text: 'Galeria Uffizi', correct: false },
            { text: 'Tate Modern', correct: false }
        ]
    },
    {
        question: '* NIVEL #2: ARTE * \n\n - En que siglo nacio Diego Velazquez?',
        answers: [
            { text: 'XVII', correct: true },
            { text: 'XXI', correct: false },
            { text: 'XVIII', correct: false },
            { text: 'XIII', correct: false },
            { text: 'XV', correct: false }
        ]
    },




    /********************************** PREGUNTAS NIVEL 3 Cine **********************************************/


    {
        question: '* NIVEL #3: CINE *\n\n - Quien dirigio la trilogia original de la saga de Star Wars?',
        answers: [
            { text: 'Woody Allen', correct: false },
            { text: 'Steven Spielberg', correct: false },
            { text: 'George Lucas', correct: true },
            { text: 'Tim Burton', correct: false },
            { text: 'Quentin Tarantino', correct: false }
        ]
    },
    {
        question: '* NIVEL #3: CINE * \n\n - Por cual pelicula gano Leonardo Dicaprio su primer Oscar?',
        answers: [
            { text: 'El origen', correct: false },
            { text: 'El aviador', correct: false },
            { text: 'El lobo de Wall Street', correct: false },
            { text: 'El Renacido', correct: true },
            { text: 'Titanic', correct: false }
        ]
    },
    {
        question: '* NIVEL #3: CINE * \n\n - En que pelicula un pez payaso pierde a su hijo y emprende una aventura para buscarlo?',
        answers: [
            { text: 'Buscando a Dory', correct: false },
            { text: 'Buscando a Nemo', correct: true },
            { text: 'Espanta Tiburones', correct: false },
            { text: 'Tiburon', correct: false },
            { text: 'Happy Feet', correct: false }
        ]
    },

    {
        question: '* NIVEL #3: CINE *\n\n - En que pelicula animada un ogro se hace amigo de un burro?',
        answers: [
            { text: 'Las Cronicas de Spiderwick', correct: false },
            { text: 'El Hobbit', correct: false },
            { text: 'El Senior de los Anillos', correct: false },
            { text: 'Shrek', correct: true },
            { text: 'El Principe de Persia', correct: false }
        ]
    },
    {
        question: '* NIVEL #3: CINE * \n\n - Que actor protagoniza la pelicula Rocky?',
        answers: [
            { text: 'Brad Pitt', correct: false },
            { text: 'Sylvester Stallone', correct: true },
            { text: 'Robert De Niro', correct: false },
            { text: 'Tom Cruise', correct: false },
            { text: 'Arnold Schwarzenegger', correct: false }
        ]
    },
    {
        question: '* NIVEL #3: CINE * \n\n - Que actor interpreta a Han Solo en la saga Star Wars?',
        answers: [
            { text: 'Johnny Depp', correct: false },
            { text: 'Will Smith', correct: false },
            { text: 'Tom Hanks', correct: false },
            { text: 'Clint Eastwood', correct: false },
            { text: 'Harrison Ford', correct: true }
        ]
    },

    {
        question: '* NIVEL #3: CINE * \n\n - La pelicula mas taquillera de la historia hasta ahora es?',
        answers: [
            { text: 'Avatar', correct: false },
            { text: 'Jurassic World', correct: false },
            { text: 'Titanic', correct: false },
            { text: 'Avengers: Endgame', correct: true },
            { text: 'Star Wars: El despertar de la Fuerza', correct: false }
        ]
    },
    {
        question: '* NIVEL #3: CINE * \n\n - Quien produce las peliculas de Toy Story?',
        answers: [
            { text: 'Walt Disney Studios', correct: false },
            { text: 'Pixar', correct: true },
            { text: 'Mattel', correct: false },
            { text: 'Warner Bros', correct: false },
            { text: 'Fox', correct: false }
        ]
    },


    /********************************** PREGUNTAS NIVEL 4 Music **********************************************/


    {
        question: '* NIVEL #4: MUSICA *\n\n - De que nacionalidad era Beethoven? ',
        answers: [
            { text: 'Austriaca', correct: false },
            { text: 'Noezelandesa', correct: false },
            { text: 'Alemana', correct: true },
            { text: 'Australiana', correct: false },
            { text: 'Eslovaca', correct: false }
        ]
    },
    {
        question: '* NIVEL #4: MUSICA * \n\n - En que pais nacio Freddie Mercury?',
        answers: [
            { text: 'Rumania', correct: false },
            { text: 'Polonia', correct: false },
            { text: 'Chequia', correct: false },
            { text: 'Tanzania', correct: true },
            { text: 'Hungria', correct: false }
        ]
    },
    {
        question: '* NIVEL #4: MUSICA * \n\n - Cuantas cuerdas tiene un violin?',
        answers: [
            { text: 'Cinco', correct: false },
            { text: 'Cuatro', correct: true },
            { text: 'Siete', correct: false },
            { text: 'Una', correct: false },
            { text: 'Nueve', correct: false }
        ]
    },


    {
        question: '* NIVEL #4: MUSICA *\n\n - Cuantas cuerdas tiene una guitarra?',
        answers: [
            { text: 'Ocho', correct: false },
            { text: 'Siete', correct: false },
            { text: 'Diez', correct: false },
            { text: 'Dos', correct: false },
            { text: 'Seis', correct: true }
        ]
    },
    {
        question: '* NIVEL #4: MUSICA * \n\n - Cuantas cuerdas tiene un bajo?',
        answers: [
            { text: 'Una', correct: false },
            { text: 'Nueve', correct: false },
            { text: 'Cuatro', correct: true },
            { text: 'Tres', correct: false },
            { text: 'Ocho', correct: false }
        ]
    },
    {
        question: '* NIVEL #4: MUSICA * \n\n - Que cantante es considerado El Rey del Rock and Roll?',
        answers: [
            { text: 'Elvis Presley', correct: true },
            { text: 'Michael Jackson', correct: false },
            { text: 'Chuck Berry', correct: false },
            { text: 'Little Richard', correct: false },
            { text: 'Buddy Holly', correct: false }
        ]
    },

    {
        question: '* NIVEL #4: MUSICA * \n\n - En que pais nacio Antonio Vivaldi?',
        answers: [
            { text: 'Belgica', correct: false },
            { text: 'Espania', correct: false },
            { text: 'Venezuela', correct: false },
            { text: 'Italia', correct: true },
            { text: 'Estados Unidos', correct: false },
        ]
    },
    {
        question: '* NIVEL #4: MUSICA * \n\n - De cual famoso cantante es la cancion Imagine?',
        answers: [
            { text: 'Michael Jackson', correct: false },
            { text: 'Simon Diaz', correct: false },
            { text: 'John Lennon', correct: true },
            { text: 'Justin Bieber', correct: false },
            { text: 'Ricky Martin', correct: false }
        ]
    },


    /********************************** PREGUNTAS NIVEL 5 Historia **********************************************/


    {
        question: '* NIVEL #5: HISTORIA *\n\n - Cual fue el primer metal que el hombre empleo?',
        answers: [
            { text: 'Oro', correct: false },
            { text: 'Cobre', correct: true },
            { text: 'Plata', correct: false },
            { text: 'Plomo', correct: false },
            { text: 'Torio', correct: false }
        ]
    },
    {
        question: '* NIVEL #5: HISTORIA * \n\n - En que anio descubrio Colon America?',
        answers: [
            { text: '2002', correct: false },
            { text: '1586', correct: false },
            { text: '1492', correct: true },
            { text: '1996', correct: false },
            { text: '1481', correct: false }
        ]
    },
    {
        question: '* NIVEL #5: HISTORIA * \n\n - Quien fue el primer emperador romano?',
        answers: [
            { text: 'Cesar Augusto', correct: true },
            { text: 'Julio', correct: false },
            { text: 'Neron', correct: false },
            { text: 'Caligula', correct: false },
            { text: 'Hugo Chavez', correct: false }
        ]
    },

    {
        question: '* NIVEL #5: HISTORIA *\n\n -En que pais nacio Hitler?',
        answers: [
            { text: 'Jamaica', correct: false },
            { text: 'Austria', correct: false },
            { text: 'Polonia', correct: false },
            { text: 'Suiza', correct: false },
            { text: 'Alemania', correct: true }
        ]
    },
    {
        question: '* NIVEL #5: HISTORIA * \n\n - En que isla murio Napoleon?',
        answers: [
            { text: 'Bora Bora', correct: false },
            { text: 'Bali', correct: false },
            { text: 'Isla de Margarita', correct: false },
            { text: 'Santorini', correct: true },
            { text: 'Claude Monet', correct: false }
        ]
    },
    {
        question: '* NIVEL #5: HISTORIA * \n\n - Como se llamaba el primer Presidente de los Estados Unidos?',
        answers: [
            { text: 'Abraham Lincoln', correct: false },
            { text: 'George Washington', correct: true },
            { text: 'Thomas Jefferson', correct: false },
            { text: 'Donald Trump', correct: false },
            { text: 'John F. Kennedy', correct: false }
        ]
    },

    {
        question: '* NIVEL #5: HISTORIA * \n\n - En que anio inicio la segunda guerra mundial?',
        answers: [
            { text: '2010', correct: false },
            { text: '1945', correct: false },
            { text: '1956', correct: false },
            { text: '1520', correct: false },
            { text: '1939', correct: true }
        ]
    },
    {
        question: '* NIVEL #5: HISTORIA * \n\n - En que anio se invento el internet?',
        answers: [
            { text: '1998', correct: false },
            { text: '2000', correct: false },
            { text: '1969', correct: true },
            { text: '1987', correct: false },
            { text: '1985', correct: false }
        ]
    },

    /********************************** PREGUNTAS NIVEL 6 Geog **********************************************/


    {
        question: '* NIVEL #6: GEOGRAFIA *\n\n - En que pais puedes visitar Machu Picchu?',
        answers: [
            { text: 'Chile', correct: false },
            { text: 'Uruguay', correct: false },
            { text: 'Ecuador', correct: false },
            { text: 'Peru', correct: true },
            { text: 'Bolivia', correct: false }
        ]
    },
    {
        question: '* NIVEL #6: GEOGRAFIA * \n\n - Cual es el desierto mas grande del mundo?',
        answers: [
            { text: 'Antartida', correct: true },
            { text: 'Sahara', correct: false },
            { text: 'Medanos de Coro', correct: false },
            { text: 'Gobi', correct: false },
            { text: 'Kalahari', correct: false }
        ]
    },
    {
        question: '* NIVEL #6: GEOGRAFIA * \n\n - Cual es la ciudad mas antigua del mundo?',
        answers: [
            { text: 'Benares', correct: true },
            { text: 'Jerusalen', correct: false },
            { text: 'Atenas', correct: false },
            { text: 'Damasco', correct: false },
            { text: 'Cabimas', correct: false }
        ]
    },

    {
        question: '* NIVEL #6: GEOGRAFIA *\n\n - En que monte acabo el arca de Noe de acuerdo a la Biblia?',
        answers: [
            { text: 'Pico Bolivar', correct: false },
            { text: 'Ararat', correct: true },
            { text: 'Monte Chiliad', correct: false },
            { text: 'Gran Canion', correct: false },
            { text: 'Everest', correct: false }
        ]
    },
    {
        question: '* NIVEL #6: GEOGRAFIA * \n\n - Que nombre se la da a la parte norte de China?',
        answers: [
            { text: 'Guanxi', correct: false },
            { text: 'Tibet', correct: false },
            { text: 'Chinchanpu', correct: false },
            { text: 'Xinjiang', correct: false },
            { text: 'Manchuria', correct: true }
        ]
    },
    {
        question: '* NIVEL #6: GEOGRAFIA * \n\n - Cual es la isla mas grande del mundo?',
        answers: [
            { text: 'Groenlandia', correct: true },
            { text: 'La Isla de los Leprosos', correct: false },
            { text: 'Japon', correct: false },
            { text: 'Aruba', correct: false },
            { text: 'Curazao', correct: false }
        ]
    },

    {
        question: '* NIVEL #6: GEOGRAFIA * \n\n - En que pais se encuentra Transilvania?',
        answers: [
            { text: 'Venezuela', correct: false },
            { text: 'Estados Unidos', correct: false },
            { text: 'Belgica', correct: false },
            { text: 'Ucrania', correct: false },
            { text: 'Rumania', correct: true }
        ]
    },
    {
        question: '* NIVEL #6: GEOGRAFIA * \n\n - Que pais tiene mas lagos naturales?',
        answers: [
            { text: 'Venezuela', correct: false },
            { text: 'Estados Unidos', correct: false },
            { text: 'Italia', correct: false },
            { text: 'Canada', correct: true },
            { text: 'Grecia', correct: false }
        ]
    },

    /********************************** PREGUNTAS NIVEL 7 Quimica **********************************************/


    {
        question: '* NIVEL #7: QUIMICA  *\n\n - Cual es el elemento quimico con menor peso atomico?',
        answers: [
            { text: 'Helio', correct: false },
            { text: 'Neon', correct: false },
            { text: 'Oxigeno', correct: false },
            { text: 'Hidrogeno', correct: true },
            { text: 'Mercurio', correct: false }
        ]
    },
    {
        question: '* NIVEL #7: QUIMICA  * \n\n - Como se llama la temperatura a la que una sustancia pasa de liquido a gas?',
        answers: [
            { text: 'A toque', correct: false },
            { text: 'Punto de ebullicion', correct: true },
            { text: 'Quemada', correct: false },
            { text: 'Punto de fusion', correct: false },
            { text: 'Punto de congelacion', correct: false }
        ]
    },
    {
        question: '* NIVEL #7: QUIMICA  * \n\n - Cual es el simbolo quimico de la Plata?',
        answers: [
            { text: 'Pl', correct: false },
            { text: 'Pt', correct: false },
            { text: 'At', correct: false },
            { text: 'Ar', correct: false },
            { text: 'Ag', correct: true }
        ]
    },


    {
        question: '* NIVEL #7: QUIMICA  *\n\n - Que quimico desmintio la teoria de la generacion espontanea de vida?',
        answers: [
            { text: 'Louis Pasteur', correct: true },
            { text: 'Amadeo Avogadro', correct: false },
            { text: 'Antoine Lavoisier', correct: false },
            { text: 'Dimitri Mendelev', correct: false },
            { text: 'Marie Curie', correct: false }
        ]
    },
    {
        question: '* NIVEL #7: QUIMICA  * \n\n - Como se llaman los atomos que poseen carga positiva?',
        answers: [
            { text: 'Aniones', correct: false },
            { text: 'Axiones', correct: false },
            { text: 'Mariones', correct: false },
            { text: 'Cationes', correct: true },
            { text: 'Aliones', correct: false }
        ]
    },
    {
        question: '* NIVEL #7: QUIMICA  * \n\n - Que elementos quimicos componen el agua?',
        answers: [
            { text: 'Helio y Oxigeno', correct: false },
            { text: 'Hidrogeno y Helio', correct: false },
            { text: 'Helio y Mercurio', correct: false },
            { text: 'Hidrogeno y Oxigeno', correct: true },
            { text: 'Mercurio y Oxigeno', correct: false }
        ]
    },


    {
        question: '* NIVEL #7: QUIMICA  * \n\n - Cuantos gases nobles existen?',
        answers: [
            { text: '6', correct: true },
            { text: '2', correct: false },
            { text: '8', correct: false },
            { text: '3', correct: false },
            { text: '12', correct: false }
        ]
    },
    {
        question: '* NIVEL #7: QUIMICA  * \n\n - Quien es conocido como el padre de la quimica moderna?',
        answers: [
            { text: 'Louis Pasteur', correct: false },
            { text: 'Dimitri Mendelev', correct: false },
            { text: 'Antoine Lavoisier', correct: true },
            { text: 'Niels Bohr', correct: false },
            { text: 'Louis de Broglie', correct: false }
        ]
    },

    /********************************** PREGUNTAS NIVEL 8 Fisica **********************************************/


    {
        question: '* NIVEL #8: FISICA  *\n\n - Segun la Segunda Ley de Newton, a que es proporcional la fuerza?',
        answers: [
            { text: 'Velocidad', correct: false },
            { text: 'Masa', correct: false },
            { text: 'Energia', correct: false },
            { text: 'Peso', correct: false },
            { text: 'Aceleracion', correct: true }
        ]
    },
    {
        question: '* NIVEL #8: FISICA  * \n\n - Como se llaman las particulas elementales sin masa que componen la luz?',
        answers: [
            { text: 'Neutrones', correct: false },
            { text: 'Protones', correct: false },
            { text: 'Electrones', correct: false },
            { text: 'Fotones', correct: true },
            { text: 'Axiones', correct: false }
        ]
    },
    {
        question: '* NIVEL #8: FISICA  * \n\n - Que deben cumplir dos magnitudes vectoriales para ser paralelas?',
        answers: [
            { text: 'Deben tener la misma direccion', correct: true },
            { text: 'Deben tener diferente direccion', correct: false },
            { text: 'Deben tener mismo sentido', correct: false },
            { text: 'Deben tener diferente sentido', correct: false },
            { text: 'Deben tener misma direccion y sentido', correct: false }
        ]
    },

    {
        question: '* NIVEL #8: FISICA  *\n\n - Cuantas leyes de Kepler describen el movimiento de los planetas en el cielo?',
        answers: [
            { text: '6', correct: false },
            { text: '2', correct: false },
            { text: '5', correct: false },
            { text: '4', correct: false },
            { text: '3', correct: true }
        ]
    },
    {
        question: '* NIVEL #8: FISICA  * \n\n - Quien postulo la teoria de la relatividad?',
        answers: [
            { text: 'Galileo Galilei', correct: false },
            { text: 'Isaac Newton', correct: false },
            { text: 'Nicolas Copernico', correct: false },
            { text: 'Albert Einstein', correct: true },
            { text: 'Stephen Hawking', correct: false }
        ]
    },
    {
        question: '* NIVEL #8: FISICA  * \n\n - Quien fue la primera persona en definir la velocidad de un cuerpo?',
        answers: [
            { text: 'Galileo Galilei', correct: true },
            { text: 'Isaac Newton', correct: false },
            { text: 'Nicolas Copernico', correct: false },
            { text: 'Michael Faraday', correct: false },
            { text: 'James Maxwell', correct: false }
        ]
    },

    {
        question: '* NIVEL #8: FISICA  * \n\n - Cuantas magnitudes fundamentales posee la fisica?',
        answers: [
            { text: '12', correct: false },
            { text: '3', correct: false },
            { text: '5', correct: false },
            { text: '10', correct: false },
            { text: '7', correct: true }
        ]
    },
    {
        question: '* NIVEL #8: FISICA  * \n\n - Cual es la unidad en el sistema internacional para medir el trabajo y la energia?',
        answers: [
            { text: 'Amperio', correct: false },
            { text: 'Voltio', correct: false },
            { text: 'Joule', correct: true },
            { text: 'Watt', correct: false },
            { text: 'Coulomb', correct: false }
        ]
    },

    /********************************** PREGUNTAS NIVEL 9 Mate **********************************************/


    {
        question: '* NIVEL #9: MATEMATICAS  *\n\n - Representacion grafica del numero nueve mil treinta y seis',
        answers: [
            { text: '936', correct: false },
            { text: '90036', correct: false },
            { text: '900036', correct: false },
            { text: '9036', correct: true },
            { text: '900063', correct: false }
        ]
    },
    {
        question: '* NIVEL #9: MATEMATICAS  * \n\n - Cual es el numero anterior a 1000',
        answers: [
            { text: '999', correct: true },
            { text: '1001', correct: false },
            { text: '100', correct: false },
            { text: '9999', correct: false },
            { text: '99', correct: false }
        ]
    },
    {
        question: '* NIVEL #9: MATEMATICAS  * \n\n - Para calcular cuanto es un tercio de 3996, que tienes que hacer?',
        answers: [
            { text: 'Dividir entre tres', correct: true },
            { text: 'Multiplicar por tres', correct: false },
            { text: 'Restar tres', correct: false },
            { text: 'Sumar tres', correct: false },
            { text: 'Dividir entre tres y luego multiplicar por tres', correct: false }
        ]
    },

    {
        question: '* NIVEL #9: MATEMATICAS  *\n\n - El poligono de siete lados es el...',
        answers: [
            { text: 'Hexagono', correct: false },
            { text: 'Eneagono', correct: false },
            { text: 'Septagono', correct: false },
            { text: 'Sietagono', correct: false },
            { text: 'Heptagono', correct: true }
        ]
    },
    {
        question: '* NIVEL #9: MATEMATICAS  * \n\n - Cuantos trimestres tiene un semestre?',
        answers: [
            { text: '3', correct: false },
            { text: '4', correct: false },
            { text: '1', correct: false },
            { text: '5', correct: false },
            { text: '2', correct: true },
        ]
    },
    {
        question: '* NIVEL #9: MATEMATICAS  * \n\n - A cuantas unidades equivale 10 decenas de millar',
        answers: [
            { text: '100000', correct: true },
            { text: '10000', correct: false },
            { text: '1000', correct: false },
            { text: '1000000', correct: false },
            { text: '10100', correct: false }
        ]
    },

    {
        question: '* NIVEL #9: MATEMATICAS  * \n\n - Quien invento las Integrales y Derivadas?',
        answers: [
            { text: 'Descartes', correct: false },
            { text: 'Pitagoras', correct: false },
            { text: 'Gauss', correct: false },
            { text: 'Euler', correct: false },
            { text: 'Newton', correct: true }
        ]
    },
    {
        question: '* NIVEL #9: MATEMATICAS  * \n\n - El valor de PI',
        answers: [
            { text: '3.1516...', correct: false },
            { text: '3.1616...', correct: false },
            { text: '3.1166...', correct: false },
            { text: '3.1456...', correct: false },
            { text: '3.1416...', correct: true },
        ]
    },

    /********************************** PREGUNTAS NIVEL 10 Compu **********************************************/


    {
        question: '* NIVEL #10: COMPUTACION  *\n\n - Datos de cantidad entera de 16bits',
        answers: [
            { text: 'Float', correct: false },
            { text: 'Double', correct: false },
            { text: 'Long', correct: false },
            { text: 'Char', correct: false },
            { text: 'Int', correct: true },
        ]
    },
    {
        question: '* NIVEL #10: COMPUTACION  * \n\n - Quien invento el lenguaje Java?',
        answers: [
            { text: 'James Gosling', correct: true },
            { text: 'Bjarne Stroustrup', correct: false },
            { text: 'Dennis Ritchie', correct: false },
            { text: 'Guido van Rossum', correct: false },
            { text: 'Brendan Eich', correct: false }
        ]
    },
    {
        question: '* NIVEL #10: COMPUTACION  * \n\n - Quien invento el primer motor de Javascript?',
        answers: [
            { text: 'James Gosling', correct: false },
            { text: 'Dennis Ritchie', correct: false },
            { text: 'Bjarne Stroustrup', correct: false },
            { text: 'Guido van Rossum', correct: false },
            { text: 'Brendan Eich', correct: true },
        ]
    },


    {
        question: '* NIVEL #10: COMPUTACION  *\n\n - Quien invento el lenguaje C?',
        answers: [
            { text: 'Dennis Ritchie', correct: true },
            { text: 'Brendan Eich', correct: false },
            { text: 'James Gosling', correct: false },
            { text: 'Bjarne Stroustrup', correct: false },
            { text: 'Guido van Rossum', correct: false }
        ]
    },
    {
        question: '* NIVEL #10: COMPUTACION  * \n\n - Quien invento el lenguaje Phyton?',
        answers: [
            { text: 'Dennis Ritchie', correct: false },
            { text: 'Brendan Eich', correct: false },
            { text: 'James Gosling', correct: false },
            { text: 'Bjarne Stroustrup', correct: false },
            { text: 'Guido van Rossum', correct: true }
        ]
    },
    {
        question: '* NIVEL #10: COMPUTACION  * \n\n - En sistema binario el numero 7 decimal seria...',
        answers: [
            { text: '110', correct: false },
            { text: '111', correct: true },
            { text: '100', correct: false },
            { text: '101', correct: false },
            { text: '001', correct: false }
        ]
    },


    {
        question: '* NIVEL #10: COMPUTACION  * \n\n - El Padre de la computacion es...',
        answers: [
            { text: 'Bill Gates', correct: false },
            { text: 'Alan Turing', correct: false },
            { text: 'Mark Zuckerberg', correct: false },
            { text: 'Charles Babbage', correct: true },
            { text: 'Steve Jobs', correct: false }
        ]
    },
    {
        question: '* NIVEL #10: COMPUTACION  * \n\n - En que anio se creo la primera computadora funcional?',
        answers: [
            { text: '1945', correct: false },
            { text: '1936', correct: false },
            { text: '1939', correct: false },
            { text: '1940', correct: false },
            { text: '1941', correct: true }
        ]
    }

]