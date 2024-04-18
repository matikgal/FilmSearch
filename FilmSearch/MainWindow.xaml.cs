using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Net.Http;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using MovieSearchWPF.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MovieSearchWPF
{
    public partial class MainWindow : Window, INotifyPropertyChanged
    {
        private const string ApiKey = "e1e05e04950c91952d0c0cc0cad4a581";
        private ObservableCollection<MoviePoster> _moviePosters;
        private List<int> _selectedGenres = new List<int>();

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

            AddCategoryCheckBoxEventHandlers();

            Movies.IsChecked = true;

            LoadMoviesForCurrentPage();
        }

        private void AddCategoryCheckBoxEventHandlers()
        {
            var checkBoxes = GetAllCheckBoxes(this);

            foreach (var checkBox in checkBoxes)
            {
                checkBox.Checked += CategoryCheckBox_Checked;
                checkBox.Unchecked += CategoryCheckBox_Unchecked;
            }
        }

        private IEnumerable<CheckBox> GetAllCheckBoxes(DependencyObject parent)
        {
            var checkBoxList = new List<CheckBox>();
            for (int i = 0; i < VisualTreeHelper.GetChildrenCount(parent); i++)
            {
                var child = VisualTreeHelper.GetChild(parent, i);
                if (child is CheckBox checkBox)
                {
                    checkBoxList.Add(checkBox);
                }
                else
                {
                    checkBoxList.AddRange(GetAllCheckBoxes(child));
                }
            }
            return checkBoxList;
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

        private async void CategoryCheckBox_Checked(object sender, RoutedEventArgs e)
        {
            var checkBox = sender as CheckBox;
            if (checkBox != null)
            {
                _selectedGenres.Add(GetGenreIdByName(checkBox.Content.ToString()));
                FilterMoviesByGenres();
            }
        }

        private async void CategoryCheckBox_Unchecked(object sender, RoutedEventArgs e)
        {
            var checkBox = sender as CheckBox;
            if (checkBox != null)
            {
                _selectedGenres.Remove(GetGenreIdByName(checkBox.Content.ToString()));
                FilterMoviesByGenres();
            }
        }

        private int GetGenreIdByName(string categoryName)
        {
            switch (categoryName)
            {
                case "Action": return 28;
                case "Adventure": return 12;
                case "Animation": return 16;
                case "Comedy": return 35;
                case "Crime": return 80;
                case "Documentary": return 99;
                case "Drama": return 18;
                case "Family": return 10751;
                case "Fantasy": return 14;
                case "History": return 36;
                case "Horror": return 27;
                case "Music": return 10402;
                case "Mystery": return 9648;
                case "Romance": return 10749;
                case "Science Fiction": return 878;
                case "TV Movie": return 10770;
                case "Thriller": return 53;
                case "War": return 10752;
                case "Western": return 37;
                default: return 0;
            }
        }

        private async void FilterMoviesByGenres()
        {
            if (_selectedGenres.Count == 0)
            {
                await LoadMoviesForCurrentPage();
                return;
            }

            string genres = string.Join(",", _selectedGenres);

            string url = $"https://api.themoviedb.org/3/discover/movie?api_key={ApiKey}&with_genres={genres}&sort_by=popularity.desc&page={currentPage}";

            await GetMoviesAsync(url);
        }

        private async void SearchBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            string searchText = SearchBox.Text.Trim();
            if (string.IsNullOrWhiteSpace(searchText))
            {
                await InitializePopularMoviesAsync();
                return;
            }

            string url = $"https://api.themoviedb.org/3/search/movie?api_key={ApiKey}&query={searchText}";
            await GetMoviesAsync(url);
        }

        private async Task InitializePopularMoviesAsync()
        {
            string url = $"https://api.themoviedb.org/3/discover/movie?api_key={ApiKey}&sort_by=popularity.desc";

            await GetMoviesAsync(url);
        }

        private async Task GetMoviesAsync(string url)
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();
                    JObject result = JsonConvert.DeserializeObject<JObject>(json);
                    MoviePosters.Clear();
                    if (result.TryGetValue("results", out JToken results))
                    {
                        foreach (JToken movie in results.Take(20))
                        {
                            bool isMovieInSelectedGenres = _selectedGenres.Count == 0 ||
                                movie["genre_ids"].ToObject<List<int>>().Any(id => _selectedGenres.Contains(id));

                            if (isMovieInSelectedGenres)
                            {
                                string posterPath = movie["poster_path"]?.ToString();
                                if (!string.IsNullOrEmpty(posterPath))
                                {
                                    MoviePosters.Add(new MoviePoster
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
                }
                else
                {
                    MessageBox.Show("Failed to retrieve movie data from the API.");
                }
            }
        }

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

            if (_selectedGenres.Count > 0)
            {
                url += $"&with_genres={string.Join(",", _selectedGenres)}";
            }

            if (!string.IsNullOrEmpty(url))
            {
                await GetMoviesAsync(url);
            }

            MovieDetailsBorder.Visibility = Visibility.Collapsed;
            BackButton.Visibility = Visibility.Collapsed;
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

        private void ClearAllCategoriesButton_Click(object sender, RoutedEventArgs e)
        {
            foreach (var checkBox in GetAllCheckBoxes(this))
            {
                checkBox.IsChecked = false;
            }

            _selectedGenres.Clear();

            LoadMoviesForCurrentPage();
        }

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
    }
}
