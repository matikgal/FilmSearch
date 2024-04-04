using System.Windows;
using static MovieSearchWPF.MainWindow;

namespace FilmSearch
{
    public partial class MovieDetailsWindow : Window
    {
        // Konstruktor klasy MovieDetailsWindow
        public MovieDetailsWindow(MoviePoster selectedMovie)
        {
            InitializeComponent();
            DataContext = new MovieDetailsViewModel(selectedMovie);
        }
    }
}
