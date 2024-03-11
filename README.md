# DAM2-M13-Projecte Final: Conexió per a pacients hospitalitzats  
* Documentació a Drive: [link](https://docs.google.com/document/d/1hd3Bz6my4IguYU_wsb3-hs2zADAu9lpZiahUEwz3Nck/edit?usp=sharing)
* Disseny Mockup a Figma: [link](https://www.figma.com/file/cyyW7doadS3J7h8FVQ4Puf/Wireframe-Baixa-fidelitat?type=design&node-id=0%3A1&mode=design&t=BPqK7PowOg7jwAQg-1)

## 1. INTRODUCCIÓ
### 1.1. Objectiu del projecte
- Contexte: Storytelling

Donada la necessitat de proporcionar un plataforma digital de comunicació, socialització i/o entreteniment de manera accessible e integrada per aquells pacients hospitalitzats, es crea una aplicació que sigui personalitzable per tots els públics i que dona una participació directa a l’usuari amb la que es pugui trobar a gust.
Amb això es vol donar una experiència més propera i agradable als pacients que es queden avorrits amb els medis més quotidians que es poden oferir(televisions, jocs de taula,...). Això suposa que el pacient té una varietat d'activitats a fer, des de llegir notícies, rebre missatgers dels seus coneguts propers, conèixer pacients en una mateixa situació, compartir opinions… Des d’una perspectiva de societat responsable, es destacaran aquells continguts que promouen la educació en el desenvolupament sostenible. 


- Propòsit

L'objectiu d’aquest projecte és aconseguir dissenyar, desenvolupar i llançar al públic un aplicació funcional que permet, a grans trets, concentrar els medis de comunicació i socials(correu, missatgeria instantánea, canals d’informació i oci digitals recurrents) en una única plataforma a la que es pugui accedir de manera sencilla.


- Requisits del client

Algunes de les idees que el client ha proporcionat són:
* Promoure l'educació peer to peer
* Clubs de videojocs per a joves
* Sessions de metavers
* Personalització
Això implica una alta interactivitat en el funcionament de l’aplicació, que es defineix en la lògica de negoci de l’apartat següent.



### 1.2. Funcionament
- Lògica de negoci

Donat un inici de sessió, l’usuari pot navegar per la pagina principal, la qual carregar nous continguts que el pugui interesar. Es per això que, haurà de respondre un seguit de preguntes inicials per conèixer les seves preferències. A partir d'aquí, el sistema recomanarà diferents continguts relacionats amb els seus gustos. A més d’això, si l’usuari es crea un compte d’usuari. podria estendre els serveis, com són la missatgeria grupal o personal o creació d’events virtuals.


- Funcionalitats

Una vegada l’usuari inicia l’aplicació, pot fer diferents accions en l’aplicació, com per exemple:
* Registrarse un compte
* Iniciar sessió en un compte
* Accedir a chats personals del seu entorn
* Pot unir-se a comunitats i grups en les que pot interactuar amb els integrants del grup
* Fer trucades amb els seus contactes i grups.
* Pot tenir un apartat en una comunitat en la que pugi interactuar amb els seus companys y profesorat on pugui rebre/entregar tasques y també pugui fer classes telemàtiques
* Tenir un calendari personal, on pugi anotar activitats personals i grupals



### 1.3. Arquitectura

(Documentació pendent en base a les tecnologies escollides)



### 1.4. Cronograma(Sprints) i Repartiment de feina
#### Sprint 1
- Resum

Aquest Sprint ha consistit en documentar la concepció del projecte i maquetar el funcionament de la interfície d’usuari i de la base de dades

- Kanban

1. inici

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/sprints/sprint1_inici.png)

2. final

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/sprints/sprint1_final.png)

#### Sprint 2
- Resum

Aquest Sprint ha consistit en polir la base de dades de l’Sprint 1, crear una guía d’estils per al disseny estètic i crear un mockup com a primer prototip, quant a aparença i funcionalitat

- Kanban

1. inici

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/sprints/sprint2_inici.png)

2. final

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/sprints/sprint2_final.png)




## 2. PRESSUPOST

(Pendent a escollir criteris)





## 3. PLEC DE PRESCRIPCIONS

### 3.1. Wireframe de baixa fidelidad
El nostre disseny de baixa fidelitat ha consistit en maquetar tots aquells dissenys d’interficie que representin les funcionalitats principals de la nostra aplicació.

La nostra aplicació comptarà amb una pàgina inicial en la que l'usuari podrà registrar-se, iniciar sessió o entrar com convidat. En cas de voler registrar-se, se’l portarà a un apartat on pugui posar les seves dades personals per posteriorment configurar el disseny de l’aplicació al seu gust; finalment es procedirà a  iniciar sessió. Si l’usuari entra com a convidat, podrà fer ús de l’aplicació amb certes restriccions.

