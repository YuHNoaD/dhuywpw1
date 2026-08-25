package murach.business;

import java.io.Serializable;

public class User implements Serializable {
    private String firstName;
    private String lastName;
    private String email;
    private String dob;
    private String hearAbout;
    private String announcements;
    private String contactBy;

    public User() {
        firstName = "";
        lastName = "";
        email = "";
        dob = "";
        hearAbout = "";
        announcements = "";
        contactBy = "";
    }

    public User(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = "";
        this.hearAbout = "";
        this.announcements = "";
        this.contactBy = "";
    }

    public User(String firstName, String lastName, String email, String dob, String hearAbout, String announcements, String contactBy) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = dob;
        this.hearAbout = hearAbout;
        this.announcements = announcements;
        this.contactBy = contactBy;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getHearAbout() {
        return hearAbout;
    }

    public void setHearAbout(String hearAbout) {
        this.hearAbout = hearAbout;
    }

    public String getAnnouncements() {
        return announcements;
    }

    public void setAnnouncements(String announcements) {
        this.announcements = announcements;
    }

    public String getContactBy() {
        return contactBy;
    }

    public void setContactBy(String contactBy) {
        this.contactBy = contactBy;
    }
}
