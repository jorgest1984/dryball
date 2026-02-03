# Lista Completa de Imágenes Necesarias para Dark Realm

## 📋 RESUMEN RÁPIDO
- **Total estimado:** 51-55 imágenes pixel art
- **Formato sugerido:** PNG con transparencia
- **Estilo:** Pixel art de fantasía oscura
- **Paleta:** Tonos oscuros, rojos, morados, grises
- **Ubicación:** `/public/assets/` (carpetas locales en tu proyecto)

---

## 📂 ESTRUCTURA DE CARPETAS

Todas las imágenes deben estar en:

```
/public/assets/
  ├─ ui/            (4 archivos: logo, estados)
  ├─ exploration/   (11 archivos: fondo, botones, pistas)
  ├─ combat/        (3 archivos: botones de combate)
  ├─ enemies/       (4 archivos: sprites de enemigos)
  ├─ inventory/     (3+ archivos: objetos)
  └─ events/        (30 archivos: eventos de decisión)
```

**⚠️ IMPORTANTE:** Las imágenes deben estar en `/public/assets/`, NO en `/src/assets/`

---

## 0. PANTALLA INICIAL (StartScreen.tsx)

### Logo del Título - 1 imagen
0. **[LOGO TÍTULO]** - `title-logo.png` (800x200px horizontal)
   - Logo del juego "DRYB4LL" en pixel art
   - Estilo: Fantasía oscura, texto impactante
   - Tiene animación de pulso (animate-pulse)
   - **Ubicación:** `/public/assets/ui/title-logo.png`

---

## 1. PANTALLA DE EXPLORACIÓN (HallwayScreen.tsx + App.tsx)

### Fondo del Pasillo - 1 imagen
1. **[FONDO PASILLO]** - `hallway-background.png` (1200x800px, ratio 3:2)
   - Vista de pasillo oscuro de mazmorra en perspectiva
   - Estilo pixel art con atmósfera tenebrosa
   - **Ubicación:** `/public/assets/exploration/hallway-background.png`

### Botones de Navegación - 3 imágenes
2. **[BOTÓN IZQUIERDA]** - `button-left.png` (400x300px)
   - Botón con flecha o indicador hacia la izquierda
   - Se usa para elegir el camino izquierdo
   - **Ubicación:** `/public/assets/exploration/button-left.png`

3. **[BOTÓN INVENTARIO]** - `button-inventory.png` (400x300px)
   - Botón con ícono de mochila o cofre
   - Se usa para abrir el inventario
   - **Ubicación:** `/public/assets/exploration/button-inventory.png`

4. **[BOTÓN DERECHA]** - `button-right.png` (400x300px)
   - Botón con flecha o indicador hacia la derecha
   - Se usa para elegir el camino derecho
   - **Ubicación:** `/public/assets/exploration/button-right.png`

### Pistas Visuales (Hints) - 5 imágenes
5. **[PISTA AMBIENTAL]** - `hint-ambiental.png` (128x128px)
   - Representa eventos ambientales (cristales, pozos, campanas)
   - **Ubicación:** `/public/assets/exploration/hint-ambiental.png`

6. **[PISTA COMBATE]** - `hint-combate.png` (128x128px)
   - Representa encuentros de combate
   - **Ubicación:** `/public/assets/exploration/hint-combate.png`

7. **[PISTA TIENDA]** - `hint-tienda.png` (128x128px)
   - Representa encuentros con el tendero misterioso
   - **Ubicación:** `/public/assets/exploration/hint-tienda.png`

8. **[PISTA OBJETO]** - `hint-objeto.png` (128x128px)
   - Representa eventos con objetos especiales
   - **Ubicación:** `/public/assets/exploration/hint-objeto.png`

9. **[PISTA MÍSTICO]** - `hint-mistico.png` (128x128px)
   - Representa eventos místicos y mágicos
   - **Ubicación:** `/public/assets/exploration/hint-mistico.png`

---

## 2. PANTALLA DE DECISIONES (DecisionScreen.tsx)

### Imagen Central del Evento - 30 imágenes diferentes (256x256px)
Cada evento de decisión necesita su propia imagen representativa:

**EVENTOS MÍSTICOS (IDs 1-10):**

