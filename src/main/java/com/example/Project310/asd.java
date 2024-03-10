package com.example.Project310;

import org.json.JSONArray;
import org.json.JSONObject;
import java.util.Random;

public class asd {

    private static final String[] titles = {"The Great Gatsby", "To Kill a Mockingbird", "1984", "Pride and Prejudice", "The Catcher in the Rye", "Harry Potter and the Sorcerer's Stone", "The Hobbit", "The Lord of the Rings", "Moby-Dick", "Alice's Adventures in Wonderland"};
    private static final String[] genres = {"Adventure", "Mystery", "Fantasy", "Science Fiction", "Romance", "Horror", "Thriller", "Historical Fiction", "Biography", "Self-Help"};
    private static final Random random = new Random();

    public static void main(String[] args) {
        JSONArray books = generateRandomBooks(10); // Generate 10 random books
        System.out.println(books.toString(2)); // Print the JSON array with indentation
    }

    public static JSONArray generateRandomBooks(int numBooks) {
        JSONArray bookArray = new JSONArray();
        for (int i = 0; i < numBooks; i++) {
            JSONObject book = new JSONObject();
            book.put("title", getRandomTitle());
            book.put("totalPages", getRandomNumberInRange(100, 500));
            book.put("rating", getRandomNumberInRange(30, 50) / 10.0); // Random rating between 3.0 and 5.0
            book.put("publishesDate", getRandomPublishesDate());
            book.put("ISBNNumber", generateRandomISBNNumber());
            bookArray.put(book);
        }
        return bookArray;
    }

    private static String getRandomTitle() {
        return titles[random.nextInt(titles.length)];
    }

    private static int getRandomNumberInRange(int min, int max) {
        return random.nextInt(max - min + 1) + min;
    }

    private static String getRandomPublishesDate() {
        int year = getRandomNumberInRange(1900, 2022); // Random year between 1900 and 2022
        int month = getRandomNumberInRange(1, 12); // Random month between 1 and 12
        int day = getRandomNumberInRange(1, 28); // Random day between 1 and 28 (assuming all months have up to 28 days)
        return String.format("%04d-%02d-%02d", year, month, day);
    }

    private static String generateRandomISBNNumber() {
        StringBuilder isbn = new StringBuilder();
        for (int i = 0; i < 13; i++) {
            isbn.append(random.nextInt(10));
        }
        return isbn.toString();
    }
}
