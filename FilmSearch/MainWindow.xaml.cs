using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media.Imaging;

namespace MovieSearchWPF
{/*
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private async void SearchButton_Click(object sender, RoutedEventArgs e)
        {
            string apiKey = "e1e05e04950c91952d0c0cc0cad4a581";
            string query = SearchTextBox.Text;

            try
            {
                using (var client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync($"https://api.themoviedb.org/3/search/multi?api_key={apiKey}&query={query}");

                    if (response.IsSuccessStatusCode)
                    {
                        string responseData = await response.Content.ReadAsStringAsync();

                        JObject json = JObject.Parse(responseData);
                        JArray results = (JArray)json["results"];

                        ResultListBox.Items.Clear();

                        foreach (var result in results)
                        {                         
                            dynamic detailedResult = await GetDetailedResult((int)result["id"], apiKey);

                            ResultListBox.Items.Add(new
                            {
                                Title = (string)result["title"] ?? (string)result["name"],
                                ReleaseDate = (string)result["release_date"] ?? (string)result["first_air_date"],
                                Overview = (string)result["overview"],
                                MediaType = (string)result["media_type"],
                                PosterPath = (string)result["poster_path"],
                                VoteAverage = detailedResult?.vote_average ?? 0
                            });
                        }
                    }
                    else
                    {
                        ResultListBox.Items.Clear();
                        ResultListBox.Items.Add($"Wystąpił błąd: {response.StatusCode}");
                    }
                }
            }
            catch (Exception ex)
            {
                ResultListBox.Items.Clear();
                ResultListBox.Items.Add($"Wystąpił błąd: {ex.Message}");
            }
        }

        private async Task<dynamic> GetDetailedResult(int id, string apiKey)
        {
            dynamic detailedResult = null;

            try
            {
                using (var client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync($"https://api.themoviedb.org/3/movie/{id}?api_key={apiKey}");

                    if (response.IsSuccessStatusCode)
                    {
                        string responseData = await response.Content.ReadAsStringAsync();
                        detailedResult = JObject.Parse(responseData);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while getting detailed result: {ex.Message}");
            }

            return detailedResult;
        }

        private async void ResultListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ResultListBox.SelectedItem != null)
            {
                dynamic selectedItem = ResultListBox.SelectedItem;
                DescriptionTextBox.Text = $"Tytuł: {selectedItem.Title}\n\nData premiery: {selectedItem.ReleaseDate}\n\nOpis: {selectedItem.Overview}\n\nTyp: {selectedItem.MediaType}\n\nOcena: {selectedItem.VoteAverage}";

                if (!string.IsNullOrEmpty(selectedItem.PosterPath))
                {
                    string baseImageUrl = "https://image.tmdb.org/t/p/w500/";
                    string imageUrl = baseImageUrl + selectedItem.PosterPath;

                    BitmapImage bitmap = new BitmapImage();
                    bitmap.BeginInit();
                    bitmap.UriSource = new Uri(imageUrl, UriKind.Absolute);
                    bitmap.EndInit();

                    PosterImage.Source = bitmap;
                }
                else
                {
                    BitmapImage defaultImage = new BitmapImage();
                    try
                    {
                        defaultImage = new BitmapImage(new Uri("pack://application:,,,/Resources/default_poster.jpg"));
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"An error occurred while loading the default image: {ex.Message}");
                    }

                    PosterImage.Source = defaultImage;
                }
            }
        }
    }*/
}
