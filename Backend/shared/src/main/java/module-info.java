module org.example.shared {

    exports org.example.shared;

    opens org.example.shared to com.fasterxml.jackson.databind;

    requires jakarta.persistence;
}
