import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import serpapi.GoogleSearch;
import serpapi.SerpApiSearchException;
import java.util.HashMap;
import java.util.Map;

public class MainController {
    private MainView view;

    public MainController(MainView view) {
        this.view = view;
    }

    public void searchAuthor(String apiKey, String authorId) {
        Map<String, String> parameter = new HashMap<>();
        parameter.put("engine", "google_scholar_author");
        parameter.put("q", authorId);
        parameter.put("author_id", authorId);
        parameter.put("hl", "es-419");
        parameter.put("num", "10");
        parameter.put("api_key", apiKey);

        GoogleSearch search = new GoogleSearch(parameter);

        try {
            JsonObject results = search.getJson();
            JsonArray searchResults = results.getAsJsonArray("organic_results");
            MainView view = new MainView();
            view.printResults();
            for (JsonElement result : searchResults) {
                JsonObject resultObj = result.getAsJsonObject();

                String title = resultObj.get("title").getAsString();
                String link = resultObj.get("link").getAsString();
                String description = resultObj.get("snippet").getAsString();

                System.out.println("Título: " + title);
                System.out.println("Enlace: " + link);
                System.out.println("Descripción: " + description);
                System.out.println();
                System.out.println("------------------------");
                System.out.println();
            }

        } catch (SerpApiSearchException e) {
            view.printError();
        }
    }
}
