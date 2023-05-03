public class Author {
    private String id;
    private String title;
    private String link;

    public Author(String id) {
        this.id = id;
        this.title = title;
        this.link = link;
    }

    public String getId() {
        return id;
    }
    public String getTitle() {return title; }
    public String getLink() {return link; }

    // Método estático que devuelve una instancia de Author
    public static Author fromJson(String id) {

        if (id == null) {
            throw new IllegalArgumentException("No es un ID válido.");
        }
        return new Author(id);
    }
}