import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.*;
import java.util.ArrayList;

public class MainController {
    private MainView view;

    private final String DB_URL = "jdbc:mysql://localhost:3306/digitalnao";
    private final String DB_USER = "root";
    private final String DB_PASSWORD = "digitalnao";

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }

    public MainController(MainView view) {
        this.view = view;
    }

    public void searchAuthor(String apiKey, String authorId) throws IOException {
        // URL Connection
        URL url = new URL("https://serpapi.com/search.json?engine=google_scholar_author&author_id="+authorId+"&hl=es&api_key="+apiKey);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        StringBuilder response = new StringBuilder();
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        Gson gson = new Gson();
        JsonObject json = gson.fromJson(response.toString(), JsonObject.class);


         ArrayList<Author> authors = new ArrayList<>();
         JsonArray results = json.getAsJsonArray("articles");

        // Guarda el ID del autor y los resultados de la búsqueda en la base de datos
        try (Connection connection = getConnection()) {
            PreparedStatement statement = connection.prepareStatement("INSERT INTO autor_resultado (id_autor, articulo, link) VALUES (?, ?, ?)");
            int limit_results = 0;
            for (JsonElement article : results) {
                if (limit_results < 10){
                    String title = article.getAsJsonObject().get("title").getAsString();;
                    String link = article.getAsJsonObject().get("link").getAsString();;
                    statement.setString(1, authorId);
                    statement.setString(2, title);
                    statement.setString(3, link);
                    statement.executeUpdate();
                    limit_results++;
                }
            }

            Author author = Author.fromJson(authorId);
            authors.add(author);
            view.printResults(authors);

            // Muestra los resultados de la DB por consola

            ResultSet resultSet = statement.executeQuery("select * from digitalnao.autor_resultado");
            view.printArticles(resultSet);

        } catch (SQLException e) {
            e.printStackTrace();
            view.printError();
            return;
        }

    }
}