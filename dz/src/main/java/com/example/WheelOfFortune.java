package com.example;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.control.Button;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;

public class WheelOfFortune extends Application {
    private static final int WIDTH = 500;
    private static final int HEIGHT = 500;
    private static final int NUM_SECTIONS = 6;
    private static final String[] SECTIONS = {"Выигрыш 1", "Выигрыш 2", "Выигрыш 3", "Выигрыш 4", "Выигрыш 5", "Выигрыш 6"};
    private static final Color[] COLORS = {Color.ORANGE, Color.GREEN, Color.BLUE, Color.PINK, Color.PURPLE, Color.CYAN};
    private double angle = 0;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Колесо Фортуны");

        Canvas canvas = new Canvas(WIDTH, HEIGHT);
        GraphicsContext gc = canvas.getGraphicsContext2D();
        drawWheel(gc);

        Button spinButton = new Button("Крутить колесо");
        spinButton.setOnAction(event -> spinWheel(gc));

        VBox root = new VBox();
        root.getChildren().addAll(canvas, spinButton);

        Scene scene = new Scene(root, WIDTH, HEIGHT + 50);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void drawWheel(GraphicsContext gc) {
        double radius = WIDTH / 2.0; // Радиус колеса
        double arcAngle = 360.0 / NUM_SECTIONS; // Угол сектора в градусах

        gc.clearRect(0, 0, WIDTH, HEIGHT); // Очистка области

        gc.translate(radius, radius); // Перемещение центра колеса в середину
        gc.rotate(angle); // Поворот колеса на заданный угол

        for (int i = 0; i < NUM_SECTIONS; i++) {
            double startAngle = arcAngle * i; // Начальный угол сектора
            double endAngle = arcAngle; // Угол протяженности сектора

            gc.setFill(COLORS[i]); // Установка цвета для сектора
            gc.beginPath();
            gc.moveTo(0, 0); // Перемещение к центру
            gc.arc(0, 0, radius, startAngle, endAngle); // Рисуем дугу с центром в (0, 0)
            gc.lineTo(0, 0); // Соединяем с центром
            gc.closePath();
            gc.fill(); // Заполняем сектор цветом

            gc.save(); // Сохранение состояния
            gc.rotate(startAngle + arcAngle / 2); // Поворот для центрирования текста
            gc.setFill(Color.WHITE); // Установка цвета текста
            gc.setFont(new Font(16)); // Установка шрифта
            gc.fillText(SECTIONS[i], radius / 2 - 10, 0); // Рисуем текст в центре сектора
            gc.restore(); // Восстановление состояния
        }

        gc.rotate(-angle); // Возвращение к исходному состоянию
        gc.translate(-radius, -radius); // Возвращение к исходным координатам
    }

    private void spinWheel(GraphicsContext gc) {
        double rotation = 360 * 5 + (Math.random() * 360); // 5 полных оборотов + случайный угол
        long duration = 3000; // 3 секунды

        gc.getCanvas().getScene().getWindow().setOnCloseRequest(e -> System.exit(0));

        new Thread(() -> {
            long startTime = System.currentTimeMillis();
            double startAngle = angle;
            while (System.currentTimeMillis() - startTime < duration) {
                angle = startAngle + (rotation * (System.currentTimeMillis() - startTime)) / duration;
                drawWheel(gc);
                try {
                    Thread.sleep(16); // 60 FPS
                } catch (InterruptedException ex) {
                    Thread.currentThread().interrupt();
                }
            }
            angle = startAngle + rotation;
            drawWheel(gc);
            int index = (int) Math.floor(((angle % 360) / 360) * NUM_SECTIONS);
            System.out.println("Вы выиграли: " + SECTIONS[NUM_SECTIONS - index - 1]);
        }).start();
    }
}
