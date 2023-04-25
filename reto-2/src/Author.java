public class Author {
    private String id;

    public Author(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
    // Método estático que devuelve una instancia de Author
    public static Author fromJson(String id) {

        if (id == null) {
            throw new IllegalArgumentException("No es un ID válido.");
        }
        return new Author(id);
    }
}