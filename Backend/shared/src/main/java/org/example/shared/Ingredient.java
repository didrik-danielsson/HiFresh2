package org.example.shared;


import jakarta.persistence.*;

@Entity
public class Ingredient{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String name;

    public Ingredient() {}

    public Ingredient(String name){
        this.name = standardName(name);

    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String toString(){
        return name;
    }

    private String standardName(String name) {

        String firstLetter = name.substring(0, 1).toUpperCase();
        String nameCapitalized = firstLetter + name.substring(1);

        return nameCapitalized;
    }

    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id = id;
    }

}
