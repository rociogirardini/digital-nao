public class Main {
    public static void main(String[] args) {
        String apiKey = "33c966096e140119be67d83b020054f11b1782b540f5d51c7e331efee559fc2a";

        MainView view = new MainView();
        MainController controller = new MainController(view);

        String authorId = view.getAuthorId();
        controller.searchAuthor(apiKey, authorId);
    }
}