1. **Altar Oscuro** - Altar con símbolo pentagram, energía oscura
   - Descripción: Un jugador descubre un altar maligno emanando energía extraña.
   - Texto del diálogo: "Encuentras un altar oscuro que emana una energía extraña. ¿Rezar ante él?"
   - Botones: "REZAR" | "IGNORAR"

2. **Espejo Distorsionado** - Espejo con reflejo fantasmal
   - Descripción: Un espejo maldito muestra un reflejo distorsionado del jugador.
   - Texto del diálogo: "Un espejo muestra tu reflejo distorsionado. ¿Mirarlo fijamente?"
   - Botones: "MIRAR" | "APARTAR LA VISTA"

3. **Pócima Burbujeante** - Frasco púrpura con burbujas
   - Descripción: Una pócima misteriosa de color púrpura con burbujas de origen desconocido.
   - Texto del diálogo: "Encuentras una pócima burbujeante de color púrpura. ¿Beberla?"
   - Botones: "BEBER" | "DESECHAR"

4. **Voces en la Oscuridad** - Oreja con ondas de sonido oscuras
   - Descripción: Voces susurrantes desde las sombras ofrecen poder prohibido.
   - Texto del diálogo: "Voces susurran desde la oscuridad, ofreciendo poder. ¿Escucharlas?"
   - Botones: "ESCUCHAR" | "TAPAR OÍDOS"

5. **Libro Antiguo** - Grimorio abierto con páginas brillantes
   - Descripción: Un grimorio arcano yace abierto con páginas que brillan tenuemente.
   - Texto del diálogo: "Un libro antiguo yace abierto. Sus páginas brillan tenuemente. ¿Leerlo?"
   - Botones: "LEER" | "CERRAR"

6. **Estatua Llorosa** - Estatua de piedra con lágrimas de sangre
   - Descripción: Una estatua maldita que llora lágrimas carmesí.
   - Texto del diálogo: "Una estatua llora lágrimas de sangre. ¿Tocarlas?"
   - Botones: "TOCAR" | "ALEJARSE"

7. **Cofre Encadenado** - Cofre con cadenas y candado
   - Descripción: Un cofre peligrosamente encadenado que contiene algo desconocido.
   - Texto del diálogo: "Un cofre cerrado con cadenas. Puedes sentir algo dentro. ¿Abrirlo?"
   - Botones: "ABRIR" | "DEJAR CERRADO"

8. **Vela Negra** - Vela con llama verde mística
   - Descripción: Una vela negra arde con una llama verde sobrenatural.
   - Texto del diálogo: "Una vela negra arde con llama verde. ¿Apagarla?"
   - Botones: "APAGAR" | "DEJAR ARDER"

9. **Cráneo Místico** - Cráneo con aura mágica
   - Descripción: Un cráneo con propiedades mágicas que observa al jugador.
   - Texto del diálogo: "Encuentras un cráneo que parece observarte. ¿Tomarlo?"
   - Botones: "TOMAR" | "DEJAR"

10. **Círculo de Runas** - Círculo mágico en el suelo
    - Descripción: Un círculo de runas antiguas grabado en el suelo de la mazmorra.
    - Texto del diálogo: "Un círculo de runas en el suelo. ¿Pararte en el centro?"
    - Botones: "PARARSE" | "RODEAR"

**EVENTOS DE OBJETOS (IDs 11-16):**

11. **Llave Antigua** - Llave dorada antigua ornamentada
    - Descripción: Una llave ornamentada y antigua que podría abrir algo importante.
    - Texto del diálogo: "Encuentras una llave antigua en el suelo. Parece importante."
    - Botones: "TOMAR LLAVE" | "DEJAR"

12. **Puerta Cerrada** - Puerta de madera con cerradura
    - Descripción: Una puerta bloqueada con cerradura oxidada que requiere una llave.
    - Texto del diálogo: "Una puerta cerrada bloquea tu camino. Tiene una cerradura oxidada." (CON llave) / "Una puerta cerrada bloquea tu camino. No tienes la llave." (SIN llave)
    - Botones: "USAR LLAVE" | "FORZAR PUERTA"

