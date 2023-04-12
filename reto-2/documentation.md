## Documentación de la API de Scopus

La API de Scopus permite tener acceso a la base de datos de Scopus, una base de datos bibliográfica y científica. Cubre diferentes áreas, como estudios de la salud, sociales, etc., y por ello es muy útil para el propósito del proyecto del dream team. Además, brinda información sobre los autores, y ofrece diversas opciones de personalización y configuración, lo que permite obtener resultados más detallados a la hora de realizar la búsqueda.

A nivel general, esta API tiene un [límite de entre 5.000 y 50.000 solicitudes](https://dev.elsevier.com/api_key_settings.html) a la semana  (las solicitudes hechas por cada API_KEY se renuevan cada 7 días), dependiendo del tipo de request que se haga. Con un único request de tipo GET (utilizando como baseURL “https://api.elsevier.com/content/search/scopus”) es posible obtener diversos resultados. Sin embargo, esto no es suficiente, pues el request necesita ciertos headers y ciertos query params que detallo a continuación:

### Headers

1. **`X-ELS-APIKey`**: Hace referencia a la API_KEY.
2. **`Accept`**: Especifica el tipo de contenido que se recibirá, por ejemplo, para especificar una respuesta en formato JSON (que es el valor por defecto).

En la [documentación oficial](https://dev.elsevier.com/documentation/ScopusSearchAPI.wadl) podemos ver que pueden agregarse más headers, pero los requeridos son los especificados anteriormente. 

### Query Params

1. **`Query`**: Es el valor booleano para realizar la búsqueda en cuestión.

De manera requerida solo se encuentra ese query, pero la API admite muchos más, tales como **`field`** (por ejemplo, `*field=title*` buscará solo por título), **`count`** (para especificar un máximo de respuestas) y **`sort`** (para ordenar los resultados por, por ejemplo, fecha de publicación o relevancia), entre otros.