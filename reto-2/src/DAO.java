import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DAO {
    private final String DB_URL = "jdbc:mysql://localhost:3306/digitalnao";
    private final String DB_USER = "root";
    private final String DB_PASSWORD = "digitalnao";

    Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
    }
    
    public PreparedStatement statement(Connection connection, String query) throws SQLException {
        PreparedStatement statement = connection.prepareStatement(query);
        return statement;
    }

    public void insertArticle(String authorId, JsonArray results) throws SQLException {
        try (Connection connection = getConnection()) {
            String query = "INSERT INTO autor_resultado (id_autor, articulo, link) VALUES (?, ?, ?)";
            PreparedStatement statement = statement(connection, query);
            int limit_results = 0;
            for (JsonElement article : results) {
                if (limit_results < 10){
                    String art_title = article.getAsJsonObject().get("title").getAsString();
                    String art_link = article.getAsJsonObject().get("link").getAsString();
                    statement.setString(1, authorId);
                    statement.setString(2, art_title);
                    statement.setString(3, art_link);
                    statement.executeUpdate();
                    limit_results++;
                }
            }
        }
    }
}