13. **Antorcha Sagrada** - Antorcha con aceite brillante
    - Descripción: Una antorcha apagada cubierta de aceite sagrado, útil contra la oscuridad.
    - Texto del diálogo: "Encuentras una antorcha apagada cubierta de aceite sagrado."
    - Botones: "TOMAR ANTORCHA" | "IGNORAR"

14. **Criatura de Sombras** - Silueta oscura amenazante
    - Descripción: Una entidad de sombras puras bloquea el pasillo del jugador.
    - Texto del diálogo: "Una criatura de sombras bloquea el pasillo. La luz podría ahuyentarla." (CON antorcha) / "Una criatura de sombras bloquea el pasillo. Desearías tener luz." (SIN antorcha)
    - Botones: "USAR ANTORCHA" | "ENFRENTAR"

15. **Amuleto Brillante** - Amuleto en pedestal con luz cálida
    - Descripción: Un amuleto protector en pedestal emitiendo una luz reconfortante.
    - Texto del diálogo: "Un amuleto brillante descansa en un pedestal. Emite una luz cálida."
    - Botones: "TOMAR AMULETO" | "NO TOCAR"

16. **Portal Demoníaco** - Vórtex de energía oscura
    - Descripción: Un portal al infierno se abre ante el jugador emanando energía corrupta.
    - Texto del diálogo: "Un portal demoníaco se abre ante ti. Energía oscura emana de él." (CON amuleto) / "Un portal demoníaco se abre. Sin protección, estás vulnerable." (SIN amuleto)
    - Botones: "USAR AMULETO" | "HUIR"

**EVENTOS AMBIENTALES (IDs 17-20):**

17. **Cristal de Energía** - Cristal flotante brillante
    - Descripción: Un cristal de energía mágica pura flotando misteriosamente en el aire.
    - Texto del diálogo: "Encuentras un cristal de energía pura flotando en el aire."
    - Botones: "ABSORBER" | "ALEJARSE"

18. **Pozo Oscuro** - Pozo con agua negra y reflejos
    - Descripción: Un pozo de agua oscura donde se reflejan memorias del pasado.
    - Texto del diálogo: "Un pozo de agua oscura. Puedes ver tu reflejo del pasado."
    - Botones: "BEBER" | "ESCUPIR EN ÉL"

19. **Campana Gigante** - Campana de bronce con inscripciones
    - Descripción: Una enorme campana colgante con inscripciones antiguas grabadas.
    - Texto del diálogo: "Una campana gigante cuelga del techo. Tiene inscripciones antiguas."
    - Botones: "TOCAR CAMPANA" | "SILENCIO"

20. **Gema con Alma** - Gema brillante con espíritu atrapado
    - Descripción: Un fragmento de alma atrapada dentro de una gema luminosa.
    - Texto del diálogo: "Encuentras un fragmento de alma atrapada en una gema."
    - Botones: "LIBERAR ALMA" | "TOMAR GEMA"

**EVENTOS DE TIENDA (IDs 21-25):**

21. **Tendero Misterioso 1** - Figura encapuchada con poción roja
    - Descripción: Un comerciante sombrío emerge ofreciendo una Poción Superior.
    - Texto del diálogo: "Un misterioso tendero encapuchado emerge de las sombras. Te ofrece una Poción Superior."
    - Botones: "ACEPTAR" | "RECHAZAR"

22. **Tendero Misterioso 2** - Figura encapuchada con elixir azul
    - Descripción: Un comerciante sombrío emerge ofreciendo un Elixir Arcano.
    - Texto del diálogo: "Un misterioso tendero encapuchado emerge de las sombras. Te ofrece un Elixir Arcano."
    - Botones: "ACEPTAR" | "RECHAZAR"

23. **Tendero Misterioso 3** - Figura encapuchada con frasco oscuro
    - Descripción: Un comerciante sombrío emerge ofreciendo una Poción de Sangre.
    - Texto del diálogo: "Un misterioso tendero encapuchado emerge de las sombras. Te ofrece una Poción de Sangre."
    - Botones: "ACEPTAR" | "RECHAZAR"

