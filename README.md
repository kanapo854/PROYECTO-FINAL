# PROYECTO-FINAL
Backend API KanapoTask

TAREAS

    Obtener Tarea por ID
    
        Endpoint: /tareas/:id
        Método: GET
        Descripción: Este endpoint permite obtener una tarea específica a partir de su ID. También incluye la información del usuario asociado a la tarea.
      
        Parámetros de la URL:
        
        id (number) → ID de la tarea que se desea obtener.
        
        Respuesta exitosa (200 - OK): Devuelve un objeto JSON con los detalles de la tarea encontrada.
        
        Parámetros de la URL:
        
        - id (number) → ID de la tarea que se desea obtener.
    
    Crear una Nueva Tarea
      
        Endpoint: /tareas
        Método: POST
        Descripción: Este endpoint permite la creación de una nueva tarea asociada a un usuario específico.
        
        Parámetros del cuerpo:
        
          - titulo (string) → Título de la tarea (obligatorio).
          
          - descripcion (string) → Descripción detallada de la tarea.
          
          - estado (string) → Estado de la tarea (por ejemplo, "pendiente", "en progreso", "completado").
          
          - IDUsuario (number) → ID del usuario al que se asigna la tarea (obligatorio).
          
          - fecha (string) → Fecha de la tarea en formato YYYY-MM-DD.
    
    Actualizar una Tarea
    
        Endpoint: /tareas/:id
        Método: PUT
        Descripción: Este endpoint permite actualizar una tarea existente mediante su ID. Si se intenta cambiar el usuario asociado (IDUsuario), se verifica que el nuevo usuario exista en la base de datos.
      
        Parámetros de la URL:
        
        id (number) → ID de la tarea que se desea actualizar (obligatorio).
      
        Parámetros del cuerpo:
        
          titulo (string) → Nuevo título de la tarea.
          
          descripcion (string) → Nueva descripción de la tarea.
          
          estado (string) → Nuevo estado de la tarea (por ejemplo, "pendiente", "en progreso", "completado").
          
          IDUsuario (number) → Nuevo ID del usuario asignado a la tarea (opcional, pero si se envía, debe existir en la base de datos).
    Eliminar una Tarea (Cambio de Estado)
    
        Endpoint: /tareas/:id
        Método: DELETE
        Descripción: Este endpoint no elimina físicamente una tarea de la base de datos, sino que actualiza su estado a "B" para indicar que ha sido eliminada de forma lógica.
      
        Parámetros de la URL:
        
          id (number) → ID de la tarea que se desea marcar como eliminada (obligatorio).
USUARIOS

    Crear un Nuevo Usuario

    Endpoint: /usuarios
    Método: POST
    Descripción: Este endpoint permite la creación de un nuevo usuario. La contraseña ingresada será encriptada antes de guardarse en la base de datos para mayor seguridad.
    
    Parámetros del cuerpo:
    
    nombre (string) → Nombre del usuario (obligatorio).
    
    apellido (string) → Apellido del usuario (obligatorio).
    
    email (string) → Correo electrónico único del usuario (obligatorio).
    
    contrasena (string) → Contraseña del usuario (se almacenará encriptada).
    Actualizar la Contraseña de un Usuario
    
        Endpoint: /usuarios/actualizar
        Método: PUT
        Descripción: Este endpoint permite actualizar la contraseña de un usuario existente utilizando su correo electrónico. La nueva contraseña será encriptada antes de almacenarse.
        
        Parámetros del cuerpo:
        
        email (string) → Correo electrónico del usuario que se desea actualizar (obligatorio).
        
        contrasena (string) → Nueva contraseña del usuario (obligatorio).
LOGIN

    Iniciar Sesión
    
        Endpoint: /usuarios/iniciar-sesion
        Método: POST
        Descripción: Este endpoint permite a un usuario iniciar sesión utilizando su correo electrónico y contraseña. Si las credenciales son correctas, se generará un token JWT para el acceso a recursos protegidos.
    
        Parámetros del cuerpo:
    
        email (string) → Correo electrónico del usuario (obligatorio).
        
        contrasena (string) → Contraseña del usuario (obligatorio).
