package main;

import javafx.animation.PauseTransition;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundImage;
import javafx.scene.layout.BackgroundSize;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.util.Objects;
import java.util.Random;

public class FortuneAppFX extends Application {
    private Button[] chests;
    private Label resultLabel;
    private Random random;
    private final String[] prizes = {"100$", "200$", "300$", "500$", "1000$", "2000$", "Ничего"};
    private String[] prizeResults; // Массив для хранения результатов призов
    private Button restartButton; // Кнопка перезапуска

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Сундуки Фортуны");

        // Инициализация компонентов
        resultLabel = new Label("Выберите сундук");
        resultLabel.setStyle("-fx-font-size: 18px; -fx-font-weight: bold;");
        random = new Random();
        chests = new Button[3];
        prizeResults = new String[chests.length]; // Инициализация массива результатов

        // Генерация случайных призов для каждого сундука
        generatePrizes();

        HBox chestPanel = new HBox(20); // 20 - расстояние между кнопками

        // Создание сундуков
        for (int i = 0; i < chests.length; i++) {
            String imagePath = Objects.requireNonNull(getClass().getResource("chest.png")).toExternalForm(); // Путь к изображению
            Image chestImage = new Image(imagePath);
            ImageView imageView = new ImageView(chestImage);
            imageView.setFitHeight(150);
            imageView.setFitWidth(150);

            chests[i] = new Button();
            chests[i].setGraphic(imageView); // Установка изображения сундука на кнопку
            int index = i;
            chests[i].setOnAction(e -> openChest(index));
            chestPanel.getChildren().add(chests[i]);
        }

        restartButton = new Button("Перезапустить игру");
        restartButton.setOnAction(e -> restartGame());

        VBox root = new VBox(30, resultLabel, chestPanel, restartButton);
        root.setStyle("-fx-padding: 20px;");

        // Установка фона
        String backgroundImagePath = Objects.requireNonNull(getClass().getResource("gold_background.jpg")).toExternalForm();
        Image backgroundImage = new Image(backgroundImagePath);
        BackgroundImage myBI = new BackgroundImage(backgroundImage, null, null, null, new BackgroundSize(BackgroundSize.AUTO, BackgroundSize.AUTO, false, false, false, true));
        root.setBackground(new Background(myBI));

        Scene scene = new Scene(root, 600, 400);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void generatePrizes() {
        for (int i = 0; i < chests.length; i++) {
            prizeResults[i] = prizes[random.nextInt(prizes.length)];
        }
    }

    private void openChest(int chestIndex) {
        // Показать результат выбранного сундука
        String selectedPrize = prizeResults[chestIndex];
        resultLabel.setText("Сундук " + (chestIndex + 1) + ": Вы выиграли " + selectedPrize);

        // Деактивация кнопок
        for (Button chest : chests) {
            chest.setDisable(true);
        }

        // Показать результаты через 3 секунды
        PauseTransition pause = new PauseTransition(Duration.seconds(3));
        pause.setOnFinished(e -> showOtherPrizes(chestIndex));
        pause.play();
    }

    private void showOtherPrizes(int chestIndex) {
        StringBuilder otherPrizes = new StringBuilder("Призы в других сундуках:\n");
        for (int i = 0; i < prizeResults.length; i++) {
            if (i != chestIndex) {
                otherPrizes.append("Сундук ").append(i + 1).append(": ").append(prizeResults[i]).append("\n");
            }
        }
        resultLabel.setText(resultLabel.getText() + "\n" + otherPrizes.toString());

        // Восстановление кнопок
        for (Button chest : chests) {
            chest.setDisable(false);
        }
    }

    private void restartGame() {
        resultLabel.setText("Выберите сундук");
        generatePrizes(); // Сброс призов
        for (Button chest : chests) {
            chest.setDisable(false); // Активируем кнопки
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}