24. **Tendero Misterioso 4** - Figura encapuchada con vial etéreo
    - Descripción: Un comerciante sombrío emerge ofreciendo un Frasco Etéreo.
    - Texto del diálogo: "Un misterioso tendero encapuchado emerge de las sombras. Te ofrece un Frasco Etéreo."
    - Botones: "ACEPTAR" | "RECHAZAR"

25. **Tendero Misterioso 5** - Figura encapuchada con tónico prohibido
    - Descripción: Un comerciante sombrío emerge ofreciendo un Tónico Prohibido.
    - Texto del diálogo: "Un misterioso tendero encapuchado emerge de las sombras. Te ofrece un Tónico Prohibido."
    - Botones: "ACEPTAR" | "RECHAZAR"

**EVENTOS DE CONTINUAR (IDs 26-30):**

26. **Caminos Divididos** - Bifurcación del pasillo
    - Descripción: El pasillo se separa en dos caminos igualmente tenebrosos.
    - Texto del diálogo: "El pasillo se divide en dos caminos. Ambos parecen igualmente tenebrosos."
    - Botones: "IZQUIERDA" | "DERECHA"

27. **Encrucijada** - Intersección de pasillos
    - Descripción: Una encrucijada donde el aire se siente denso y pesado.
    - Texto del diálogo: "Llegas a una encrucijada. El aire se siente más pesado."
    - Botones: "AVANZAR" | "DESCANSAR"

28. **Corredor Interminable** - Pasillo largo con paredes
    - Descripción: Un corredor aparentemente sin fin sumido en la oscuridad.
    - Texto del diálogo: "El corredor parece interminable. Solo oscuridad adelante."
    - Botones: "SEGUIR" | "EXPLORAR PAREDES"

29. **Pasillo con Ecos** - Corredor con ondas de sonido
    - Descripción: Un largo pasillo donde resuenan ecos misteriosos y lejanos.
    - Texto del diálogo: "Un largo pasillo se extiende ante ti. Puedes escuchar ecos lejanos."
    - Botones: "CORRER" | "CAMINAR"

30. **Antorchas Parpadeantes** - Pasillo con antorchas débiles
    - Descripción: Un pasillo con antorchas en las paredes que parpadean débilmente.
    - Texto del diálogo: "El camino continúa. Las antorchas en las paredes parpadean débilmente."
    - Botones: "APRESURARSE" | "MANTENER RITMO"

---

## 3. PANTALLA DE COMBATE (CombatScreen.tsx)

### Botones de Acción - 3 imágenes (80x80px)

31. **[BOTÓN ATACAR]** - Icono de espada o puño
   - Color sugerido: rojo/gris
   - Representa ataque físico
   - Usado en el sistema de combate por turnos

32. **[BOTÓN OBJETO]** - Icono de mochila o poción
   - Color sugerido: verde/marrón
   - Representa usar objetos del inventario
   - Abre el panel de inventario durante combate

33. **[BOTÓN MAGIA]** - Icono de báculo, cristal o runas
   - Color sugerido: morado/azul
   - Representa hechizos mágicos
   - Permite lanzar ataques mágicos gastando maná

---

## 4. PANEL DE INVENTARIO (InventoryPanel.tsx)

### Objetos del Inventario - Variable (64x64px)
El sistema tiene 3 tipos de objetos, pero múltiples variantes:

**TIPO: POCIÓN (restaura HP)**

34. **Poción de Vida** - Frasco rojo pequeño (30 HP)
    - Restaura 30 puntos de vida
    - Objeto inicial del jugador

35. **Poción Superior** - Frasco rojo grande (60 HP)
    - Restaura 60 puntos de vida
    - Obtenible del Tendero Misterioso 1

36. **Poción de Sangre** - Frasco rojo oscuro (50 HP)
    - Restaura 50 puntos de vida
    - Obtenible del Tendero Misterioso 3

37. **Tónico Prohibido** - Frasco rojo con símbolos oscuros (70 HP)
    - Restaura 70 puntos de vida
    - Obtenible del Tendero Misterioso 5

**TIPO: MANÁ (restaura MP)**

38. **Poción de Maná** - Frasco azul pequeño (20 MP)
    - Restaura 20 puntos de maná
    - Objeto inicial del jugador

