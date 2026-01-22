package org.example.client;

import org.example.shared.Recipe;
import org.example.shared.Ingredient;
import org.example.shared.Unit;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Scanner;


public class HiFreshGUI {


    public static void main(String[] args) throws Exception {
        new HiFreshGUI().runProgram();

    }

}



