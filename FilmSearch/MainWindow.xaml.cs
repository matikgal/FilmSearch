using IMDb;
using IMDbApiLib;
using Microsoft.VisualBasic.Devices;
using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

            InitializePopularMoviesAsync();

            Movies.Click += Movies_Click;
            TV_Shows.Click += TV_Shows_Click;
            Top_Rated_Movies.Click += Top_Rated_Movies_Click;
            Top_Rated_TV_Shows.Click += Top_Rated_TV_Shows_Click;
        }



        //Pobieranie i wyświetlanie filmów z API
        #region ShowMovies
        private async Task GetPopularMoviesAsync()
        {
            using (var client = new HttpClient())
            {
                string url = $"https://api.themoviedb.org/3/discover/movie?api_key={ApiKey}&sort_by=popularity.desc";
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var popularMovies = JsonSerializer.Deserialize<SearchResult>(json);

                    MoviePosters.Clear();
                    foreach (var movie in popularMovies.results.Take(40))
                    {
                        if (!string.IsNullOrEmpty(movie.poster_path))
                        {
                            MoviePosters.Add(new MoviePoster { PosterPath = $"https://image.tmdb.org/t/p/w500/{movie.poster_path}" });
                        }
                    }
                }
                else
                {
                    MessageBox.Show("Failed to retrieve movie data from API.");
                }
            }
        }

        //Wyświetlanie filmów po starcie programu
        private async Task InitializePopularMoviesAsync()
        {
            await GetPopularMoviesAsync();
        }
        #endregion

        //Searchbox
        #region SearchBar
        private async void SearchBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            string searchText = SearchBox.Text;
            if (string.IsNullOrWhiteSpace(searchText))
            {
                MoviePosters.Clear();
                return;
            }

            using (var client = new HttpClient())
            {
                string url = $"https://api.themoviedb.org/3/search/movie?api_key={ApiKey}&query={searchText}";
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var searchResult = JsonSerializer.Deserialize<SearchResult>(json);

                    MoviePosters.Clear();
                    foreach (var movie in searchResult.results)
                    {
                        // Sprawdź czy film ma plakat
                        if (!string.IsNullOrEmpty(movie.poster_path))
                        {
                            MoviePosters.Add(new MoviePoster { PosterPath = $"https://image.tmdb.org/t/p/w500/{movie.poster_path}" });
                        }
                    }
                }
                else
                {
                    MessageBox.Show("Failed to retrieve movie data from API.");
                }
            }
        }
        #endregion

        //Pobiereanie i przetwarzanie doanych z API
        #region GetMovie
        private async Task GetMoviesAsync(string url)
        {
            await GetMediaAsync(url, "movie", movies => movies.results.Select(movie =>
            {
                if (!string.IsNullOrEmpty(movie.poster_path))
                {
                    MoviePosters.Add(new MoviePoster { PosterPath = $"https://image.tmdb.org/t/p/w500/{movie.poster_path}" });
                }
                return movie;
            }).Take(40).ToArray(), "Failed to retrieve movie data from API.");
        }

        private async Task GetMediaAsync(string url, string mediaType, Func<SearchResult, SearchResultItem[]> processData, string errorMessage)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var mediaResult = JsonSerializer.Deserialize<SearchResult>(json);

                    MoviePosters.Clear();
                    processData(mediaResult);
                }
                else
                {
                    MessageBox.Show(errorMessage);
                }
            }
        }
        #endregion

        //Funkcje TopRated (Pobieranie danych najlepiej ocenianych filmach oraz programach)
        #region TopRatedFunctions
        private async Task GetTopRatedMoviesAsync()
        {
            string url = $"https://api.themoviedb.org/3/movie/top_rated?api_key={ApiKey}&language=en-US&page=1";
            await GetMediaAsync(url, "movie", topRatedMovies => topRatedMovies.results.Select(movie =>
            {
                if (!string.IsNullOrEmpty(movie.poster_path))
                {
                    MoviePosters.Add(new MoviePoster { PosterPath = $"https://image.tmdb.org/t/p/w500/{movie.poster_path}" });
                }
                return movie;
            }).Take(40).ToArray(), "Failed to retrieve movie data from API.");
        }

        private async Task GetTopRatedTVShowsAsync()
        {
            string url = $"https://api.themoviedb.org/3/tv/top_rated?api_key={ApiKey}&language=en-US&page=1";
            await GetMediaAsync(url, "TV show", topRatedTVShows => topRatedTVShows.results.Select(show =>
            {
                if (!string.IsNullOrEmpty(show.poster_path))
                {
                    MoviePosters.Add(new MoviePoster { PosterPath = $"https://image.tmdb.org/t/p/w500/{show.poster_path}" });
                }
                return show;
            }).Take(40).ToArray(), "Failed to retrieve TV show data from API.");
        }
        #endregion

        //Przciski w menu
        #region LeftMenuBtn
        private async void Top_Rated_Movies_Click(object sender, RoutedEventArgs e)
        {
            await GetTopRatedMoviesAsync();
        }

        private async void Top_Rated_TV_Shows_Click(object sender, RoutedEventArgs e)
        {
            await GetTopRatedTVShowsAsync();
        }


        private async void Movies_Click(object sender, RoutedEventArgs e)
        {
            string url = $"https://api.themoviedb.org/3/discover/movie?api_key={ApiKey}&sort_by=popularity.desc";
            await GetMoviesAsync(url);
        }

        private async void TV_Shows_Click(object sender, RoutedEventArgs e)
        {
            string url = $"https://api.themoviedb.org/3/discover/tv?api_key={ApiKey}&sort_by=popularity.desc";
            await GetMoviesAsync(url);
        }
        #endregion

        //Przyciski funkcji okna (exit,hide,min/max)
        #region FunctionBtn
        private void Exit_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            Application.Current.Shutdown();
        }

        private void MaxMin_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (WindowState == WindowState.Normal)
            {
                WindowState = WindowState.Maximized;
            }
            else
            {
                WindowState = WindowState.Normal;
            }
        }

        private void Hide_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            WindowState = WindowState.Minimized;
        }

        #endregion

        //Klasy (wyniki wyszukiwania, plakat filmu)
        #region Classes
        public class SearchResult
        {
            public SearchResultItem[] results { get; set; }
        }

        public class SearchResultItem
        {
            public string poster_path { get; set; }
        }

        // Dodaj właściwość Title do klasy MoviePoster
        public class MoviePoster
        {
            public string PosterPath { get; set; }
        }

        #endregion
    }
}