Una vegada que s’inicia, l’usuari tindrà la pantalla principal, on es mostraran les notícies, publicacions de comunitats, events virtuals i recomanacions de comunitats. En aquesta pàgina principal tindrem 2 menús, el primer(que es troba en la part inferior de la pantalla) serà per poder navegar per diferents apartats de l’aplicació i el segon(situat a la part esquerra de la pantalla) serà  un menú amb els contactes favorits que té l’usuari. Al entrar en un d’aquests contactes freqüents, l’usuari serà guiat a l’apartat de chat personal amb el contacte seleccionat, i també podrá navegar a l’apartat de llista de xats o contactes des d’un navegador superior. I per tant, podrà seleccionar els contactes o els xats. També podrà accedir a informació dels contactes i editar la informació personal. Per últim hi haurà la possibilitat de fer trucades o videotrucades individuals o grupals.



### 3.2. Disseny de base de dades
En iniciar sessió, ens trobarem amb la base de dades inclou entitats com a Usuari, Contacte, Xat_privat, Grup_publico, Grup_privat i Comunitat i Activitats, juntament amb les seves respectives relacions.

**Usuari**

- L'entitat Usuari representa als usuaris de l'aplicació. Cada usuari té una identificació única, nom, primer cognom, data de naixement i contrasenya.

- La taula usuaris té una relació directa amb la taula contactes, on està taula contactes, que pot tenir un o més contactes, a diferència de la llista de contactes que només poden tenir un usuari.

**Contacte**

- L'entitat Contacte representa els contactes d'un usuari. Cada contacte està associat a un usuari i pot tenir atributs com a nom, telèfon, data de naixement i estat d'actiu.
- La següent relació que ens trobarem seran els xats privats, grups públics, grups privats i comunitats. En les quals l'usuari pot tenir 0 o molts més interaccions amb aquestes taules.

**Xats_privats**

- L'entitat ChatPrivado representa els missatges intercanviats entre dos usuaris en un xat privat. Cada xat privat té un identificador únic, missatges xifrats de tots dos usuaris i les identificacions dels usuaris participants.

**Grup_publico i Grup_privat**

- Les entitats Grup_publico i Grup_privat representen els grups d'usuaris en l'aplicació. Cada grup té un identificador únic i un tipus que indica si és públic o privat.

**Comunitats**

- L'entitat Comunitat representa les comunitats en l'aplicació. Cada comunitat té un identificador únic, comentaris, arxius i la identificació de l'usuari associat.


**Activitat**

- L'entitat Activitat representa les activitats en l'aplicació. Cada activitat té un identificador únic, nom, disponibilitat i tipus.
- L'entitat Activitat s'utilitza per a representar diverses activitats dins de l'aplicació, la qual cosa pot incloure esdeveniments, tasques, o qualsevol altra acció que els usuaris realitzin.



### 3.3. Mockup
El nostre mockup incorpora aspectes quant a navegació i funcionament importants que no es van tindre en compte en el disseny del wireframe.

Per començar la pàgina de benvinguda, que té tindrà el logotip amb la marca de l’aplicació, oferirà dues opcions: 

