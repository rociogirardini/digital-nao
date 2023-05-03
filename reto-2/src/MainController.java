import com.google.gson.Gson;
import com.google.gson.JsonArray;
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

    public MainController(MainView view) {
        this.view = view;
    }

    public void searchAuthor(String apiKey, String authorId) throws IOException, SQLException {
        // URL Connection
        APIconnection GSA_API = new APIconnection();
        GSA_API.getAPIconnection(apiKey, authorId);

        ArrayList<Author>authors = GSA_API.getAuthors();
        JsonArray results = GSA_API.getResults();

        // Guarda la data en la DB
        DAO db = new DAO();
        db.insertArticle(authorId,results);

        Author author = Author.fromJson(authorId);
        authors.add(author);
        view.printResults(authors);

        // Muestra los resultados de la DB por consola
        String query = "SELECT * FROM autor_resultado WHERE id_autor = ?";
        PreparedStatement statement = db.statement(db.getConnection(), query);
        statement.setString(1, authorId);
        ResultSet resultSet = statement.executeQuery();
        view.printArticles(resultSet);

    }
}