39. **Elixir Arcano** - Frasco azul brillante (50 MP)
    - Restaura 50 puntos de maná
    - Obtenible del Tendero Misterioso 2

40. **Frasco Etéreo** - Frasco azul translúcido (40 MP)
    - Restaura 40 puntos de maná
    - Obtenible del Tendero Misterioso 4

**TIPO: KEY (objetos especiales)**

41. **Llave Antigua** - Llave dorada ornamentada
    - Objeto especial para abrir la Puerta Cerrada
    - Obtenible del evento ID 11

42. **Llama Sagrada** - Antorcha con fuego sagrado brillante
    - Objeto especial para ahuyentar la Criatura de Sombras
    - Obtenible del evento ID 13 (Antorcha Sagrada)
    - **Ubicación:** `/public/assets/inventory/item-llama-sagrada.png`

43. **Amuleto Protector** - Amuleto con gema
    - Objeto especial para cerrar el Portal Demoníaco
    - Obtenible del evento ID 15

---

## 5. ADICIONALES OPCIONALES (No tienen placeholder actualmente)

### Enemigos (si quieres añadir sprites)
Estos no tienen placeholders ahora, pero podrías necesitarlos:

- **Esqueleto** - Enemigo estándar (40 HP)
- **Demonio Menor** - Enemigo estándar (60 HP)
- **Espectro** - Enemigo estándar (50 HP)
- **Lich** - Enemigo avanzado
- **Gólem** - Enemigo avanzado
- **Hombre Lobo** - Enemigo avanzado
- **Cultista** - Enemigo avanzado
- **Señor de las Tinieblas** - Boss Final (350 HP)

### Estados del Jugador
- **Iluminado** - Aura dorada (5% probabilidad al llegar a 100 locura)
- **Loco** - Aura roja caótica (95% probabilidad al llegar a 100 locura)
- **Normal** - Estado base del jugador

---

## 📐 ESPECIFICACIONES TÉCNICAS

### Tamaños Recomendados:
- **Eventos de Decisión:** 256x256px
- **Eventos Laterales:** 128x128px
- **Botones de Combate:** 80x80px
- **Objetos de Inventario:** 64x64px

### Formato:
- PNG con transparencia
- Pixel art con estilo consistente
- Paleta de colores oscura (negro, gris, rojo, morado, azul oscuro)

### Estilo Visual:
- Pixel art 16-bit o 32-bit
- Estilo de fantasía oscura (dark fantasy)
- Alto contraste para visibilidad
- Bordes definidos

---

## 🎨 PALETA DE COLORES SUGERIDA

### Colores Principales:
- **Fondo:** #1a1a1a, #2d2d2d
- **Rojos:** #7f1d1d, #991b1b, #dc2626
- **Morados:** #581c87, #7e22ce, #9333ea
- **Azules:** #1e3a8a, #1e40af, #3b82f6
- **Grises:** #374151, #4b5563, #6b7280
- **Dorados:** #92400e, #b45309, #d97706

### Colores de Acento:
- **Luz/Fuego:** #fb923c, #f97316
- **Magia:** #a855f7, #d946ef
- **Veneno:** #059669, #10b981
- **Sangre:** #7f1d1d, #450a0a

---

## 📝 NOTAS IMPORTANTES

1. **Consistencia:** Todas las imágenes deben mantener el mismo estilo pixel art
2. **Transparencia:** Usar PNG con fondo transparente para mejor integración
3. **Tamaño:** Respetar los tamaños sugeridos para cada tipo de imagen
4. **Contraste:** Asegurar buen contraste con fondos oscuros
5. **Legibilidad:** Los iconos deben ser reconocibles incluso en tamaños pequeños

---

## 🔄 PRIORIDAD DE CREACIÓN

### ALTA PRIORIDAD (Esenciales para gameplay):
1. Botones de combate (3 imágenes)
2. Objetos de inventario - versiones básicas (7 imágenes)
3. Eventos de decisión más comunes (10 imágenes)

### MEDIA PRIORIDAD:
4. Eventos laterales de exploración (2 imágenes)
5. Resto de eventos de decisión (20 imágenes)

### BAJA PRIORIDAD (Opcionales):
6. Sprites de enemigos
7. Efectos visuales adicionales
8. Fondos alternativos