- La primera, per començar a fer ús de l’aplicació sense la necessitat de fer un inici de sessió (tot i que  tindrà disponible l'opció en l’aplicació).
- La segona, si vol fer ús de les funcionalitats d'accés a xats i videotrucades, serà per accedir amb un compte existent, en cas de no tenir-ho, tindrà l’opció de registrarse.
  
Seguidament del primer pas d’entrada, es dirigirà a l’usuari a la pàgina de configuració inicial. Per una banda podrà escollir les opcions d'accessibilitat que més li convinguin per fer ús l’aplicació, com els colors, el tamany de la font, els tipus de botons… Per altra banda, tindrà l’opció d'escollir les temàtiques que més li agradin per a que l’aplicació configuri la vista de recomanacions en el home. 

Després d’aquest procés inicial, l’usuari ja podrà accedir a la plataforma a la pàgina inicial o home, on podrà fer “scroll” per veure els continguts recomanats i accedir a varies seccions. també tindrà un menú amb el que podrà navegar a la mateixa pàgina inicial, al buscador,  a la configuració d’usuari i si esta logejat(amb la sessió iniciada) tindrà activat el botó de llista de contactes. També tindrà activats 2 botons estàtics: un d'accés a contactes favorits i un altre d’agenda d’events. Per últim hi haurà un altre menu flotant per tenir una navegació alternativa, amb els mateixos accesos anteriorment mencionats

A partir d’aquí, l’usuari podrà navegar a diversos apartats:

- els apartats de audiovisuals, que oferiran diverses categories per cada tipus, són tres:

  1. Videojocs:  Secció per accedir a plataformes de videojocs.
  2. Música o Audio: Secció per accedir a plataformes de cançons, audiollibres, podcasts…
  3. Entreteniment: Secció per accedir a pel·lícules, series, miniseries... 

- els apartats de lectura, són dos:
  1. Llibres
  2. Notices

- L’apartat de contactes(només accessible amb inici de sessió), que permetrà afegir noves fonts de contactes per centralitzar els missatges en un sol lloc, com de Messenger, Instagram, Correu, Whatssap, Telegram…

- L’apartat de calendari(només accessible amb inici de sessió), que permetrà agendar a l’usuari videotrucades o apuntar tasques pendents

- Finalment, l’apartat de configuració del perfill d’usuari, que permet aplicar les configuracions d'accessibilitat, de disseny, de compte d’usuari,  de xarxes socials per a tenir fonts de contactes.




## 4. GUÍA D'ESTILS

### 4.1. Colors
Colors:
Fons: #FFFFFF (Blanco)
Botons: #E3E3E3 (Gris Clar)
El principal objectiu és desenvolupar un entorn positiu i còmode on els pacients se sentin agusto navegant i desenvolupant els seus interessos.
Tipografia:
Font Principal: Inter
Grandària de Font:
Text Normal: 20px
Encapçalats i Títols: Varia segons la importància (30px per a encapçalats de secció i 50px per a títols principals)
Pes de la Font:
Text Normal: Regular
Encapçalats: Semibold
Iconografia:
La nostra selecció d'icones es basa en la simplicitat i la claredat. Utilitzem icones simples i recognoscibles per a facilitar la comprensió de les funcions de l'aplicació.
Preferim icones de línies o sòlids per a mantenir la coherència visual en tota la interfície.
Ens assegurem que les icones siguin fàcilment identificables, la qual cosa permet als usuaris interactuar intuïtivament amb l'aplicació.
Formes:
El disseny de la nostra aplicació es basa en formes netes i geomètriques per a una aparença moderna i elegant.
Utilitzem vores arrodonides en les formes per a suavitzar l'aparença i crear una experiència visual més amigable.
Mantenim la consistència en la grandària i l'alineació de les formes per a garantir una aparença harmoniosa en tota la interfície.
Imagenes:
Seleccionem imatges d'alta qualitat que reflecteixen una sensació de calma, tranquil·litat i positivitat.
Les nostres imatges estan relacionades amb la naturalesa, el benestar i la salut, creant un entorn visualment agradable i reconfortant per als usuaris de l'aplicació.




## 5. PLANOLS
### 5.1. Wireframe de baixa fidelidad
* benvinguda

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/benvinguda.jpg)

* login

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/login.jpg)

* register

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/register.jpg)

* configuració inicial

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/conf_inicial.jpg)

* vista home unloged
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/vista_incial_unloged.jpg)

* vista home logged
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/vista_inicial_loged.jpg)

* calendari
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/calendari.jpg)

* llista contactes
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/contactos.jpg)

* llista grups
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/grupos.jpg)

* perfill contacte
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/perfill_contacto.jpg)

* configuració perfill
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/conf_perfil.jpg)

* llista chats
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/chats.jpg)

* trucada
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/trucada.jpg)

* chat personal
  
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/wireframe/chat.jpg)





### 5.2. Diagrama de base de dades
* primera part: (pendent)

* segona part:
![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/diagrama_base_dades.png)



### 5.3. Mockup
* benvinguda

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/bienvenida.png)

* login

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/login.png)

* register

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/register.png)

* confifuracion inicial

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/conf_inicial.png)

* inici sense login

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/inicio.png)

* inici amb login

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/inicio_login.png)

* menu lateral

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/menu_lateral.png)

* calendari

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/calendario.png)

* perfill

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/perfil_1.png)

* configuracio de perfill

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/perfil_2.png)

* llista de contactes

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/lista_contactos.png)

* seccio de musica

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/musica.png)

* secció d'entreteniment

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/entretenimiento.png)

* secciò videojocs

![alt text](https://github.com/dam-JoseSalinas/M13_Projecte2/blob/main/design_images/mockup/juegos.png)

### 5.4. Diagrama de casos d'ús
(pendent de modificar)

## 6. FUNCIONALITATS I PROBLEMES

## 7. CONCLUSIONS
