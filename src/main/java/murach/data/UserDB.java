package murach.data;

import murach.business.User;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class UserDB {

    private static final String FILE_PATH = "data/email_list.txt";

    public static synchronized long insert(User user) {
        File file = new File(FILE_PATH);
        if (file.getParentFile() != null && !file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }

        try (PrintWriter out = new PrintWriter(new OutputStreamWriter(new FileOutputStream(file, true), StandardCharsets.UTF_8))) {
            out.println(user.getFirstName() + "," + user.getLastName() + "," + user.getEmail());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return selectAll().size();
    }

    public static synchronized List<User> selectAll() {
        List<User> users = new ArrayList<>();
        File file = new File(FILE_PATH);

        if (!file.exists()) {
            return users;
        }

        try (BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8))) {
            String line;
            while ((line = in.readLine()) != null) {
                String[] tokens = line.split(",");
                if (tokens.length >= 3) {
                    User user = new User(tokens[0].trim(), tokens[1].trim(), tokens[2].trim());
                    users.add(user);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return users;
    }
}
