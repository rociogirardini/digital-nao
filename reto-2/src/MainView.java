import java.util.ArrayList;

public class MainView {

    public String getAuthorId() {
        String authorId_1 = "ZYBkcvEAAAAJ ";
        String authorId_2 = "LSsXyncAAAAJ ";
        String authorId_3 = "sFXFV0sAAAAJ ";
        System.out.println("Ingrese el ID del autor a buscar");
        System.out.println("Aquí hay algunos ejemplos de autores de la Universidad del Norte de México: " + authorId_1 + authorId_2 + authorId_3);
        return Utils.input("ID: ");
    }

    public void printResults(ArrayList<Author> authors) {
        System.out.println();
        System.out.println("Autor buscado:");
        System.out.println("------------------------");
        for (Author author : authors) {
            System.out.println("ID: " + author.getId());
        }
    }

    public void printError() {
        System.out.println("Hubo un error!");
    }
}