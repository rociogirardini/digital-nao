import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

public class apiConnection {

    private ArrayList<Author> authors;
    private JsonArray results;

    public ArrayList<Author> getAuthors() {
        return authors;
    }
    public JsonArray getResults() {
        return results;
    }

    public void getAPIconnection (String apiKey, String authorId) throws IOException {
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
        JsonObject authorObj = json.getAsJsonObject("author");
        String authorName = authorObj.get("name").getAsString();
        this.authors = authors;
        this.results = results;
        Author author = Author.fromJson(authorId, authorName);
        authors.add(author);

    }
}
