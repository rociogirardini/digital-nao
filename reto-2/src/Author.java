public class Author {
    private String id;
    private String name;

    public Author(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }
    public String getName() {return name; }

    // Método estático que devuelve una instancia de Author
    public static Author fromJson(String id, String name) {

        if (id == null) {
            throw new IllegalArgumentException("No es un ID válido.");
        }
        return new Author(id, name);
    }
}
