package org.example.shared;


import jakarta.persistence.*;

@Entity
public class Ingredient{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    public Ingredient() {}

    public Ingredient(String name){
        this.name = name;

    }
    //Getters
    public String getName(){
        return name;
    }
    //Setters
    public void setName(String name){
        this.name = name;
    }

    public String toString(){
        return name;
    }

}
