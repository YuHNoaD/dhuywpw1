package murach.data;

import murach.business.User;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class UserDB {

    private static final String FILE_PATH = "data/email_list.txt";

    public static synchronized long insert(User user) {
        File file = new File(FILE_PATH);
        if (file.getParentFile() != null && !file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }

        try (PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(file, true)))) {
            out.println(user.getFirstName() + "," + user.getLastName() + "," + user.getEmail() + "," +
                        user.getDob() + "," + user.getHearAbout() + "," + user.getAnnouncements() + "," + user.getContactBy());
            System.out.println("User survey written to file " + FILE_PATH + ": " + user.getEmail());
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

        try (BufferedReader in = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = in.readLine()) != null) {
                String[] tokens = line.split(",");
                if (tokens.length >= 3) {
                    String fn = tokens[0].trim();
                    String ln = tokens[1].trim();
                    String em = tokens[2].trim();
                    String dob = tokens.length > 3 ? tokens[3].trim() : "";
                    String ha = tokens.length > 4 ? tokens[4].trim() : "";
                    String ann = tokens.length > 5 ? tokens[5].trim() : "";
                    String cb = tokens.length > 6 ? tokens[6].trim() : "";
                    User user = new User(fn, ln, em, dob, ha, ann, cb);
                    users.add(user);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return users;
    }
}
