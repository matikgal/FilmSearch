using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Net.Http;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using MovieSearchWPF.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MovieSearchWPF
{
    public partial class MainWindow : Window, INotifyPropertyChanged
    {
        private const string ApiKey = "e1e05e04950c91952d0c0cc0cad4a581";

        private ObservableCollection<MoviePoster> _moviePosters;
        public event PropertyChangedEventHandler PropertyChanged;
        public ObservableCollection<MoviePoster> MoviePosters
        {
            get { return _moviePosters; }
            set
            {
                _moviePosters = value;
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(MoviePosters)));
            }
        }

        public MainWindow()
        {
            InitializeComponent();
            DataContext = this;
            MoviePosters = new ObservableCollection<MoviePoster>();

            SearchBox.TextChanged += SearchBox_TextChanged;
            Movies.Click += MenuItem_Click;
            TV_Shows.Click += MenuItem_Click;
            Top_Rated_Movies.Click += MenuItem_Click;
            Top_Rated_TV_Shows.Click += MenuItem_Click;
            BackButton.Click += BackButton_Click;

            Movies.IsChecked = true;
            InitializePopularMoviesAsync();
        }

        private async void MenuItem_Click(object sender, RoutedEventArgs e)
        {
            currentPage = 1;

            string url = string.Empty;
            if (sender == Movies)
                url = $"https://api.themoviedb.org/3/discover/movie?api_key={ApiKey}&sort_by=popularity.desc";
            else if (sender == TV_Shows)
                url = $"https://api.themoviedb.org/3/discover/tv?api_key={ApiKey}&sort_by=popularity.desc";
            else if (sender == Top_Rated_Movies)
                url = $"https://api.themoviedb.org/3/movie/top_rated?api_key={ApiKey}&language=en-US&page=1";
            else if (sender == Top_Rated_TV_Shows)
                url = $"https://api.themoviedb.org/3/tv/top_rated?api_key={ApiKey}&language=en-US&page=1";

            if (!string.IsNullOrEmpty(url))
                await GetMoviesAsync(url);

            MovieDetailsBorder.Visibility = Visibility.Collapsed;
            BackButton.Visibility = Visibility.Collapsed;
        }


        //SearrchBar
        private async void SearchBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            string searchText = SearchBox.Text.Trim();
            if (string.IsNullOrWhiteSpace(searchText))
            {
                InitializePopularMoviesAsync();
                return;
            }

            string url = $"https://api.themoviedb.org/3/search/movie?api_key={ApiKey}&query={searchText}";
            await GetMoviesAsync(url);
        }


        //Pobieranie filmów
        private async Task GetMoviesAsync(string url)
        {
            using (var client = new HttpClient()) // Tworzymy klienta HTTP
            {
                HttpResponseMessage response = await client.GetAsync(url); // Wysyłamy zapytanie GET do API filmowego i oczekujemy na odpowiedź
                if (response.IsSuccessStatusCode) // Sprawdzamy, czy odpowiedź jest poprawna
                {
                    string json = await response.Content.ReadAsStringAsync(); // Odczytujemy odpowiedź jako ciąg JSON
                    JObject result = JsonConvert.DeserializeObject<JObject>(json); // Deserializujemy odpowiedź JSON do obiektu JObject
                    MoviePosters.Clear(); // Czyścimy listę plakatów filmowych
                    if (result.TryGetValue("results", out JToken results)) // Sprawdzamy, czy w odpowiedzi jest pole "results"
                    {
                        foreach (JToken movie in results.Take(20)) // Iterujemy przez pierwszych 20 filmów w wynikach
                        {
                            string posterPath = movie["poster_path"]?.ToString(); // Sprawdzamy, czy istnieje ścieżka do plakatu
                            if (!string.IsNullOrEmpty(posterPath)) // Jeśli ścieżka nie jest pusta
                            {
                                MoviePosters.Add(new MoviePoster // Tworzymy nowy obiekt MoviePoster i dodajemy go do listy
                                {
                                    PosterPath = $"https://image.tmdb.org/t/p/w500/{posterPath}",
                                    Title = movie["title"]?.ToString(),
                                    Description = movie["overview"]?.ToString(),
                                    Rating = (double)(movie["vote_average"] ?? 0.0)
                                });
                            }
                        }
                    }
                }
                else
                {
                    MessageBox.Show("Failed to retrieve movie data from the API.");
                }
            }
        }





        //Wyświelanie popularnych
        private async Task InitializePopularMoviesAsync()
        {
            await GetMoviesAsync($"https://api.themoviedb.org/3/discover/movie?api_key={ApiKey}&sort_by=popularity.desc");
        }


        //Informacje po kliknięciu
        private void MoviePoster_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            var border = sender as Border;
            var moviePoster = border?.Tag as MoviePoster;
            if (moviePoster != null)
            {
                MovieTitleTextBlock.Text = moviePoster.Title;
                MovieDescriptionTextBlock.Text = $"{moviePoster.Description}";
                MovieRatingTextBlock.Text = $"Rating: {moviePoster.Rating}";

                MovieDetailsBorder.Visibility = Visibility.Visible;
                BackButton.Visibility = Visibility.Visible;
            }
        }


        //Zmiana stron
        private int currentPage = 1;

        private async Task LoadMoviesForCurrentPage()
        {
            string url = string.Empty;

            if (Movies.IsChecked == true)
            {
                url = $"https://api.themoviedb.org/3/discover/movie?api_key={ApiKey}&sort_by=popularity.desc&page={currentPage}";
            }
            else if (Top_Rated_Movies.IsChecked == true)
            {
                url = $"https://api.themoviedb.org/3/movie/top_rated?api_key={ApiKey}&language=en-US&page={currentPage}";
            }
            else if (TV_Shows.IsChecked == true)
            {
                url = $"https://api.themoviedb.org/3/discover/tv?api_key={ApiKey}&sort_by=popularity.desc&page={currentPage}";
            }
            else if (Top_Rated_TV_Shows.IsChecked == true)
            {
                url = $"https://api.themoviedb.org/3/tv/top_rated?api_key={ApiKey}&language=en-US&page={currentPage}";
            }

            if (!string.IsNullOrEmpty(url))
            {
                await GetMoviesAsync(url);
            }

            MovieDetailsBorder.Visibility = Visibility.Collapsed;
            BackButton.Visibility = Visibility.Collapsed;
        }


        #region Functional Buttons
        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            MovieDetailsBorder.Visibility = Visibility.Collapsed;
            BackButton.Visibility = Visibility.Collapsed;
        }

        private void Exit_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            Application.Current.Shutdown();
        }

        private void MaxMin_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            WindowState = WindowState == WindowState.Normal ? WindowState.Maximized : WindowState.Normal;
        }

        private void Hide_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            WindowState = WindowState.Minimized;
        }

        
        private async void NextPageButton_Click(object sender, RoutedEventArgs e)
        {
            currentPage++;
            await LoadMoviesForCurrentPage();
        }

        private async void PreviousPageButton_Click(object sender, RoutedEventArgs e)
        {
            if (currentPage > 1)
            {
                currentPage--;
                await LoadMoviesForCurrentPage();
            }
        }
        #endregion
    }
}
