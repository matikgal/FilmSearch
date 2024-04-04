using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Net.Http;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using MovieSearchWPF.Models;

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

            InitializePopularMoviesAsync();


        }

        private async void MenuItem_Click(object sender, RoutedEventArgs e)
        {
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

        private async void SearchBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            string searchText = SearchBox.Text.Trim();
            if (string.IsNullOrWhiteSpace(searchText))
            {
                MoviePosters.Clear();
                return;
            }

            string url = $"https://api.themoviedb.org/3/search/movie?api_key={ApiKey}&query={searchText}";
            await GetMoviesAsync(url);
        }

        private async Task GetMoviesAsync(string url)
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var result = JsonSerializer.Deserialize<SearchResult>(json);

                    MoviePosters.Clear();
                    foreach (var item in result.results.Take(40))
                    {
                        if (!string.IsNullOrEmpty(item.poster_path))
                        {
                            MoviePosters.Add(new MoviePoster
                            {
                                PosterPath = $"https://image.tmdb.org/t/p/w500/{item.poster_path}",
                                Title = item.title,
                                Description = item.overview,
                                Rating = item.vote_average
                            });
                        }
                    }
                }
                else
                {
                    MessageBox.Show("Failed to retrieve movie data from API.");
                }
            }
        }

        private async Task InitializePopularMoviesAsync()
        {
            await GetMoviesAsync($"https://api.themoviedb.org/3/discover/movie?api_key={ApiKey}&sort_by=popularity.desc");
        }

        private void MoviePoster_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            var border = sender as Border;
            var moviePoster = border?.Tag as MoviePoster;
            if (moviePoster != null)
            {
                MovieTitleTextBlock.Text = moviePoster.Title;
                MovieDescriptionTextBlock.Text = $"Opis: {moviePoster.Description}";
                MovieRatingTextBlock.Text = $"Ocena: {moviePoster.Rating}";

                MovieDetailsBorder.Visibility = Visibility.Visible;
                BackButton.Visibility = Visibility.Visible;
            }
        }

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

    }
}
