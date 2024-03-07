using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

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
            wyszukiwarka.TextChanged += Wyszukiwarka_TextChanged;
        }

        private async void Wyszukiwarka_TextChanged(object sender, TextChangedEventArgs e)
        {
            string searchText = wyszukiwarka.Text;
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
                        MoviePosters.Add(new MoviePoster { PosterPath = $"https://image.tmdb.org/t/p/w500/{movie.poster_path}" });
                    }
                }
                else
                {
                    MessageBox.Show("Failed to retrieve movie data from API.");
                }
            }
        }
    }

    public class SearchResult
    {
        public SearchResultItem[] results { get; set; }
    }

    public class SearchResultItem
    {
        public string poster_path { get; set; }
    }

    public class MoviePoster
    {
        public string PosterPath { get; set; }
    }
}
